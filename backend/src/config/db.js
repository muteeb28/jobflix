const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
});

const connectToDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to database via Prisma");
  } catch (error) {
    console.log("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = { prisma, connectToDB };
