const asyncHandler = require("../middlewares/asyncHandler.middleware");
const AppError = require("../utils/AppError");
const { mockProblems } = require("../data/mockProblems");

const PROBLEM_SERVICE = process.env.PROBLEM_SERVICE_URL;

/**
 * @GET_PROBLEMS
 * @ROUTE @GET {{URL}}/api/problems
 * @ACCESS Public
 */
const getProblems = asyncHandler(async (req, res, _next) => {
  const { difficulty } = req.query;

  // If external ProblemService is configured, proxy to it
  if (PROBLEM_SERVICE) {
    try {
      const url = difficulty
        ? `${PROBLEM_SERVICE}/problems/difficulty/${difficulty}`
        : `${PROBLEM_SERVICE}/problems`;

      const proxyRes = await fetch(url, { cache: "no-store" });
      const data = await proxyRes.json();
      return res.status(proxyRes.status).json(data);
    } catch {
      // Fall through to mock data
    }
  }

  const filtered = difficulty
    ? mockProblems.filter((p) => p.difficulty === difficulty)
    : mockProblems;

  res.status(200).json({ success: true, data: filtered });
});

/**
 * @GET_PROBLEM_BY_ID
 * @ROUTE @GET {{URL}}/api/problems/:id
 * @ACCESS Public
 */
const getProblemById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // If external ProblemService is configured, proxy to it
  if (PROBLEM_SERVICE) {
    try {
      const proxyRes = await fetch(`${PROBLEM_SERVICE}/problems/${id}`, {
        cache: "no-store",
      });
      const data = await proxyRes.json();
      return res.status(proxyRes.status).json(data);
    } catch {
      // Fall through to mock data
    }
  }

  const problem = mockProblems.find((p) => p.id === id);
  if (!problem) {
    return next(new AppError("Problem not found", 404));
  }

  res.status(200).json({ success: true, data: problem });
});

module.exports = { getProblems, getProblemById };
