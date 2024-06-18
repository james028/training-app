const asyncHandler = require("express-async-handler");
const PlankDataModel = require("./model");

// @desc    Gets all plank trainings from every month
// @route   GET /api/plank/list
exports.getPlank = asyncHandler(async (req, res) => {
  try {
    const plankList = await PlankDataModel.find({}, null, null);

    if (!plankList) {
      res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json(plankList);
  } catch (error) {
    console.log(error, "err");
    res.status(404).json({ error: "Not found!" });
  }
});

// @desc    Create new plank training
// @route   POST /api/plank/create
exports.createPlank = asyncHandler(async (req, res) => {
  try {
    const { month } = req.body;

    console.log(req.body, "body");

    const createdData = await PlankDataModel.findOneAndUpdate(
      { [month]: { $exists: true } },
      {
        $push: {
          [month]: req.body,
        },
      },
    );

    if (createdData) {
      res.status(200).json({ message: `Utworzono dla id: ${createdData.id}` });
    }
  } catch (error) {
    console.log(error, "err");
    res.status(404).json({ error: "Not found!" });
  }
});

// @desc    Update exist training
// @route   POST lub PUT /api/plank/update
exports.updatePlank = asyncHandler(async (req, res) => {
  try {
    const { id, month } = req.query;

    const findEntryById = async (id) => {
      try {
        const docs = await PlankDataModel.find({});
        for (const doc of docs) {
          for (let month = 1; month <= 12; month++) {
            const entries = doc[month.toString()];
            for (const entry of entries) {
              if (entry._id.toString() === id) {
                return entry;
              }
            }
          }
        }
        return null;
      } catch (error) {
        console.error("Error finding entry:", error);
        return null;
      }
    };

    const findData = await findEntryById(req.query.id);

    if (!findData) {
      res.status(404).json({ message: "Data not found" });
    }

    const updateData = {
      month: req.query.month || findData.month,
      duration: req.query.duration || findData.duration,
      day: req.query.day || findData.day,
      isDifferentExercises:
        req.query.isDifferentExercises || findData.isDifferentExercises,
    };

    const updatedData = await PlankDataModel.findOneAndUpdate(
      {},
      { $set: { [month]: [{ _id: id, ...updateData }] } },
      { new: true },
    );

    if (updatedData) {
      res
        .status(200)
        .json({ message: `Zaaktualizowano dla id: ${deletedData.id}` });
    }
  } catch (error) {
    console.log(error, "err");
    res.status(404).json({ error: "Not found!" });
  }
});

// @desc    Delete exist training
// @route   DELETE /api/plank/delete
exports.deletePlank = asyncHandler(async (req, res) => {
  try {
    const { id, month } = req.query;

    const deletedData = await PlankDataModel.findOneAndUpdate(
      {},
      { $pull: { [month]: { _id: id } } },
      { new: true },
    );

    if (deletedData) {
      res.status(200).json({ message: `Usunięto dla id: ${deletedData.id}` });
    }
  } catch (error) {
    console.log(error, "err");
    res.status(404).json({ error: "Not found!" });
  }
});
