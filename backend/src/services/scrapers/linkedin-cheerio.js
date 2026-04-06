const cheerio = require("cheerio");

/**
 * Scrape LinkedIn guest jobs API for job postings in India.
 * @param {string | string[]} query - search keyword(s)
 * @returns {Promise<Array>} - array of job objects
 */
async function scrapeLinkedInJobs(query) {
  const jobs = [];

  const inputs = Array.isArray(query)
    ? query
    : query
    ? [query]
    : [
        "Nodejs developer",
        "reactjs developer",
        "javascript developer",
        "frontend developer",
      ];

  // Deduplicate inputs
  const keywords = Array.from(new Set(inputs));

  try {
    for (const keyword of keywords) {
      const encodedKeyword = encodeURIComponent(keyword);
      const offsets = [0, 25];

      for (const start of offsets) {
        // geoId=102713980 → India, f_TPR=r3600 → last hour, sortBy=DD → date descending
        const url = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${encodedKeyword}&geoId=102713980&f_TPR=r3600&start=${start}&sortBy=DD`;

        console.log(
          `LinkedIn Scraper: Fetching for "${keyword}" (start=${start})`
        );

        const res = await fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept: "*/*",
          },
        });

        if (!res.ok) {
          console.error(
            `LinkedIn Scraper: Failed for "${keyword}" page ${start} with status ${res.status}`
          );
          continue;
        }

        const html = await res.text();
        const $ = cheerio.load(html);
        let foundInBatch = 0;

        $("li").each((_i, el) => {
          const card = $(el);
          const title = card.find(".base-search-card__title").text().trim();
          const company = card
            .find(".base-search-card__subtitle")
            .text()
            .trim();
          const location = card
            .find(".job-search-card__location")
            .text()
            .trim();
          const link =
            card.find("a.base-card__full-link").attr("href") ||
            card.find("a").attr("href");
          const time = card.find("time").text().trim();
          const dateTime = card.find("time").attr("datetime");

          if (title && company && link) {
            // Deduplicate by URL
            if (!jobs.some((j) => j.url === link)) {
              jobs.push({
                id: `li-guest-${jobs.length}-${Date.now()}`,
                title,
                company,
                location: location || "Remote",
                type: "Full-time",
                experienceLevel: "Experienced",
                category: "Software Engineering",
                salary: "Competitive",
                postedAt: time || "Recently",
                postedAtMs: dateTime ? new Date(dateTime).getTime() : Date.now(),
                source: "LinkedIn",
                logo: "[LI]",
                skills: ["React", "Node.js", "JS"],
                url: link,
              });
              foundInBatch++;
            }
          }
        });

        console.log(
          `LinkedIn Scraper: Found ${foundInBatch} jobs in batch start=${start}`
        );
        if (foundInBatch === 0) break;

        // Small delay between requests to avoid rate limiting
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    console.log(
      `LinkedIn Scraper: Found ${jobs.length} total unique jobs.`
    );
  } catch (error) {
    console.error("LinkedIn Scraper: Error", error);
  }

  return jobs;
}

module.exports = { scrapeLinkedInJobs };
