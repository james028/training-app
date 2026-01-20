const asyncHandler = require("express-async-handler");
const CalendarDataModel = require("./model");

const extractDateParts = (dateTime) => {
  const date = new Date(dateTime);

  // Sprawdzamy, czy data jest poprawna
  if (isNaN(date.getTime())) {
    return null;
  }

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // +1 bo w JS miesiące są 0-11
    day: date.getDate(), // getDate() zwraca dzień miesiąca (1-31)
  };
};

// @desc    Gets all months with activities on a given day
// @route   GET /api/activities/list
exports.getActivitiesList = asyncHandler(async (req, res) => {
  const { year, month } = req.query;
  const userId = req.user.id;
  //const userId = "1234";

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
  })
    .populate({
      path: "days.tasks.activity",
      model: "ActivityType",
    })
    .lean();

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
// @route   POST /api/activities/create
exports.addNewActivityToCalendar = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  //const userId = "1234";

  const {
    activityTypeId,
    duration,
    bikeType,
    bikeKilometers,
    title,
    description,
    dateTime,
    day,
    month,
  } = req.body;

  if (!dateTime || !activityTypeId || !duration || !day || !month) {
    return res.status(400).json({
      error:
        "Brak wymaganych pól: day, month, activityTypeId, duration, dateTime.",
    });
  }

  const date = new Date(dateTime);

  if (isNaN(date.getTime())) {
    return res.status(400).json({
      error: "Nieprawidłowy format daty",
    });
  }

  const { year } = extractDateParts(dateTime);

  console.log(year, month, day);
  const yearMonthKey = `${year}-${String(month).padStart(2, "0")}`;

  const newObject = {
    activity: activityTypeId,
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
    message: "Aktywność utworzona pomyślnie",
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
