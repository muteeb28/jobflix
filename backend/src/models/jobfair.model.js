const { Schema, model, default: mongoose } = require("mongoose");

const jobFairSchema = new Schema(
  {
    jobFairId: {
      type: String,
      required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    user: {
        name: String,
        email: String,
        phone: String,
    },

    college: {
        type: String,
        required: true,
    },

    branch: {
        type: String,
        required: true,
    },

    year: {
        type: String,
        required: true,
    },

    universityRollno: {
        type: String,
        reuquired: true,
    }
  },
  {
    timestamps: true,
  }
);

const JobFair = model("JobFair", jobFairSchema);

module.exports = JobFair;
