const { Router } = require("express");
const { getProblems, getProblemById } = require("../controllers/problems.controller");

const router = Router();

router.get("/", getProblems);
router.get("/:id", getProblemById);

module.exports = router;
