const asyncHandler = require("../middlewares/asyncHandler.middleware");
const AppError = require("../utils/AppError");
const Lesson = require("../models/lesson.model");
const Topic = require("../models/topic.model");
const Module = require("../models/module.model");
const Course = require("../models/course.model");

/**
 * @GET_LESSON
 * @ROUTE @GET {{URL}}/api/lessons/:lessonId
 * @ACCESS Public
 */
const getLesson = asyncHandler(async (req, res, next) => {
  const { lessonId } = req.params;

  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    return next(new AppError("Lesson not found", 404));
  }

  const topic = await Topic.findById(lesson.topicId);
  if (!topic) {
    return next(new AppError("Topic not found", 404));
  }

  const mod = await Module.findById(topic.moduleId);
  if (!mod) {
    return next(new AppError("Module not found", 404));
  }

  const course = await Course.findById(mod.courseId).select("slug title");
  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  // Build prev/next navigation from sibling topics in the same module
  const allTopics = await Topic.find({ moduleId: mod._id }).sort({ order: 1 }).select("_id title");
  const currentIndex = allTopics.findIndex((t) => t._id.equals(topic._id));

  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  const [prevLesson, nextLesson] = await Promise.all([
    prevTopic ? Lesson.findOne({ topicId: prevTopic._id }).select("_id") : null,
    nextTopic ? Lesson.findOne({ topicId: nextTopic._id }).select("_id") : null,
  ]);

  res.status(200).json({
    success: true,
    message: "Lesson fetched successfully",
    lesson: {
      id: lesson._id,
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      task: lesson.task,
      hint: lesson.hint,
      initialCode: lesson.initialCode,
      subtopics: lesson.subtopics
        .sort((a, b) => a.order - b.order)
        .map((st) => ({
          id: st._id,
          title: st.title,
          content: st.content,
          order: st.order,
        })),
    },
    topic: {
      id: topic._id,
      title: topic.title,
      xp: topic.xp,
      isFree: topic.isFree,
    },
    course: {
      slug: course.slug,
      title: course.title,
    },
    navigation: {
      prevLessonId: prevLesson ? prevLesson._id : null,
      nextLessonId: nextLesson ? nextLesson._id : null,
    },
  });
});

module.exports = { getLesson };
