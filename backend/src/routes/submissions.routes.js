const { Router } = require("express");
const { createSubmission, getSubmission } = require("../controllers/submissions.controller");

const router = Router();

router.post("/", createSubmission);
router.get("/:id", getSubmission);

module.exports = router;
