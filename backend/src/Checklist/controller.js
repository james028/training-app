// controllers/checklistController.js
const asyncHandler = require("express-async-handler");
const ChecklistItem = require("./model");

// GET /api/checklist - Pobierz wszystkie
exports.getChecklistItems = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const items = await ChecklistItem.find({ userId }).sort({
    order: 1,
    createdAt: 1,
  });

  res.json({
    success: true,
    items,
  });
});

// POST /api/checklist - Dodaj nowy punkt
exports.createChecklistItem = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      success: false,
      message: "Tekst jest wymagany",
    });
  }

  const item = new ChecklistItem({ userId, text });
  await item.save();

  res.status(201).json({
    success: true,
    item,
  });
});

// PATCH /api/checklist/:id/toggle - Przełącz completed
exports.toggleChecklistItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const item = await ChecklistItem.findByIdAndUpdate({ userId, _id: id });

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Nie znaleziono elementu",
    });
  }

  item.completed = !item.completed;
  await item.save();

  res.json({
    success: true,
    item,
  });
});

// DELETE /api/checklist/:id - Usuń punkt
exports.deleteChecklistItem = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const item = await ChecklistItem.findByIdAndDelete({
    userId,
    _id: id,
  });

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Nie znaleziono elementu",
    });
  }

  res.json({
    success: true,
    message: "Element usunięty",
  });
});
