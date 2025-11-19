const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

exports.authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log(req.headers, "headers");

  console.log("auth middleware", authHeader);
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  console.log("token", token);
  if (!token) return res.status(401).json({ message: "Invalid token format" });

  console.log("try w auth");
  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "dev_secret",
    );
    console.log("Decoded token:", decoded);
    req.user = decoded; // { id, email, roles }
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token 1" });
  }
});
