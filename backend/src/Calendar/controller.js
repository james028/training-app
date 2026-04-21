const asyncHandler = require("express-async-handler");
const CalendarDataModel = require("./model");

const extractDateParts = (isoDate) => {
  const datePart = isoDate.split("T")[0];
  const [year, month, day] = datePart.split("-").map(Number);
  return { year, month, day };
};

// @desc    Gets all months with activities on a given day
// @route   GET /api/activities/list
exports.getActivitiesList = asyncHandler(async (req, res) => {
  const { year, month } = req.query;
  const userId = req.user.id;

  if (!year || !month) {
    return res.status(400).json({
      error: "Brak wymaganych parametrów: year i month",
    });
  }
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

  return res.status(200).json(monthlyData);
});

// @desc    Create new training
// @route   POST /api/activities/create
exports.addNewActivityToCalendar = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const {
    activity,
    duration,
    bikeType,
    bikeKilometers,
    title,
    description,
    activityDate,
  } = req.body;

  if (!activityDate || !activity || !duration) {
    return res.status(400).json({ error: "Brak wymaganych pól" });
  }

  const { year, month, day } = extractDateParts(activityDate);
  const yearMonthKey = `${year}-${String(month).padStart(2, "0")}`;

  const newTask = {
    activity,
    duration,
    ...(bikeType && { bikeType }),
    ...(bikeKilometers && { bikeKilometers }),
    ...(title && { title }),
    ...(description && { description }),
    activityDate,
  };

  let doc = await CalendarDataModel.findOneAndUpdate(
    { userId, yearMonthKey, "days.dayNumber": day },
    { $push: { "days.$.tasks": newTask } },
    { new: true },
  );

  if (!doc) {
    doc = await CalendarDataModel.findOneAndUpdate(
      { userId, yearMonthKey },
      { $push: { days: { dayNumber: day, tasks: [newTask] } } },
      { new: true, upsert: true },
    );
  }

  await doc.populate("days.tasks.activity");

  const createdDay = doc.days.find((d) => d.dayNumber === day);
  const createdTask = createdDay?.tasks[createdDay.tasks.length - 1];

  if (!createdTask) {
    return res.status(500).json({ error: "Failed to retrieve created task" });
  }

  return res.status(201).json(createdTask.toObject());
});

// @desc    Edit added activity
// @route   PATCH /api/activities/edit/:id
exports.editAddedTraining = asyncHandler(async (req, res) => {
  const userId = req.user.id;

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
    //success: true,
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
