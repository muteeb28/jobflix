const asyncHandler = require("../middlewares/asyncHandler.middleware");
const AppError = require("../utils/AppError");
const { prisma } = require("../config/db");

/**
 * @GET_LESSON
 * @ROUTE @GET {{URL}}/api/lessons/:lessonId
 * @ACCESS Public
 */
const getLesson = asyncHandler(async (req, res, next) => {
  const { lessonId } = req.params;

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      subtopics: { orderBy: { order: "asc" } },
      topic: {
        include: {
          module: {
            include: {
              course: { select: { slug: true, title: true } },
              topics: {
                orderBy: { order: "asc" },
                select: {
                  id: true,
                  title: true,
                  lesson: { select: { id: true } },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!lesson) {
    return next(new AppError("Lesson not found", 404));
  }

  const allTopics = lesson.topic.module.topics;
  const currentIndex = allTopics.findIndex((t) => t.id === lesson.topic.id);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic =
    currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  res.status(200).json({
    success: true,
    message: "Lesson fetched successfully",
    lesson: {
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      task: lesson.task,
      hint: lesson.hint,
      initialCode: lesson.initialCode,
      subtopics: lesson.subtopics.map((st) => ({
        id: st.id,
        title: st.title,
        content: st.content,
        order: st.order,
      })),
    },
    topic: {
      id: lesson.topic.id,
      title: lesson.topic.title,
      xp: lesson.topic.xp,
      isFree: lesson.topic.isFree,
    },
    course: {
      slug: lesson.topic.module.course.slug,
      title: lesson.topic.module.course.title,
    },
    navigation: {
      prevLessonId: prevTopic?.lesson?.id || null,
      nextLessonId: nextTopic?.lesson?.id || null,
    },
  });
});

module.exports = { getLesson };
