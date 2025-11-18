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
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email }, null, null);

    if (!user) {
      res.status(401).json({ message: "Nie znaleziono użytkownika" });
    }

    console.log(req.body, "a");
    //
    // 2. Porównanie hasła

    const match = await bcrypt.compare(password, user.password);
    console.log(match, password, user.password);
    if (!match) {
      return res.status(404).json({ message: "Niepoprawne hasło" });
    }

    //
    // 3. Generujemy access + refresh token

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

    // 4. Ustawiamy refresh token w httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // HTTPS
      sameSite: "None", // cross-site
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dni
      path: "/",
    });

    // 5. Zwracamy access token i dane użytkownika
    res.json({
      accessToken,
      data: { id: user._id, username: user.username, email: user.email },
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
  const cookies = req.cookies;
  console.log(cookies, "cookies");

  console.log("csdsadsad", req.cookies?.accessToken, req.cookies?.refreshToken);
  // if (!cookies?.jwt) {
  //   return res.status(204); //No content
  // }
  // //const refreshToken = cookies.jwt;
  //
  // res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  // res.status(204);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });

  res.sendStatus(204); // brak treści
});
