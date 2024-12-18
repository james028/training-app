const asyncHandler = require("express-async-handler");
const PlankDataModel = require("./model");

// @desc    Gets all plank trainings from every month
// @route   GET /api/plank/list
exports.getPlank = asyncHandler(async (req, res) => {
  try {
    const plankList = await PlankDataModel.find({}, null, null);
    //const plankList = await PlankDataModel.deleteMany({});

    if (!plankList) {
      res.status(404).json({ message: "Data not found" });
    }

    let obj = {};

    for (const [key, value] of Object.entries(plankList)) {
      obj[key] = value;
    }
    // Object.entries(plankList).forEach(([item, item2]) => {
    //   console.log(item, "item");
    //   console.log(item2, "item2");
    //
    // });
    res.status(200).json(obj);
  } catch (error) {
    console.log(error, "err");
    res.status(404).json({ error: "Not found!" });
  }
});

// @desc    Create new plank training
// @route   POST /api/plank/create
exports.createPlank = asyncHandler(async (req, res) => {
  const { month, day, duration, isDifferentExercises } = req.body;

  console.log(req.body);
  try {
    const plankList = await PlankDataModel.find({}, null, null);

    // // Konstrukcja obiektu aktualizacji
    // const updatePath = `${month}.$[outer].${day}`; // Dynamically access path
    //
    // const update = {
    //   $push: {
    //     [updatePath]: { duration, isDifferentExercises },
    //   },
    // };
    //
    // const options = {
    //   arrayFilters: [{ "outer.monthKey": { $exists: true } }], // Matching array elements
    //   new: true, // Return the updated document
    // };

    if (plankList.length === 0) {
      // Konstrukcja obiektu aktualizacji
      const updatePath = `${month}.$[outer].${day}`; // Dynamically access path

      const update = {
        $push: {
          [updatePath]: { duration, isDifferentExercises },
        },
      };

      const options = {
        arrayFilters: [{ "outer.monthKey": { $exists: true } }], // Matching array elements
        new: true, // Return the updated document
      };
      //to do funkcji utils, options jako parameter
      const createdData = await PlankDataModel.findOneAndUpdate(
        {},
        {
          // $push: {
          //   [month]: { month, day, duration, isDifferentExercises },
          // },
          update,
          options,
        },

        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      );

      if (createdData) {
        res
          .status(200)
          .json({ message: `Utworzono dla id: ${createdData.id}` });
      }
    } else {
      // Konstrukcja obiektu aktualizacji
      const updatePath = `${month}.$[outer].${day}`; // Dynamically access path

      const update = {
        $push: {
          [updatePath]: { duration, isDifferentExercises },
        },
      };

      const options = {
        arrayFilters: [{ "outer.monthKey": { $exists: true } }], // Matching array elements
        new: true, // Return the updated document
      };
      const createdData = await PlankDataModel.findOneAndUpdate(
        //{ [month]: { $exists: true } },
        {
          // $push: {
          //   [month]: { month, day, duration, isDifferentExercises },
          // },
          update,
          options,
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
// @route   PATCH /api/plank/update
exports.updatePlank = asyncHandler(async (req, res) => {
  const { id, month, duration, day, isDifferentExercises } = req.body;

  try {
    const findEntryById = async (id) => {
      try {
        const docs = await PlankDataModel.find({}, null, null);
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

    //po co to ??
    //usuniecie ?
    await PlankDataModel.updateOne(
      { [`${findData?.month}._id`]: findData?._id },
      { $pull: { [findData?.month]: { _id: findData?._id } } },
    );

    const updateData = {
      month: month || findData?.month,
      duration: duration || findData?.duration,
      day: day || findData?.day,
      isDifferentExercises:
        isDifferentExercises || findData?.isDifferentExercises,
    };

    const updatedData = await PlankDataModel.updateOne(
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
exports.deletePlank = asyncHandler(async (req, res) => {
  const { id, month } = req.query;

  try {
    const deletedData = await PlankDataModel.updateOne(
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
