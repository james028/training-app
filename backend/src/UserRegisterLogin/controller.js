const asyncHandler = require("express-async-handler");
const UserModel = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function comparePassword(password, existPassword) {
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
    res.cookie("jwt", "sss", {
      httpOnly: false,
      // sameSite: "None",
      // secure: true,
      // maxAge: 24 * 60 * 60 * 1000,
    });

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
      res.status(401).json({ message: "Nie znaleziono użytkownika" });
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
        { expiresIn: "30s" },
      );

      res.cookie("jwt", "sss", {
        //httpOnly: true,
        // sameSite: "None",
        // secure: true,
        // maxAge: 24 * 60 * 60 * 1000,
      });

      const { password, ...restData } = user;

      res.json({
        accessToken,
        message: "Zalogowałeś się",
        data: { id: user._id, email: user.email, username: user.username },
      });
    } else {
      res.status(401).json({ message: "Niepoprawne hasło" });
    }
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
});
