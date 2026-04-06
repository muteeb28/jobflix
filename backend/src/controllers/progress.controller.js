const asyncHandler = require("../middlewares/asyncHandler.middleware");
const AppError = require("../utils/AppError");
const User = require("../models/user.model");
const UserProgress = require("../models/userProgress.model");
const Topic = require("../models/topic.model");

const SESSION_COOKIE_NAME = "levelup_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds

/**
 * Get or create a user based on the session cookie.
 * @param {object} req
 * @returns {{ user: object, sessionId: string, isNew: boolean }}
 */
async function getOrCreateUser(req) {
  let sessionId = req.cookies?.[SESSION_COOKIE_NAME];
  let isNew = false;

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    isNew = true;
  }

  let user = await User.findOne({ sessionId });

  if (!user) {
    user = await User.create({ sessionId });
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

  const progress = await UserProgress.find({
    userId: user._id,
    isCompleted: true,
  }).select("topicId xpEarned completedAt");

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
    message: "Progress fetched successfully",
    userId: user._id,
    totalXp: user.totalXp,
    completedTopics: progress.map((p) => p.topicId.toString()),
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

  const topic = await Topic.findById(topicId);
  if (!topic) {
    return next(new AppError("Topic not found", 404));
  }

  const existingProgress = await UserProgress.findOne({
    userId: user._id,
    topicId: topic._id,
  });

  if (existingProgress?.isCompleted) {
    return res.status(200).json({
      success: true,
      message: "Topic already completed",
      alreadyCompleted: true,
      totalXp: user.totalXp,
    });
  }

  const updatedProgress = await UserProgress.findOneAndUpdate(
    { userId: user._id, topicId: topic._id },
    {
      isCompleted: true,
      xpEarned: topic.xp,
      completedAt: new Date(),
    },
    { upsert: true, new: true }
  );

  user.totalXp += topic.xp;
  await user.save();

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
    totalXp: user.totalXp,
    progress: updatedProgress,
  });
});

module.exports = { getProgress, updateProgress };
