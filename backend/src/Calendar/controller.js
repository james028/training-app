const asyncHandler = require("express-async-handler");
const CalendarDataModel = require("./model");

const calendarDataForCurrentMonth = {
  year: 2025,
  month: 12,
  tasks: [
    {
      id: "a1b2c3d4",
      type: "Spotkanie projektowe",
      bikeKilometers: "pending",
      bikeType: "high",
      fullDateTime: "2025-12-05T09:00:00Z", // Zadanie na 5 listopada
    },
    {
      id: "a1b2c3d4",
      type: "Spotkanie projektowe2",
      bikeKilometers: "pending",
      bikeType: "high",
      fullDateTime: "2025-12-05T09:00:00Z", // Zadanie na 5 listopada
    },
    {
      id: "e5f6g7h8",
      type: "Wysłanie raportu",
      bikeKilometers: "completed",
      bikeType: "medium",
      fullDateTime: "2025-12-10T14:30:00Z", // Zadanie na 10 listopada
    },
    {
      id: "e5f6g7h8",
      type: "Wysłanie raportu",
      bikeKilometers: "completed",
      bikeType: "medium",
      fullDateTime: "2025-12-10T14:30:00Z", // Zadanie na 10 listopada
    },
    {
      id: "i9j0k1l2",
      type: "Urodziny Tomka",
      bikeKilometers: "completed",
      bikeType: "low",
      fullDateTime: "2025-12-15T18:00:00Z", // Zadanie na 15 listopada
    },
    {
      id: "m3n4o5p6",
      type: "Rejestracja domeny",
      bikeKilometers: "pending",
      bikeType: "high",
      fullDateTime: "2025-12-20T10:00:00Z", // Zadanie na 20 listopada
    },
    {
      id: "q7r8s9t0",
      type: "Spotkanie integracyjne",
      bikeKilometers: "pending",
      bikeType: "medium",
      fullDateTime: "2025-12-25T17:00:00Z", // Zadanie na 25 listopada
    },
  ],
};

// @desc    Gets all months with workouts on a given day
// @route   GET /api/calendar/list
exports.getCalendarDataList = asyncHandler(async (req, res) => {
  try {
    //const calendarDataList = await CalendarDataModel.find({}, null, null);

    //console.log(calendarDataList, calendarDataList);

    res.status(200).json(calendarDataForCurrentMonth);
  } catch (error) {
    console.log(error, "err");
    res.status(404).json({ error: "Not found!" });
  }
});

// @desc    Create new training
// @route   POST /api/calendar/create
exports.createNewTraining = asyncHandler(async (req, res) => {
  console.log(req.body, " body creaate");

  //req.body.month = 1,2,3,4...
  try {
  } catch (error) {
    console.log(error, "err");
    res.status(404).json({ error: "Not found!" });
  }
});
