const asyncHandler = require("express-async-handler");
const UserModel = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function comparePassword(password, existPassword) {
  return bcrypt.compare(password, existPassword);
}

exports.handleRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Wszystkie pola są wymagane" });
  }

  try {
    console.log(username, email, password);
    const existingUser = await UserModel.findOne({ email }, null, null);

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

    res.status(201).json({
      message: "Rejestracja zakończona sukcesem!",
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Błąd serwera. Spróbuj ponownie później." });
  }
});

exports.handleLogin = asyncHandler(async (req, res) => {
  const { email: userEmail, password } = req.body;

  console.log(userEmail);

  try {
    const user = await UserModel.findOne({ email: userEmail }, null, null);

    console.log(user);
    if (!user) {
      res.status(401).json({ message: "Nie znaleziono użytkownika" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).json({ message: "Niepoprawne hasło" });
    }

    const accessToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET || "supersecret",
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET || "supersecret",
      { expiresIn: "7d" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // HTTPS
      sameSite: "None", // cross-site
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dni
      path: "/",
    });

    const { _id: id, username, email } = user;
    res.json({
      data: {
        accessToken,
        id,
        username,
        email,
      },
      message: "Zalogowano pomyślnie",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Błąd serwera. Spróbuj ponownie później." });
  }
});

exports.handleLogout = asyncHandler(async (req, res) => {
  console.log("csdsadsad", req.cookies?.accessToken, req.cookies?.refreshToken);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });

  res.status(200).json({ message: "Successfully logged out" });
});
