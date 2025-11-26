const asyncHandler = require("express-async-handler");
const PlankDataModel = require("./model");

const data1 = [
  {
    1: [
      {
        duration: "01:07:02",
        month: "1",
        day: 1,
        _id: "6602d89e3339f1f956d48702",
      },
      {
        duration: "00:09:02",
        month: "1",
        day: 14,
        _id: "6602d89e3339f1f956d48702",
      },
      {
        duration: "00:07:02",
        month: "1",
        day: 19,
        isDifferentExercises: true,
        _id: "6602d89e3339f1f956d48702",
      },
      {
        duration: "00:11:02",
        month: "1",
        day: 22,
        isDifferentExercises: true,
        _id: "6602d89e3339f1f956d48702",
      },
      {
        duration: "00:11:02",
        month: "1",
        day: 22,
        _id: "6602d89e3339f1f956d48702",
      },
      {
        duration: "00:11:02",
        month: "1",
        day: 22,
        _id: "6602d89e3339f1f956d48702",
      },
      {
        duration: "00:11:02",
        month: "1",
        day: 22,
        _id: "6602d89e3339f1f956d48702",
      },
      {
        duration: "00:11:02",
        month: "1",
        day: 22,
        _id: "6602d89e3339f1f956d48702",
      },
    ],
    2: [],
    3: [],
    4: [],
    5: [
      {
        duration: "01:01:02",
        month: "5",
        day: 17,
        _id: "6602d89e3339f1f956d48702",
      },
      {
        duration: "01:01:02",
        month: "5",
        day: 18,
        _id: "6602d89e3339f1f956d48702",
      },
    ],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
  },
];

const data = [
  {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [
      {
        duration: "01:01:02",
        month: "5",
        day: 17,
        _id: "6602d89e3339f1f956d48701",
      },
      {
        duration: "02:01:02",
        month: "5",
        day: 18,
        _id: "6602d89e3339f1f956d48702",
      },
    ],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
  },
];

// @desc    Gets all plank trainings from every month
// @route   GET /api/plank/list
exports.getPlank = asyncHandler(async (req, res) => {
  //const id = req.user.id;
  try {
    //const plankList = await PlankDataModel.find({}, null, null);

    //console.log(id);
    //const plankList = await PlankDataModel.findById({ _id: id }, null, null);
    //const plankList = await PlankDataModel.findById({}, null, null);
    //const plankList = await PlankDataModel.deleteMany({});

    // console.log(plankList, "planList");
    // if (!plankList) {
    //   res.status(404).json({ message: "Data not found" });
    // }

    // let obj = {};
    //
    // for (const [key, value] of Object.entries(plankList)) {
    //   obj[key] = value;
    // }
    // Object.entries(plankList).forEach(([item, item2]) => {
    //   console.log(item, "item");
    //   console.log(item2, "item2");
    //
    // });
    res.status(200).json(data);
  } catch (error) {
    console.log(error, "err");
    res.status(404).json({ error: "Not found!" });
  }
});

// @desc    Create new plank training
// @route   POST /api/plank/create
exports.createPlank = asyncHandler(async (req, res) => {
  const { month, day, duration, isDifferentExercises } = req.body;

  if (!month || !day || !duration || isDifferentExercises === undefined) {
    return res
      .status(400)
      .json({ message: "Brakuje wymaganych danych treningu." });
  }

  const id = req.user.id;

  if (!id) {
    res.status(401).json({ message: "Nie istnieje id użytkownika" });
  }
  try {
    const createdData = await PlankDataModel.findOneAndUpdate(
      {
        userId: id,
      },
      {
        $push: {
          [month]: {
            month,
            day,
            duration,
            isDifferentExercises,
            createdAt: new Date(),
          },
        },
        //$set: { updatedAt: new Date() },
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
        .json({ message: `Rekord treningu utworzono dla userId: ${id}` });
    }
  } catch (error) {
    console.error("Błąd podczas tworzenia rekordu Plank:", error);

    res.status(500).json({
      message: "Wystąpił błąd serwera. Nie udało się utworzyć rekordu.",
    });
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
    // await PlankDataModel.updateOne(
    //   { [`${findData?.month}._id`]: findData?._id },
    //   { $pull: { [findData?.month]: { _id: findData?._id } } },
    // );

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
