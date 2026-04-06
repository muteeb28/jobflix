const { Router } = require("express");
const {
  getAllCourses,
  getCourseBySlug,
  getJavaLesson,
} = require("../controllers/courses.controller");

const router = Router();

// IMPORTANT: specific sub-routes must be defined before dynamic /:courseSlug
router.get("/java/lessons/:slug", getJavaLesson);

router.get("/", getAllCourses);
router.get("/:courseSlug", getCourseBySlug);

module.exports = router;
