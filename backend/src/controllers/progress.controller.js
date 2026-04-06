const asyncHandler = require("../middlewares/asyncHandler.middleware");
const AppError = require("../utils/AppError");
const { prisma } = require("../config/db");

const SESSION_COOKIE_NAME = "levelup_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds

/**
 * Get or create a user based on the session cookie.
 * @param {object} req
 * @param {object} res
 * @returns {{ user: object, sessionId: string, isNew: boolean }}
 */
async function getOrCreateUser(req) {
  let sessionId = req.cookies?.[SESSION_COOKIE_NAME];
  let isNew = false;

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    isNew = true;
  }

  let user = await prisma.user.findUnique({ where: { sessionId } });

  if (!user) {
    user = await prisma.user.create({ data: { sessionId } });
    isNew = true;
  }

  return { user, sessionId, isNew };
}

/**
 * @GET_PROGRESS
 * @ROUTE @GET {{URL}}/api/progress
 * @ACCESS Public
 */
const getProgress = asyncHandler(async (req, res, _next) => {
  const { user, sessionId, isNew } = await getOrCreateUser(req);

  const progress = await prisma.userProgress.findMany({
    where: { userId: user.id, isCompleted: true },
    select: {
      topicId: true,
      xpEarned: true,
      completedAt: true,
    },
  });

  if (isNew) {
    res.cookie(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE * 1000, // express uses ms
    });
  }

  res.status(200).json({
    success: true,
    message: "Progress fetched successfully",
    userId: user.id,
    totalXp: user.totalXp,
    completedTopics: progress.map((p) => p.topicId),
    progress,
  });
});

/**
 * @UPDATE_PROGRESS
 * @ROUTE @POST {{URL}}/api/progress
 * @ACCESS Public
 */
const updateProgress = asyncHandler(async (req, res, next) => {
  const { user, sessionId, isNew } = await getOrCreateUser(req);
  const { topicId } = req.body;

  if (!topicId) {
    return next(new AppError("topicId is required", 400));
  }

  const topic = await prisma.topic.findUnique({ where: { id: topicId } });
  if (!topic) {
    return next(new AppError("Topic not found", 404));
  }

  const existingProgress = await prisma.userProgress.findUnique({
    where: { userId_topicId: { userId: user.id, topicId } },
  });

  if (existingProgress?.isCompleted) {
    return res.status(200).json({
      success: true,
      message: "Topic already completed",
      alreadyCompleted: true,
      totalXp: user.totalXp,
    });
  }

  const [updatedProgress, updatedUser] = await prisma.$transaction([
    prisma.userProgress.upsert({
      where: { userId_topicId: { userId: user.id, topicId } },
      create: {
        userId: user.id,
        topicId,
        isCompleted: true,
        xpEarned: topic.xp,
        completedAt: new Date(),
      },
      update: {
        isCompleted: true,
        xpEarned: topic.xp,
        completedAt: new Date(),
      },
    }),
    prisma.user.update({
      where: { id: user.id },
      data: { totalXp: { increment: topic.xp } },
    }),
  ]);

  if (isNew) {
    res.cookie(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE * 1000,
    });
  }

  res.status(200).json({
    success: true,
    message: "Topic completed",
    xpEarned: topic.xp,
    totalXp: updatedUser.totalXp,
    progress: updatedProgress,
  });
});

module.exports = { getProgress, updateProgress };
