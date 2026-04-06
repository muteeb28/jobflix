const asyncHandler = require("../middlewares/asyncHandler.middleware");
const AppError = require("../utils/AppError");
const { mockProblems } = require("../data/mockProblems");
const { mockSubmissions } = require("../data/mockSubmissions");

const SUBMISSION_SERVICE = process.env.SUBMISSION_SERVICE_URL;

/**
 * @CREATE_SUBMISSION
 * @ROUTE @POST {{URL}}/api/submissions
 * @ACCESS Public
 */
const createSubmission = asyncHandler(async (req, res, next) => {
  const body = req.body;

  // If external SubmissionService is configured, proxy to it
  if (SUBMISSION_SERVICE) {
    try {
      const proxyRes = await fetch(`${SUBMISSION_SERVICE}/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await proxyRes.json();
      return res.status(proxyRes.status).json(data);
    } catch {
      // Fall through to mock mode
    }
  }

  // Mock mode: simulate submission
  const { problemId } = body;
  const problem = mockProblems.find((p) => p.id === problemId);

  if (!problem) {
    return next(new AppError("Problem not found", 404));
  }

  const submissionId = `mock-sub-${Date.now()}`;
  const statuses = ["AC", "WA", "AC", "AC", "TLE", "AC"];

  const results = problem.testcases.map((tc, i) => ({
    testcase: i + 1,
    input: tc.input,
    expected: tc.output,
    output: statuses[i % statuses.length] === "AC" ? tc.output : "wrong",
    status: statuses[i % statuses.length],
  }));

  mockSubmissions.set(submissionId, {
    results,
    createdAt: Date.now(),
  });

  res.status(200).json({
    success: true,
    data: { id: submissionId, status: "pending" },
  });
});

/**
 * @GET_SUBMISSION
 * @ROUTE @GET {{URL}}/api/submissions/:id
 * @ACCESS Public
 */
const getSubmission = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // If external SubmissionService is configured, proxy to it
  if (SUBMISSION_SERVICE) {
    try {
      const proxyRes = await fetch(`${SUBMISSION_SERVICE}/submissions/${id}`, {
        cache: "no-store",
      });
      const data = await proxyRes.json();
      return res.status(proxyRes.status).json(data);
    } catch {
      // Fall through to mock mode
    }
  }

  // Mock mode: return completed after 2s delay
  const submission = mockSubmissions.get(id);
  if (!submission) {
    return next(new AppError("Submission not found", 404));
  }

  const elapsed = Date.now() - submission.createdAt;
  const isCompleted = elapsed > 2000;

  res.status(200).json({
    success: true,
    data: {
      id,
      status: isCompleted ? "completed" : "pending",
      submissionData: isCompleted ? { results: submission.results } : null,
    },
  });
});

module.exports = { createSubmission, getSubmission };
