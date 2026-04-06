const asyncHandler = require("../middlewares/asyncHandler.middleware");
const AppError = require("../utils/AppError");
const { prisma } = require("../config/db");

/**
 * @SUBMIT_APPLICATION
 * @ROUTE @POST {{URL}}/api/apply
 * @ACCESS Public
 */
const submitApplication = asyncHandler(async (req, res, next) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !phone || !service) {
    return next(
      new AppError("Name, email, phone, and service are required", 400)
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new AppError("Invalid email format", 400));
  }

  // Try to identify the user by session cookie
  let userId = null;
  const sessionId = req.cookies?.levelup_session;

  if (sessionId) {
    const user = await prisma.user.findUnique({ where: { sessionId } });
    if (user) {
      userId = user.id;
      if (!user.email) {
        await prisma.user.update({
          where: { id: user.id },
          data: { email, name },
        });
      }
    }
  }

  const submission = await prisma.formSubmission.create({
    data: {
      userId,
      formType: "quick_apply",
      data: {
        name,
        email,
        phone,
        service,
        message: message || null,
        submittedAt: new Date().toISOString(),
      },
      status: "pending",
    },
  });

  res.status(201).json({
    success: true,
    message: "Application submitted successfully",
    submissionId: submission.id,
  });
});

module.exports = { submitApplication };
