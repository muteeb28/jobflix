const { Router } = require("express");
const { fetchJobs } = require("../controllers/jobs.controller");

const router = Router();

// Both GET and POST hit the same handler (same behaviour as original Next.js route)
router.get("/", fetchJobs);
router.post("/", fetchJobs);

module.exports = router;
