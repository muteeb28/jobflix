const asyncHandler = require("../middlewares/asyncHandler.middleware");
const User = require("../models/user.model");

/**
 * @GET_ACTIVE_USERS
 * @ROUTE @GET {{URL}}/api/active-users
 * @ACCESS Public
 */
const getActiveUsers = asyncHandler(async (_req, res, _next) => {
  const count = await User.countDocuments();

  res.status(200).json({
    success: true,
    message: "Active users count fetched successfully",
    count,
  });
});

module.exports = { getActiveUsers };
