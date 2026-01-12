const { body } = require("express-validator");
exports.registerValidators = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Nieprawidłowy adres email")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Hasło musi mieć minimum 8 znaków")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Hasło musi zawierać małą literę, wielką literę i cyfrę"),

  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Hasła nie są identyczne"),
];
