const asyncHandler = require("../middlewares/asyncHandler.middleware");
const { getJobs } = require("../services/jobs.service");

const DEFAULT_QUERY = "React developer";

/**
 * @GET_JOBS
 * @ROUTE @GET {{URL}}/api/jobs
 * @ACCESS Public
 */
const fetchJobs = asyncHandler(async (req, res, _next) => {
  const query = req.query.query || DEFAULT_QUERY;
  const page = Math.max(1, parseInt(req.query.page || "1", 10));
  const limit = Math.max(1, parseInt(req.query.limit || "20", 10));

  const { jobs, total } = await getJobs(query, page, limit);

  res.status(200).json({
    success: true,
    message: "Jobs fetched successfully",
    jobs,
    total,
  });
});

module.exports = { fetchJobs };
