const asyncHandler = require("express-async-handler");
const UserModel = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function comparePassword() {
  return bcrypt.compare(password, existPassword);
}

exports.handleRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  try {
    console.log(username, email, password);
    const existingUser = await UserModel.findOne({ email }, null, null);

    console.log(existingUser, "ex");
    if (existingUser) {
      return res.status(400).json({
        message: "Użytkownik z takim e-mailem już istnieje.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Rejestracja zakończona sukcesem!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Błąd serwera. Spróbuj ponownie później." });
  }
});

exports.handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email }, null, null);

    if (!user) {
      res.json({ message: "Nie znaleziono użytkownika" });
    }

    const match = await comparePassword(password, user.password);

    console.log(match, password, user.password);
    if (match) {
      // create JWTs
      const accessToken = jwt.sign(
        { username: user.username },
        `${process.env.ACCESS_TOKEN_SECRET}`,
        { expiresIn: "30s" },
      );
      const refreshToken = jwt.sign(
        { username: user.username },
        `${process.env.REFRESH_TOKEN_SECRET}`,
        { expiresIn: "1d" },
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } else {
      res.json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Błąd serwera. Spróbuj ponownie później." });
  }
});
