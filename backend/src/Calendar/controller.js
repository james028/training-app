const asyncHandler = require("express-async-handler");
const CalendarDataModel = require("./model");

const calendarDataForCurrentMonth = {
  year: 2025,
  month: 12,
  tasks: [
    {
      id: "a1b2c3d3",
      type: "rower",
      bikeKilometers: "pending",
      bikeType: "high",
      fullDateTime: "2025-12-05T09:00:00Z", // Zadanie na 5 listopada
    },
    {
      id: "a1b2c3d4",
      type: "airbike",
      bikeKilometers: "pending",
      bikeType: "high",
      fullDateTime: "2025-12-05T09:00:00Z", // Zadanie na 5 listopada
    },
    {
      id: "e5f6g7h9",
      type: "rower",
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
  console.log(req.query);
  console.log(req.params);

  const { year, month } = req.query;
  //const userId = req.user.id;
  const userId = "1234";

  if (!year || !month) {
    return res.status(400).json({
      error: "Brak wymaganych parametrów: year i month",
    });
  }

  // const yearNum = parseInt(year);
  // const monthNum = parseInt(month);
  //
  // if (yearNum < 2000 || yearNum > 2100 || monthNum < 1 || monthNum > 12) {
  //   return res.status(400).json({
  //     error: "Nieprawidłowe wartości: year (2000-2100), month (1-12)",
  //   });
  // }

  //const yearMonthKey = `${yearNum}-${String(monthNum).padStart(2, "0")}`;
  const yearMonthKey = `${year}-${String(month).padStart(2, "0")}`;

  const monthlyData = await CalendarDataModel.findOne({
    userId: userId,
    yearMonthKey: yearMonthKey,
  }).lean();

  console.log(monthlyData);

  if (!monthlyData) {
    return res.status(200).json({
      _id: null,
      userId: userId,
      yearMonthKey: yearMonthKey,
      days: [],
    });
  }

  // Zwróć dane
  return res.status(200).json(monthlyData);
});

// @desc    Create new training
// @route   POST /api/calendar/create
exports.createNewTraining = asyncHandler(async (req, res) => {
  console.log(req.body, " body creaate");

  // const userId = req.user.id;
  const userId = "1234";
  const {
    trainingType,
    duration,
    bikeType,
    bikeKilometers,
    title,
    description,
    dateTime,
    day,
    month,
  } = req.body;

  if (!dateTime || !trainingType || !duration) {
    return res.status(400).json({
      error: "Brak wymaganych pól: title, dateTime",
    });
  }

  const date = new Date(dateTime);

  if (isNaN(date.getTime())) {
    return res.status(400).json({
      error: "Nieprawidłowy format daty",
    });
  }

  //const date = new Date(dateTime);
  const year = date.getFullYear();
  // const month = date.getMonth() + 1;
  //const dayNumber = date.getDate();
  const yearMonthKey = `${year}-${String(month).padStart(2, "0")}`;

  const newObject = {
    trainingType,
    duration,
    bikeType,
    bikeKilometers,
    title,
    description,
    dateTime: date,
  };
  const monthDoc = await CalendarDataModel.findOneAndUpdate(
    {
      userId: userId,
      yearMonthKey: yearMonthKey,
      "days.dayNumber": day,
    },
    {
      $push: { "days.$.tasks": newObject },
    },
    { new: true, upsert: false },
  );

  // Jeśli dzień nie istnieje
  if (!monthDoc) {
    await CalendarDataModel.findOneAndUpdate(
      { userId: userId, yearMonthKey: yearMonthKey },
      {
        $push: {
          days: {
            dayNumber: day,
            tasks: [newObject],
          },
        },
      },
      { new: true, upsert: true },
    );
  }

  return res.status(201).json({
    success: true,
    message: "Zadanie utworzone pomyślnie",
    activity: newObject,
  });
});
