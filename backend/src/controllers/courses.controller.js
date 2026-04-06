const asyncHandler = require("../middlewares/asyncHandler.middleware");
const AppError = require("../utils/AppError");
const { prisma } = require("../config/db");
const { getJavaLessonBySlug } = require("../data/javaLessons");

/**
 * @GET_ALL_COURSES
 * @ROUTE @GET {{URL}}/api/courses
 * @ACCESS Public
 */
const getAllCourses = asyncHandler(async (_req, res, _next) => {
  const courses = await prisma.course.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    include: {
      modules: {
        include: {
          _count: {
            select: { topics: true },
          },
        },
      },
    },
  });

  const transformedCourses = courses.map((course) => ({
    id: course.id,
    slug: course.slug,
    title: course.title,
    description: course.description,
    image: course.image,
    level: course.level,
    duration: course.duration,
    tags: course.tags,
    moduleCount: course.modules.length,
    topicCount: course.modules.reduce((sum, mod) => sum + mod._count.topics, 0),
  }));

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

  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          topics: {
            orderBy: { order: "asc" },
            select: {
              id: true,
              title: true,
              xp: true,
              order: true,
              isFree: true,
              lesson: { select: { id: true } },
            },
          },
        },
      },
    },
  });

  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  const transformedModules = course.modules.map((module) => ({
    id: module.id,
    title: module.title,
    order: module.order,
    topics: module.topics.map((topic) => ({
      id: topic.id,
      title: topic.title,
      xp: topic.xp,
      order: topic.order,
      isFree: topic.isFree,
      lessonId: topic.lesson?.id || null,
    })),
  }));

  res.status(200).json({
    success: true,
    message: "Course fetched successfully",
    course: {
      id: course.id,
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
