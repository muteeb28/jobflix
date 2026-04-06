const { Schema, model } = require("mongoose");

const userProgressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    topicId: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    xpEarned: {
      type: Number,
      default: 0,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userProgressSchema.index({ userId: 1, topicId: 1 }, { unique: true });

const UserProgress = model("UserProgress", userProgressSchema);

module.exports = UserProgress;
