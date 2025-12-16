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
  const yearMonthKey = `${year}-${String(month).padStart(2, "0")}`;

  const monthlyData = await CalendarDataModel.findOne({
    userId: userId,
    yearMonthKey: yearMonthKey,
  }).lean();

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
  //to pózniej zrobie
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
    year,
  } = req.body;

  if (!dateTime || !trainingType || !duration || !day || !month || !year) {
    return res.status(400).json({
      error:
        "Brak wymaganych pól: trainingType, duration, dateTime, day, month, year.",
    });
  }

  const date = new Date(dateTime);

  if (isNaN(date.getTime())) {
    return res.status(400).json({
      error: "Nieprawidłowy format daty",
    });
  }

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

// @desc    Edit added activity
// @route   PATCH /api/calendar/edit
exports.editAddedTraining = asyncHandler(async (req, res) => {
  // 1. Walidacja Użytkownika i Danych
  //const userId = req.user.id; // Zakładamy autentykację
  const userId = "1234";

  // Dane lokalizacyjne i ID zadania muszą przyjść z frontendu
  const { year, month, day, taskId, ...updatedFields } = req.body;

  // Oczekujemy, że front-end prześle zaktualizowane pola (np. title, duration, bikeType)
  if (
    !taskId ||
    !day ||
    !month ||
    !year ||
    Object.keys(updatedFields).length === 0
  ) {
    return res.status(400).json({ error: "Brak wymaganych danych do edycji." });
  }

  // Zbudowanie klucza grupowania
  const yearMonthKey = `${year}-${String(month).padStart(2, "0")}`;

  console.log(taskId, day, month, yearMonthKey, year, updatedFields);

  if (updatedFields.dateTime) {
    updatedFields.dateTime = new Date(updatedFields.dateTime);
  }

  // Używamy $set do zaktualizowania konkretnych pól
  const update = {};
  for (const key in updatedFields) {
    // Klucz dynamiczny: "days.$.tasks.$[task].title"
    // Wskazuje ścieżkę do pola 'key' w zadaniu 'task'
    update[`days.$.tasks.$[task].${key}`] = updatedFields[key];
  }

  // 4. Wykonanie Zapytania Mongoose
  const monthDoc = await CalendarDataModel.findOneAndUpdate(
    {
      // A. Lokalizacja Głównego Dokumentu (Miesiąc/Użytkownik)
      userId: userId,
      yearMonthKey: yearMonthKey,
      // B. Lokalizacja Dnia (W tablicy 'days')
      "days.dayNumber": day,
      // C. Warunek upewniający się, że zadanie istnieje, ale nie używamy go w warunku,
      // tylko jako część ArrayFilters dla optymalizacji
    },
    { $set: update },
    {
      new: true,
      arrayFilters: [
        // To jest kluczowe! Wskazuje, który element tablicy 'tasks' ma być zmieniony
        { "task._id": taskId },
      ],
    },
  );

  // 5. Obsługa Wyniku
  if (!monthDoc) {
    return res
      .status(404)
      .json({ error: "Nie znaleziono zadania do aktualizacji." });
  }

  return res.status(200).json({
    success: true,
    message: "Zadanie zaktualizowane pomyślnie",
  });
});

// @desc    Remove exist training
// @route   DELETE /api/calendar/remove/:id
exports.deleteExistTraining = asyncHandler(async (req, res) => {
  console.log(req.params);
  console.log(req.body);

  // 1. Walidacja Użytkownika i Danych
  // /const userId = req.user.id; // Zakładamy autentykację
  const userId = "1234";
  const { id: taskId } = req.params; // ID treningu z URL
  //const taskId =

  const { year, month, day } = req.body;
  //
  if (!taskId || !day || !month || !year) {
    return res
      .status(400)
      .json({ error: "Brak wymaganych danych (taskId, day, month, year)." });
  }

  const yearMonthKey = `${year}-${String(month).padStart(2, "0")}`;

  // 2. Budowanie Zapytania Mongoose (Użycie $pull)

  const monthDoc = await CalendarDataModel.findOneAndUpdate(
    {
      userId: userId,
      yearMonthKey: yearMonthKey,
      // B. Lokalizacja Dnia (w tablicy 'days')
      "days.dayNumber": day,
    },
    {
      // Operator $pull: usuwa elementy z tablicy na podstawie warunku
      $pull: {
        "days.$.tasks": {
          _id: taskId,
        },
      },
    },
    { new: true },
  );

  if (!monthDoc) {
    return res.status(404).json({
      error: "Nie znaleziono zadania do usunięcia w podanej lokalizacji.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Zadanie usunięte pomyślnie",
  });
});
