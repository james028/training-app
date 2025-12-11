const asyncHandler = require("express-async-handler");
const TrainingTypeDataModel = require("./model");

// @desc    Get all training types
// @route   GET /api/training-type/list
exports.getListTrainingType = asyncHandler(async (req, res) => {
  const trainingTypeList = await TrainingTypeDataModel.find({});

  if (trainingTypeList.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No training types found",
    });
  }

  res.status(200).json({
    success: true,
    count: trainingTypeList.length,
    data: trainingTypeList,
  });
});

// @desc    Create new training type
// @route   POST /api/training-type/create
exports.createTrainingType = asyncHandler(async (req, res) => {
  const { type, trainingName, color } = req.body;

  try {
    const createdData = await TrainingTypeDataModel.create({
      type,
      trainingName,
      color,
    });

    if (createdData) {
      res.status(200).json({ message: "Utworzono nowy typ treningu" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Not found!" });
  }
});
