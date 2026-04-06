const asyncHandler = require("../middlewares/asyncHandler.middleware");
const AppError = require("../utils/AppError");
const Course = require("../models/course.model");
const Module = require("../models/module.model");
const Topic = require("../models/topic.model");
const Lesson = require("../models/lesson.model");
const { getJavaLessonBySlug } = require("../data/javaLessons");

/**
 * @GET_ALL_COURSES
 * @ROUTE @GET {{URL}}/api/courses
 * @ACCESS Public
 */
const getAllCourses = asyncHandler(async (_req, res, _next) => {
  const courses = await Course.find({ isActive: true }).sort({ order: 1 });

  const transformedCourses = await Promise.all(
    courses.map(async (course) => {
      const modules = await Module.find({ courseId: course._id });
      const topicCounts = await Promise.all(
        modules.map((mod) => Topic.countDocuments({ moduleId: mod._id }))
      );
      const topicCount = topicCounts.reduce((sum, c) => sum + c, 0);

      return {
        id: course._id,
        slug: course.slug,
        title: course.title,
        description: course.description,
        image: course.image,
        level: course.level,
        duration: course.duration,
        tags: course.tags,
        moduleCount: modules.length,
        topicCount,
      };
    })
  );

  res.status(200).json({
    success: true,
    message: "Courses fetched successfully",
    courses: transformedCourses,
  });
});

/**
 * @GET_COURSE_BY_SLUG
 * @ROUTE @GET {{URL}}/api/courses/:courseSlug
 * @ACCESS Public
 */
const getCourseBySlug = asyncHandler(async (req, res, next) => {
  const { courseSlug } = req.params;

  const course = await Course.findOne({ slug: courseSlug });
  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  const modules = await Module.find({ courseId: course._id }).sort({ order: 1 });

  const transformedModules = await Promise.all(
    modules.map(async (mod) => {
      const topics = await Topic.find({ moduleId: mod._id }).sort({ order: 1 });

      const topicsWithLesson = await Promise.all(
        topics.map(async (topic) => {
          const lesson = await Lesson.findOne({ topicId: topic._id }).select("_id");
          return {
            id: topic._id,
            title: topic.title,
            xp: topic.xp,
            order: topic.order,
            isFree: topic.isFree,
            lessonId: lesson ? lesson._id : null,
          };
        })
      );

      return {
        id: mod._id,
        title: mod.title,
        order: mod.order,
        topics: topicsWithLesson,
      };
    })
  );

  res.status(200).json({
    success: true,
    message: "Course fetched successfully",
    course: {
      id: course._id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      image: course.image,
      level: course.level,
      duration: course.duration,
      tags: course.tags,
    },
    modules: transformedModules,
  });
});

/**
 * @GET_JAVA_LESSON
 * @ROUTE @GET {{URL}}/api/courses/java/lessons/:slug
 * @ACCESS Public
 */
const getJavaLesson = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const lesson = getJavaLessonBySlug(slug);

  if (!lesson) {
    return next(new AppError("Lesson not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Java lesson fetched successfully",
    course: lesson.course,
    chapter: lesson.chapter,
    title: lesson.title,
    description: lesson.description,
    content: lesson.content,
    codeSnippet: lesson.codeSnippet,
    metadata: lesson.metadata ?? {},
  });
});

module.exports = { getAllCourses, getCourseBySlug, getJavaLesson };
