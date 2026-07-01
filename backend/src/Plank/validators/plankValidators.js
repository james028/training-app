const Joi = require("joi");
const mongoose = require("mongoose");

//poprawić
const plankSchema = Joi.object({
  // month: Joi.string()
  //   .regex(/^\d{2}$/)
  //   .required(), // "01"-"12"
  // day: Joi.string()
  //   .regex(/^\d{2}$/)
  //   .required(), // "01"-"31"
  date: Joi.date().iso().required(),
  duration: Joi.string()
    .regex(/^\d{2}:\d{2}:\d{2}$/)
    .required(), // HH:MM:SS
  isDifferentExercises: Joi.boolean().required(),
});

const validateYearQuery = (req, res, next) => {
  if (!req.query.year) return next(); // Jeśli roku brak, przejdź dalej

  const schema = Joi.string()
    .pattern(/^\d{4}$/)
    .required();
  const { error } = schema.validate(req.query.year);

  if (error) return res.status(400).json({ message: "Niepoprawny rok." });
  next();
};

const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Niepoprawny format ID." });
  }

  next();
};

// Walidator dla POST
const validateCreatePlank = (req, res, next) => {
  const { error } = plankSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

// Walidator dla PATCH (pola opcjonalne, bo to edycja)
const validateUpdatePlank = (req, res, next) => {
  const schema = plankSchema.fork(
    ["month", "day", "duration", "isDifferentExercises"],
    (schema) => schema.optional(),
  );
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = {
  validateYearQuery,
  validateObjectId,
  validateCreatePlank,
  validateUpdatePlank,
};
