const { Schema, model } = require("mongoose");

const lessonSubtopicSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const lessonSchema = new Schema(
  {
    topicId: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
    },
    task: {
      type: String,
    },
    hint: {
      type: String,
    },
    initialCode: {
      type: String,
    },
    subtopics: {
      type: [lessonSubtopicSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Lesson = model("Lesson", lessonSchema);

module.exports = Lesson;
