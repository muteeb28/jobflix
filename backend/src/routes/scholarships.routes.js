const { Router } = require("express");
const { getScholarships } = require("../controllers/scholarships.controller");

const router = Router();

router.get("/", getScholarships);

module.exports = router;
