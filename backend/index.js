const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { createServer } = require("http");
const { Server } = require("socket.io");

dotenv.config();

const connectDB = require("./src/config/db");
const errorMiddleware = require("./src/middlewares/error.middleware");

const app = express();
const httpServer = createServer(app);

// Socket.io setup
const io = new Server(httpServer, {
  cors: {
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
  },
});

/** In-memory set of connected socket IDs */
const onlineUsers = new Set();

const ONLINE_INFLATION = 100;

io.on("connection", (socket) => {
  onlineUsers.add(socket.id);
  io.emit("onlineCount", onlineUsers.size + ONLINE_INFLATION);

  socket.on("disconnect", () => {
    onlineUsers.delete(socket.id);
    io.emit("onlineCount", onlineUsers.size + ONLINE_INFLATION);
  });
});

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

// Online count REST endpoint (for initial fetch before socket connects)
app.get("/api/online-count", (_req, res) => {
  res.status(200).json({
    success: true,
    count: onlineUsers.size + ONLINE_INFLATION,
  });
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

httpServer.listen(PORT, async () => {
  await connectDB();
  console.log(`Jobflix backend running on http://localhost:${PORT}`);
});
