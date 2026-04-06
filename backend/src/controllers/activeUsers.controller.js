const asyncHandler = require("../middlewares/asyncHandler.middleware");
const { prisma } = require("../config/db");

/**
 * @GET_ACTIVE_USERS
 * @ROUTE @GET {{URL}}/api/active-users
 * @ACCESS Public
 */
const getActiveUsers = asyncHandler(async (_req, res, _next) => {
  const count = await prisma.user.count();

  res.status(200).json({
    success: true,
    message: "Active users count fetched successfully",
    count,
  });
});

module.exports = { getActiveUsers };
