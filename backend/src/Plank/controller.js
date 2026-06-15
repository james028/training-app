const asyncHandler = require("express-async-handler");
const PlankDataModel = require("./model");

// @desc    Gets all plank trainings from every month
// @route   GET /api/plank/list
exports.getPlank = asyncHandler(async (req, res) => {
  const { year } = req.query;
  const userId = req.user.id;

  const query = { userId };

  if (year) {
    query.year = {
      date: {
        $gte: new Date(`${year}-01-01`),
        $lte: new Date(`${year}-12-31T23:59:59`),
      },
    };
  }

  const sessions = await PlankDataModel.find(query).sort({ date: 1 });

  if (!sessions) {
    res.status(404).json({ message: "ie znaleziono danych" });
  }

  res.status(200).json({ data: sessions });
});

// @desc    Create new plank training
// @route   POST /api/plank/create
exports.createPlank = asyncHandler(async (req, res) => {
  const { month, day, duration, isDifferentExercises } = req.body;
  const currentYear = new Date().getFullYear();

  if (!id) {
    res.status(401).json({ message: "Nie istnieje id użytkownika" });
  }

  if (!month || !day || !duration || isDifferentExercises === undefined) {
    return res
      .status(400)
      .json({ message: "Brakuje wymaganych danych treningu." });
  }

  // Tworzymy datę (month - 1, bo w JS styczeń to 0)
  const date = new Date(currentYear, parseInt(month) - 1, parseInt(day));

  const newSession = await PlankDataModel.create({
    userId: req.user.id,
    duration,
    date,
    isDifferentExercises,
  });

  res.status(201).json(
    json({
      data: newSession,
      message: `Rekord treningu utworzono dla userId: ${id}`,
    }),
  );
});

// @desc    Update exist training
// @route   PATCH /api/plank/update
exports.updatePlank = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const updatedData = req.body;

  // --- ZABEZPIECZENIE ---
  // Usuwamy pola, których użytkownik nie ma prawa zmieniać samemu
  delete updatedData.userId;
  delete updatedData._id;
  // ----------------------

  if (!id || Object.keys(updatedData).length === 0) {
    return res
      .status(400)
      .json({ message: "Brak wymaganych danych do aktualizacji." });
  }

  const session = await PlankDataModel.findOneAndUpdate(
    { _id: id, userId }, // Dodajemy userId dla bezpieczeństwa!
    { $set: updatedData },
    { new: true }, // Zwraca zaktualizowany dokument
  );

  if (!session)
    return res.status(404).json({ message: "Sesja nie znaleziona" });
  res.status(200).json(session);
});

// @desc    Delete exist training
// @route   DELETE /api/plank/delete
exports.deletePlank = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const deleted = await PlankDataModel.findOneAndDelete({
    _id: id,
    userId,
  });

  if (!deleted) {
    return res.status(404).json({ message: "Sesja nie znaleziona" });
  }

  res.status(200).json({ message: "Sesja usunięta" });
});
