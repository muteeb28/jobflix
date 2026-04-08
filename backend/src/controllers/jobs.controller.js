import { getJobs } from "../services/jobs.service.js";
import JobFair from "../models/jobfair.model.js";

const DEFAULT_QUERY = "React developer";

/**
 * @GET_JOBS
 * @ROUTE @GET {{URL}}/api/jobs
 * @ACCESS Public
 */
export const fetchJobs = async (req, res, _next) => {
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
};

export const jobFairRegister = async(req, res) => {

  try {
    const { name, email, phone, college, branch, year, rollNo } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !college || !branch || !year || !rollNo) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // create a new job fair registration document
    const user = {
      name,
      email,
      phone,
    }
    const jobFairRegistration = new JobFair({
      userId: req.user._id,
      user,
      jobFairId: "jbid" + college + Date.now(),
      college,
      branch,
      year,
      rollNo,
    });

    // save the registration to the db
    await jobFairRegistration.save();
    res.status(201).json({
      success: true,
      message: "Job fair registration successfull",
    });
  } catch (error) {
    console.log("error from jobFairRegister controller", error);
    res.status(500).json({
      success: false,
      message: "Server error while registering for job fair",
    });
  }
}
