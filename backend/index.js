const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./src/config/db");
const errorMiddleware = require("./src/middlewares/error.middleware");

const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Health check
app.get("/ping", (_req, res) => {
  res.send("Pong");
});

// Routes
app.use("/api/active-users", require("./src/routes/activeUsers.routes"));
app.use("/api/apply",        require("./src/routes/apply.routes"));
app.use("/api/ask",          require("./src/routes/ask.routes"));
app.use("/api/company",      require("./src/routes/company.routes"));
app.use("/api/courses",      require("./src/routes/courses.routes"));
app.use("/api/hackathons",   require("./src/routes/hackathons.routes"));
app.use("/api/jobs",         require("./src/routes/jobs.routes"));
app.use("/api/lessons",      require("./src/routes/lessons.routes"));
app.use("/api/prepare",      require("./src/routes/prepare.routes"));
app.use("/api/problems",     require("./src/routes/problems.routes"));
app.use("/api/progress",     require("./src/routes/progress.routes"));
app.use("/api/scholarships", require("./src/routes/scholarships.routes"));
app.use("/api/submissions",  require("./src/routes/submissions.routes"));

// 404 catch-all
app.all("*", (_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Jobflix backend running on http://localhost:${PORT}`);
});
