const axios = require("axios");
const asyncHandler = require("../middlewares/asyncHandler.middleware");
const AppError = require("../utils/AppError");

const LINKEDIN_API_KEY = process.env.LINKEDIN_API_KEY || process.env.RAPIDAPI_KEY;
const LINKEDIN_API_HOST = process.env.LINKEDIN_API_HOST || "linkedin-data-api.p.rapidapi.com";
const LINKEDIN_API_BASE_URL =
  process.env.LINKEDIN_API_BASE_URL || "https://linkedin-data-api.p.rapidapi.com";

const defaultHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
};

/**
 * @GET_COMPANY
 * @ROUTE @GET {{URL}}/api/company?domain=google.com
 * @ACCESS Public
 */
const getCompany = asyncHandler(async (req, res, next) => {
  const { domain } = req.query;

  if (!domain) {
    return next(new AppError("Missing domain query parameter", 400));
  }

  if (!LINKEDIN_API_KEY) {
    return next(new AppError("LinkedIn API key not configured", 500));
  }

  const url = `${LINKEDIN_API_BASE_URL}/get-company-by-domain?domain=${encodeURIComponent(domain)}`;

  const { data } = await axios.get(url, {
    headers: {
      ...defaultHeaders,
      "x-rapidapi-host": LINKEDIN_API_HOST,
      "x-rapidapi-key": LINKEDIN_API_KEY,
    },
    timeout: 15_000,
  });

  res.status(200).json({
    success: true,
    message: "Company data fetched successfully",
    data,
  });
});

module.exports = { getCompany };
