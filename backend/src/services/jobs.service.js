const { scrapeLinkedInJobs } = require("./scrapers/linkedin-cheerio");
const { fallbackJobs } = require("../utils/data");
const Job = require("../models/job.model");

const DEFAULT_QUERY = "React developer";

/**
 * Format a timestamp as a human-readable "time ago" string.
 * @param {number} timestamp
 * @returns {string}
 */
function formatTimeAgo(timestamp) {
  const now = Date.now();
  const diffMs = Math.max(0, now - timestamp);
  const minutes = Math.round(diffMs / 60_000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;

  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

/**
 * Normalize raw scraped jobs into the LatestJob shape.
 * @param {Array} source
 * @returns {Array}
 */
function normalizeJobs(source) {
  const now = Date.now();

  return source.map((job, index) => {
    const timestamp =
      typeof job.postedAtMs === "number"
        ? job.postedAtMs
        : typeof job.freshnessMinutes === "number"
        ? now - job.freshnessMinutes * 60_000
        : now - index * 5 * 60_000;

    return {
      id: job.id || `job-${index}`,
      title: job.title || "Untitled role",
      company: job.company || "Unknown company",
      location: job.location || "Remote / Various",
      platform: job.source || "Google Search",
      postedDate: job.postedAt || formatTimeAgo(timestamp),
      url: job.url || undefined,
      description:
        (Array.isArray(job.skills) && job.skills.length > 0
          ? job.skills.join(", ")
          : job.category) || "No description available.",
      timestamp,
    };
  });
}

/**
 * Persist new jobs to MongoDB via upsert on URL.
 * @param {Array} newJobs
 */
async function saveJobs(newJobs) {
  try {
    const ops = newJobs.map((job) => ({
      updateOne: {
        filter: { url: job.url || `${job.title}-${job.company}` },
        update: { $set: { ...job, fetchedAt: Date.now() } },
        upsert: true,
      },
    }));
    await Job.bulkWrite(ops);
  } catch (error) {
    console.error("Failed to save jobs to MongoDB:", error);
  }
}

/**
 * Fetch the latest jobs via scraper, falling back to static data.
 * @param {string} query
 * @returns {Promise<Array>}
 */
async function loadLatestJobs(query) {
  let linkedInJobs = [];

  try {
    const searchTerms =
      query === DEFAULT_QUERY
        ? ["React developer", "frontend developer", "nodejs", "javascript developer"]
        : query;

    const scrapedJobs = await scrapeLinkedInJobs(searchTerms);
    if (scrapedJobs.length > 0) {
      linkedInJobs = normalizeJobs(scrapedJobs);
    }
  } catch (error) {
    console.error("LinkedIn scrape failed:", error);
  }

  const uniqueJobs = Array.from(
    new Map(linkedInJobs.map((job) => [job.url, job])).values()
  );

  if (uniqueJobs.length > 0) {
    // Fire-and-forget cache write to MongoDB
    saveJobs(uniqueJobs).catch((err) =>
      console.error("Background save failed:", err)
    );
    return uniqueJobs;
  }

  // Try to load from MongoDB cache before falling back to static data
  try {
    const cached = await Job.find().sort({ fetchedAt: -1 }).limit(50).lean();
    if (cached.length > 0) {
      return cached;
    }
  } catch {
    // MongoDB unavailable — fall through to static fallback
  }

  return normalizeJobs(fallbackJobs);
}

/**
 * Get paginated jobs for a given query.
 * @param {string} query
 * @param {number} page
 * @param {number} limit
 * @returns {Promise<{ jobs: Array, total: number }>}
 */
async function getJobs(query, page, limit) {
  const jobs = await loadLatestJobs(query);

  // Sort newest first
  const sorted = [...jobs].sort((a, b) => b.timestamp - a.timestamp);

  const start = (page - 1) * limit;
  const paginated = sorted
    .slice(start, start + limit)
    .map(({ timestamp: _timestamp, ...job }) => job);

  return { jobs: paginated, total: sorted.length };
}

module.exports = { getJobs };
