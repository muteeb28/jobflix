const { Router } = require("express");
const { getProgress, updateProgress } = require("../controllers/progress.controller");

const router = Router();

router.get("/", getProgress);
router.post("/", updateProgress);

module.exports = router;
