const { GoogleGenAI } = require("@google/genai");
const asyncHandler = require("../middlewares/asyncHandler.middleware");
const AppError = require("../utils/AppError");
const { getCompanyInsight } = require("../data/company-insights");

const MODEL_ID = "gemini-flash-latest";

const ROADMAP_SOURCES = [
  { label: "Frontend Development", path: "Frontend-Development/README.md", keywords: ["frontend", "front-end", "front end"] },
  { label: "Backend Development", path: "Backend-Development/README.md", keywords: ["backend", "back-end", "back end", "server-side", "server side"] },
  { label: "Fullstack Development", path: "Fullstack-Development/README.md", keywords: ["fullstack", "full stack", "full-stack"] },
  { label: "Android Development", path: "Android-Development/readme.md", keywords: ["android", "android dev", "android development", "kotlin"] },
  { label: "iOS Development", path: "iOS-Development/readme.md", keywords: ["ios", "ios dev", "ios development", "swift"] },
  { label: "Flutter Development", path: "Flutter-Development/readme.md", keywords: ["flutter", "dart"] },
  { label: "DevRel", path: "DevRel/Readme.md", keywords: ["devrel", "developer relations", "developer advocate", "developer advocacy"] },
  { label: "DevOps", path: "DevOps/README.md", keywords: ["devops", "sre", "site reliability"] },
  { label: "Data Science", path: "Data-Science/README.md", keywords: ["data science", "data-science", "data engineer", "data engineering", "machine learning", "ml"] },
  { label: "Blockchain", path: "Blockchain/readme.md", keywords: ["blockchain", "web3", "solidity"] },
  { label: "Open Source", path: "Open-Source/README.md", keywords: ["open source", "open-source", "oss"] },
];

const SYSTEM_INSTRUCTION = `
You are a senior technical mentor at LevelUp.

Answer directly and concisely. Do not start with long introductions or meta-comments (no "As a mentor" / "internal knowledge base" etc.).
Do not mention scraping, tools, or implementation details to the user.

CRITICAL INSTRUCTIONS - YOU MUST FOLLOW THESE RULES:

1. ROADMAPS (Source: WeMakeDevs/roadmaps):
   - IF "CONTEXT_ROADMAP_CONTENT" IS PROVIDED BELOW: YOU MUST USE ONLY THAT CONTENT.
   - DO NOT generate your own generic roadmap. List the specific resources/links from the context.
   - IF NO CONTEXT IS PROVIDED: Point the user to the closest official roadmap link. Do NOT invent or hallucinate steps.
   - BRANDING: Present as LevelUp's curated path.

2. COMPANY QUESTIONS:
   - Output FORMAT (STRICT): 3-6 bullet points covering Rating, Culture, Growth, Compensation, optional Caveats.
   - PROHIBITIONS: No URLs unless explicitly asked. No scraping/tool mentions. Stay brief.

3. GENERAL MENTORSHIP:
   - For technical questions: answer as an expert engineer.
   - For network/referral queries: "You need to sign up and I will fetch it."

FORMATTING:
- Use clear Markdown where helpful. Bold key figures. Keep tone professional.
`;

async function fetchRoadmapContent(source) {
  const basePath = source.path.replace(/^\/+/, "");
  const url = `https://raw.githubusercontent.com/WeMakeDevs/roadmaps/main/${basePath}`;
  console.log(`[Ask] Fetching roadmap for ${source.label} from ${url}`);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) return null;

    const text = await res.text();
    const folderPath = basePath.substring(0, basePath.lastIndexOf("/"));
    const repoBaseUrl = `https://github.com/WeMakeDevs/roadmaps/blob/main/${folderPath}`;

    return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, href) => {
      if (href.startsWith("http") || href.startsWith("#")) return match;
      const cleanHref = href.startsWith("./") ? href.substring(2) : href;
      return `[${linkText}](${repoBaseUrl}/${cleanHref})`;
    });
  } catch (e) {
    clearTimeout(timeoutId);
    console.error(`[Ask] Roadmap fetch failed for ${source.label}:`, e.message);
    return null;
  }
}

function findRoadmapSource(prompt) {
  const lower = prompt.toLowerCase();
  return ROADMAP_SOURCES.find((source) =>
    source.keywords.some((keyword) => lower.includes(keyword))
  ) || null;
}

const COMPANY_PATTERNS = [
  /\bhow\s+much\s+(.+?)\s+pay\b/i,
  /\bhow\s+is\s+(.+?)(?:\b(reviews?|rating|salary|salaries|pay|compensation|package)\b|$)/i,
  /\btell\s+me\s+about\s+(.+?)(?:\b(reviews?|rating|salary|salaries|pay|compensation|package)\b|$)/i,
  /\b(?:salary|salaries|reviews?|rating|pay|compensation|package)\s+(?:for|at|in)\s+(.+?)$/i,
  /\b(.+?)\s+(?:reviews?|rating|salary|salaries|pay|compensation|package)\b/i,
];
const ROLE_NOISE = /\b(sde\s*\d+|sde|software engineer|developer|engineer|analyst|manager|intern|trainee|lead|architect|qa|tester|product manager|data scientist|devops|full stack|fullstack|frontend|backend|mobile|ios|android|designer|consultant|associate|staff|principal|director|senior|junior|sr|jr)\b/gi;
const QUERY_NOISE = /\b(review|reviews|rating|salary|salaries|pay|compensation|package|ctc|benefits|interview|interviews|company|culture|work|good|bad|role|position|job|designation|about|info|stats|what|how|much|does|tell|me)\b/gi;
const LOCATION_NOISE = /\b(in|at|for|as)\s+(india|usa|us|uk|canada|remote|bangalore|bengaluru|hyderabad|pune|mumbai|delhi|noida|gurgaon|gurugram|chennai|kolkata|ahmedabad|chandigarh|kochi|lucknow|jaipur|coimbatore|trivandrum|bhubaneswar)\b/gi;

function cleanCompanyCandidate(candidate) {
  let cleaned = candidate.replace(/\(.*?\)/g, " ").replace(/[?.]/g, " ");
  cleaned = cleaned.replace(ROLE_NOISE, " ").replace(QUERY_NOISE, " ").replace(LOCATION_NOISE, " ");
  cleaned = cleaned.replace(/\b(at|in|for|as|to|of|from|with)\b$/i, "");
  return cleaned.replace(/\s+/g, " ").trim();
}

function extractCompany(prompt) {
  const normalized = prompt.replace(/\s+/g, " ").trim();
  if (!normalized || /\byourself\b/i.test(normalized)) return null;

  for (const pattern of COMPANY_PATTERNS) {
    const match = normalized.match(pattern);
    if (match?.[1]) {
      const candidate = cleanCompanyCandidate(match[1]);
      if (candidate.length > 2 && !/roadmap/i.test(candidate)) return candidate;
    }
  }
  return null;
}

/**
 * @ASK_MENTOR
 * @ROUTE @POST {{URL}}/api/ask
 * @ACCESS Public
 */
const askMentor = asyncHandler(async (req, res, next) => {
  const { prompt } = req.body;

  if (!prompt) {
    return next(new AppError("Prompt is required", 400));
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return next(new AppError("Ask API not configured: set API_KEY in .env", 500));
  }

  const ai = new GoogleGenAI({ apiKey });
  const tools = [{ googleSearch: {} }];
  const lowerPrompt = prompt.toLowerCase();
  let dynamicContext = "";

  // 1. Roadmap intent
  const isRoadmapIntent = ["roadmap", "path", "guide", "become", "career in"].some((kw) =>
    lowerPrompt.includes(kw)
  );

  if (isRoadmapIntent) {
    const roadmapSource = findRoadmapSource(prompt);
    if (roadmapSource) {
      const roadmapContent = await fetchRoadmapContent(roadmapSource);
      const sourceLink = `https://github.com/WeMakeDevs/roadmaps/blob/main/${roadmapSource.path}`;
      if (roadmapContent) {
        const truncated = roadmapContent.slice(0, 25000);
        dynamicContext += `\n\n[CONTEXT_ROADMAP_CONTENT]\nSource: ${sourceLink}\n${truncated}\n[END CONTEXT]\n`;
      } else {
        dynamicContext += `\n\n[CONTEXT_ROADMAP_CONTENT]\nOfficial roadmap: ${sourceLink}\n[END CONTEXT]\n`;
      }
    }
  }

  // 2. Company intent — try static data first
  const companyQuery = extractCompany(prompt);
  if (companyQuery) {
    const staticInsight = getCompanyInsight(companyQuery);
    if (staticInsight) {
      const bullets = [];
      if (staticInsight.rating) bullets.push(`- Rating: **${staticInsight.rating}**`);
      if (staticInsight.reputation) bullets.push(`- Reputation: ${staticInsight.reputation}`);
      if (staticInsight.culture) bullets.push(`- Culture: ${staticInsight.culture}`);
      if (staticInsight.growth) bullets.push(`- Growth: ${staticInsight.growth}`);
      if (staticInsight.compensation) bullets.push(`- Compensation: ${staticInsight.compensation}`);
      if (staticInsight.caveats?.length) bullets.push(`- Caveats: ${staticInsight.caveats.join("; ")}`);

      return res.status(200).json({
        success: true,
        message: "Company insight fetched",
        response: bullets.join("\n"),
      });
    }

    dynamicContext += `\n\n[CONTEXT_COMPANY]\nCompany: ${companyQuery}\nRespond with 3-6 bullet points (rating, culture, growth, compensation, caveats). No URLs.\n[END CONTEXT_COMPANY]\n`;
  }

  const fullPrompt = `${SYSTEM_INSTRUCTION}${dynamicContext}\n\nUser Query: ${prompt}`;

  const response = await ai.models.generateContent({
    model: MODEL_ID,
    contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
    config: { tools },
  });

  const text =
    response.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

  res.status(200).json({
    success: true,
    message: "Mentor response generated",
    response: text,
  });
});

module.exports = { askMentor };
