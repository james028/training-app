// controllers/checklistController.js
const asyncHandler = require("express-async-handler");
const ChecklistItem = require("./model");

// GET /api/checklist - Pobierz wszystkie
exports.getChecklistItems = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  let checklistItems = await ChecklistItem.findOne({ userId })
    .sort({
      order: 1,
      createdAt: 1,
    })
    .lean();

  if (!checklistItems) {
    checklistItems = await ChecklistItem.create({
      userId,
      sets: [
        {
          name: "Set nr 1",
          order: 0,
          items: [],
        },
      ],
    });
  }

  const sets = checklistItems.sets;

  return res.status(200).json({ sets });
});

// POST /api/checklist - Dodaj nowy set
exports.createNewSetInChecklist = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { setName } = req.body;

  let checklistItems = await ChecklistItem.findOne({ userId });

  if (!checklistItems) {
    checklistItems = await ChecklistItem.create({
      userId,
      sets: [],
    });
  }

  const orders = checklistItems.sets.map((s) => s.order);
  const maxOrder = orders?.length ? Math.max(...orders) : -1;

  checklistItems.sets.push({
    name: setName || `Set nr ${checklistItems.sets.length + 1}`,
    order: maxOrder + 1,
    items: [],
  });

  await checklistItems.save();

  return res
    .status(200)
    .json({ message: "Dodano nowy set", sets: checklistItems.sets });
});

// POST /api/checklist - Dodaj nowy punkt
exports.createChecklistItem = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { setId } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      success: false,
      message: "Tekst jest wymagany",
    });
  }

  const checklistItems = await ChecklistItem.findOne({ userId });

  if (!checklistItems) {
    return res.status(404).json({ error: "Todo sets not found" });
  }

  const set = checklistItems.sets.id(setId);
  if (!set) {
    return res.status(404).json({ error: "Set not found" });
  }

  set.items.push({
    text,
    completed: false,
    order: set.items.length,
  });
  await checklistItems.save();

  res.status(201).json({
    message: "Dodano nowy item",
    item: checklistItems,
  });
});

// PATCH /api/checklist/:setId/toggle-item/:itemId - Przełącz completed
exports.toggleChecklistItem = asyncHandler(async (req, res) => {
  const { setId, itemId } = req.params;
  const userId = req.user.id;
  const { completed } = req.body;

  const checklistItems = await ChecklistItem.findOne({ userId });
  if (!checklistItems) {
    return res.status(404).json({ error: "Todo sets not found" });
  }

  const set = checklistItems.sets.id(setId);
  if (!set) {
    return res.status(404).json({ error: "Set not found" });
  }

  const item = set.items.id(itemId);
  if (!item) {
    return res.status(404).json({ error: "Item sets not found" });
  }

  item.completed = completed;
  await checklistItems.save();

  res.json({
    message: "Zaaktualizowano",
    item,
  });
});

// DELETE /api/checklist/:setId - Usuń set
exports.deleteChecklistSet = asyncHandler(async (req, res) => {
  const { setId } = req.params;
  const userId = req.user.id;

  const checklistItems = await ChecklistItem.findOne({ userId });
  if (!checklistItems) {
    return res.status(404).json({ error: "Todo sets not found" });
  }

  checklistItems.sets.pull(setId);
  await checklistItems.save();

  res.json({
    message: "Element usunięty",
    //sets: checklistItems.sets,
  });
});

// DELETE /api/checklist/:setId/item-remove/:itemId - Usuń item
exports.deleteChecklistItem = asyncHandler(async (req, res) => {
  const { setId, itemId } = req.params;
  const userId = req.user.id;

  const checklistItems = await ChecklistItem.findOne({ userId });
  if (!checklistItems) {
    return res.status(404).json({ error: "Todo sets not found" });
  }

  const set = checklistItems.sets.id(setId);
  if (!set) {
    return res.status(404).json({ error: "Set not found" });
  }

  set.items.pull(itemId);
  await checklistItems.save();

  res.json({
    message: "Element usunięty",
  });
});
