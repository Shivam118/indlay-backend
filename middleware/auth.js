// middleware/auth.js
const jwt = require("jsonwebtoken");
const SECRET_KEY = "shivamDallahailodusala";  // Make sure to secure this in production

exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Admin access required" });
  next();
};
