const { Router } = require("express");
const { getLesson } = require("../controllers/lessons.controller");

const router = Router();

router.get("/:lessonId", getLesson);

module.exports = router;
