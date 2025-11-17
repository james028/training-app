const asyncHandler = require("express-async-handler");
const PlankTestDataModel = require("./model-test");

// @desc    Gets all plank trainings from every month
// @route   GET /api/plank/list
exports.getPlankTest = asyncHandler(async (req, res) => {
  try {
    const plankList = await PlankTestDataModel.find({}, null, null);
    //const plankList = await PlankTestDataModel.deleteMany({});

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
exports.createPlankTest = asyncHandler(async (req, res) => {
  const { month, day, duration, isDifferentExercises } = req.body;

  console.log(req.body);

  try {
    const plankList = await PlankTestDataModel.find({}, null, null);

    if (plankList.length === 0) {
      const createdData = await PlankTestDataModel.findOneAndUpdate(
        {},
        {
          $push: { [month]: { month, day, duration, isDifferentExercises } },
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      );

      // if (createdData) {
      //   res
      //     .status(200)
      //     .json({ message: `Utworzono dla id: ${createdData.id}` });
      // }
    } else {
      const createdData = await PlankTestDataModel.findOneAndUpdate(
        { [month]: { $exists: true } },
        {
          $push: {
            [month]: { month, day, duration, isDifferentExercises },
          },
        },
      );

      if (createdData) {
        res
          .status(200)
          .json({ message: `Utworzono dla id: ${createdData.id}` });
      }
    }
  } catch (error) {
    console.log(error, "err");
    res.status(404).json({ error: "Not found!" });
  }
});

// @desc    Update exist training
// @route   POST lub PUT /api/plank/update
exports.updatePlankTest = asyncHandler(async (req, res) => {
  const { id, month, duration, day, isDifferentExercises } = req.body;

  try {
    const findEntryById = async (id) => {
      try {
        const docs = await PlankTestDataModel.find({}, null, null);
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

    const findData = await findEntryById(id);

    if (!findData) {
      res.status(404).json({ message: "Data not found" });
    }

    const updateData = {
      month: month || findData?.month,
      duration: duration || findData?.duration,
      day: day || findData?.day,
      isDifferentExercises:
        isDifferentExercises || findData?.isDifferentExercises,
    };

    await PlankTestDataModel.updateOne(
      { [`${findData?.month}._id`]: findData?._id },
      { $pull: { [findData?.month]: { _id: findData?._id } } },
    );

    const updatedData = await PlankTestDataModel.updateOne(
      {},
      { $push: { [month]: { _id: id, ...updateData } } },
    );

    if (updatedData) {
      res.status(200).json({ message: `Zaaktualizowano` });
    }
  } catch (error) {
    console.log(error, "err");
    res.status(404).json({ error: "Not found!" });
  }
});

// @desc    Delete exist training
// @route   DELETE /api/plank/delete
exports.deletePlankTest = asyncHandler(async (req, res) => {
  const { id, month } = req.query;

  try {
    const deletedData = await PlankTestDataModel.updateOne(
      { [`${month}._id`]: id },
      { $pull: { [month]: { _id: id } } },
    );

    if (deletedData) {
      res.status(200).json({ message: `Usunięto` });
    }
  } catch (error) {
    console.log(error, "err");
    res.status(404).json({ error: "Not found!" });
  }
});
