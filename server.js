// server.js
const express = require("express");
const mongoose = require("mongoose");
const userController = require("./controllers/UserController");

const app = express();
const { verifyToken, isAdmin } = require("./middleware/auth");
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/shivam", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Routes
app.post("/register", userController.registerUser);
app.post("/login", userController.loginUser);
app.get("/users", verifyToken, isAdmin, userController.getAllUsers); // Only admins can access

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
