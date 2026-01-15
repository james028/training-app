const asyncHandler = require("express-async-handler");
const ActivityTypeDataModel = require("./model");

// @desc    Get all activity types
// @route   GET /api/activity-type/list
exports.getListActivityType = asyncHandler(async (req, res) => {
  const activityTypeList = await ActivityTypeDataModel.find({}).sort({
    order: 1,
    createdAt: 1,
  });

  if (!activityTypeList) {
    return res.status(404).json({
      success: false,
      message: "No activity types found",
    });
  }

  res.status(200).json({
    success: true,
    count: activityTypeList.length,
    data: activityTypeList,
  });
});

// @desc    Create new activity type
// @route   POST /api/activity-type/create
exports.createActivityType = asyncHandler(async (req, res) => {
  const { type, activityName, color } = req.body;

  if (!type || !activityName) {
    res.status(400);
    throw new Error("Proszę podać wszystkie wymagane pola");
  }

  const createdData = await ActivityTypeDataModel.create({
    type,
    activityName,
    color,
  });

  if (createdData) {
    res.status(201).json({
      message: "Utworzono nowy typ aktywności",
      data: createdData,
    });
  } else {
    res.status(400);
    throw new Error("Nieprawidłowe dane typu aktywności");
  }
});

// @desc    Update activity type (only name and color)
// @route   PATCH /api/activity-type/edit/:id
exports.updateActivityType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { activityName, color } = req.body;

  const updatedData = await ActivityTypeDataModel.findByIdAndUpdate(
    id,
    {
      activityName,
      color,
    },
    {
      new: true, // Zwróć obiekt po aktualizacji, a nie przed
      runValidators: true, // Uruchom walidację ze schemy (np. required)
    },
  );

  if (!updatedData) {
    res.status(404);
    throw new Error("Nie znaleziono typu aktywności o podanym ID");
  }

  res.status(200).json({
    message: "Zaktualizowano typ aktywności",
    data: updatedData,
  });
});

// @desc    Delete activity type
// @route   DELETE /api/activity-type/remove/:id
exports.deleteActivityType = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedItem = await ActivityTypeDataModel.findByIdAndDelete(id);

  if (!deletedItem) {
    res.status(404);
    throw new Error(
      "Nie znaleziono typu aktywności o podanym ID. Mógł zostać już usunięty.",
    );
  }

  res.status(200).json({
    message: "Typ aktywności został pomyślnie usunięty",
    id: id,
  });
});
