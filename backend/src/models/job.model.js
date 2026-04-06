const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    id: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    location: {
      type: String,
    },
    platform: {
      type: String,
    },
    postedDate: {
      type: String,
    },
    url: {
      type: String,
      unique: true,
      sparse: true,
    },
    description: {
      type: String,
    },
    timestamp: {
      type: Number,
    },
    fetchedAt: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Job = model("Job", jobSchema);

module.exports = Job;
