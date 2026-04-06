const { GoogleGenAI } = require("@google/genai");
const asyncHandler = require("../middlewares/asyncHandler.middleware");

const MODEL_ID = "gemini-1.5-flash";

const PINNED_SCHOLARSHIPS = [
  { id: "stipendium-hungaricum-2026", title: "Stipendium Hungaricum Scholarship 2026-27", provider: "Government of Hungary", country: "Hungary", amount: "Full Tuition + Stipend + Housing", deadline: "January 15, 2026", degree: "Bachelor / Master / PhD", url: "https://stipendiumhungaricum.hu/", flag: "🇭🇺", tags: ["Fully Funded", "Europe"] },
  { id: "china-csc-2025", title: "Chinese Government Scholarship (CSC)", provider: "China Scholarship Council", country: "China", amount: "Full Tuition + Accommodation + Stipend", deadline: "February-April 2025 (Varies)", degree: "Bachelor / Master / PhD", url: "https://www.campuschina.org/", flag: "🇨🇳", tags: ["Fully Funded", "Asia"] },
  { id: "anso-scholarship", title: "ANSO Scholarship for Young Talents", provider: "Alliance of International Science Organizations", country: "China", amount: "Full Tuition + High Stipend (up to 7000 RMB)", deadline: "February 15, 2025", degree: "Master / PhD", url: "http://www.anso.org.cn/programmes/talent/scholarship/", flag: "🇨🇳", tags: ["Science", "High Value"] },
];

const FALLBACK_SCHOLARSHIPS = [
  { id: "chevening-2025", title: "Chevening Scholarship", provider: "UK Government", country: "United Kingdom", amount: "Full Funding + Stipend", deadline: "November 2025", degree: "Masters", url: "https://www.chevening.org/", flag: "🇬🇧", tags: ["Fully Funded", "Leadership"] },
  { id: "fulbright-2025", title: "Fulbright Foreign Student Program", provider: "USA Government", country: "United States", amount: "Full Tuition + Living", deadline: "Varies (Oct-Dec)", degree: "Masters / PhD", url: "https://foreign.fulbrightonline.org/", flag: "🇺🇸", tags: ["Prestige", "Research"] },
  { id: "gates-cambridge", title: "Gates Cambridge Scholarship", provider: "Bill & Melinda Gates Foundation", country: "United Kingdom", amount: "Full Cost", deadline: "January 2026", degree: "Postgraduate", url: "https://www.gatescambridge.org/", flag: "🇬🇧", tags: ["Merit", "Leadership"] },
];

function parseGeminiText(raw) {
  const candidateText = Array.isArray(raw?.response?.candidates)
    ? raw.response.candidates
        .flatMap((c) =>
          Array.isArray(c?.content?.parts)
            ? c.content.parts.map((p) => (typeof p?.text === "string" ? p.text : "")).join("\n")
            : ""
        )
        .join("\n")
    : "";

  const text =
    typeof raw?.text === "function" ? raw.text() : typeof raw?.text === "string" ? raw.text : candidateText;

  const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
  try {
    const parsed = JSON.parse(cleanJson);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mergeScholarships(dynamic) {
  const all = [...PINNED_SCHOLARSHIPS, ...dynamic];
  return Array.from(new Map(all.map((item) => [item.id, item])).values());
}

/**
 * @GET_SCHOLARSHIPS
 * @ROUTE @GET {{URL}}/api/scholarships
 * @ACCESS Public
 */
const getScholarships = asyncHandler(async (req, res, _next) => {
  const query = req.query.query || "Scholarships for international students";
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      success: true,
      message: "Scholarships fetched successfully",
      scholarships: mergeScholarships(FALLBACK_SCHOLARSHIPS),
    });
  }

  const ai = new GoogleGenAI({ apiKey });
  const tools = [{ googleSearch: {} }];

  const prompt = `
    Find 6-8 active scholarships for: "${query}".
    Focus on fully funded or high-value scholarships for international students.

    Return ONLY a JSON array:
    [{ "id": "unique_id", "title": "Scholarship Name", "provider": "University or Org", "country": "Country Name", "amount": "Funding Amount", "deadline": "Deadline Date", "degree": "Target Degree", "url": "https://application-link", "flag": "Country Flag Emoji", "tags": ["Fully Funded", "Merit-based"] }]
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_ID,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: { tools },
    });

    const geminiScholarships = parseGeminiText(response);

    if (geminiScholarships.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Scholarships fetched successfully",
        scholarships: mergeScholarships(geminiScholarships),
      });
    }

    return res.status(200).json({
      success: true,
      message: "Scholarships fetched successfully (fallback)",
      scholarships: mergeScholarships(FALLBACK_SCHOLARSHIPS),
    });
  } catch (error) {
    console.error("Gemini scholarship search failed:", error);
    return res.status(200).json({
      success: true,
      message: "Scholarships fetched successfully (fallback)",
      scholarships: mergeScholarships(FALLBACK_SCHOLARSHIPS),
    });
  }
});

module.exports = { getScholarships };
