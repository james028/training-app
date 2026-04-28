const mongoose = require("mongoose");

const todoItemSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

const checklistItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    sets: [
      {
        name: { type: String, required: true },
        order: { type: Number, default: 0 },
        items: [todoItemSchema],
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("ChecklistItem", checklistItemSchema);
