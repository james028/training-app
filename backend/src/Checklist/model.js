const mongoose = require("mongoose");

const checklistItemSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false, // Automatycznie usuwa pole '__v'
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
    timestamps: true,
  },
);

module.exports = mongoose.model("ChecklistItem", checklistItemSchema);
