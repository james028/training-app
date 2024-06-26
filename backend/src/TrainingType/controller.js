const asyncHandler = require("express-async-handler");
const TrainingTypeDataModel = require("./model");

// @desc    Get all training types
// @route   GET /api/training-type/list
exports.getListTrainingType = asyncHandler(async (req, res) => {
  try {
    const trainingTypeList = await TrainingTypeDataModel.find({}, null, null);
    //const trainingTypeList = await TrainingTypeDataModel.deleteMany({});

    console.log(trainingTypeList.filter(Boolean), "ww");
    const list = trainingTypeList?.filter(Boolean);
    if (!trainingTypeList) {
      res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json({
      list: trainingTypeList
        .filter((obj) => {
          // Tworzymy nowy obiekt na podstawie istniejącego obiektu, ale bez klucza "__v"
          const { __v, ...rest } = obj;
          return rest;
        })
        .filter(Boolean),
    });
  } catch (error) {
    console.log(error, "err");
    res.status(404).json({ error: "Not found!" });
  }
});

// @desc    Create new training type
// @route   POST /api/training-type/create
exports.createTrainingType = asyncHandler(async (req, res) => {
  const { name, color } = req.query;

  console.log("ss");
  console.log(req.query);
  try {
    const createdData = await TrainingTypeDataModel.create(
      { name, color },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    if (createdData) {
      res
        .status(200)
        .json({ message: `Utworzono dla id: ${createdData?._id}` });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Not found!" });
  }
});
