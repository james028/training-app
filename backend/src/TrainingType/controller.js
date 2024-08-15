const asyncHandler = require("express-async-handler");
const TrainingTypeDataModel = require("./model");

// @desc    Get all training types
// @route   GET /api/training-type/list
exports.getListTrainingType = asyncHandler(async (req, res) => {
  try {
    const trainingTypeList = await TrainingTypeDataModel.find({}, null, null);
    //const trainingTypeList = await TrainingTypeDataModel.deleteMany({});

    if (!trainingTypeList) {
      res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(trainingTypeList);
  } catch (error) {
    console.log(error, "err");
    res.status(404).json({ error: "Not found!" });
  }
});

// @desc    Create new training type
// @route   POST /api/training-type/create
exports.createTrainingType = asyncHandler(async (req, res) => {
  const { trainingName, color } = req.body;

  try {
    const createdData = await TrainingTypeDataModel.create({
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
