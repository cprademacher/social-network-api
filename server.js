const express = require("express");
const db = require("./config/connection");
// Require model
const { User, Reaction, Thought } = require("./models");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set routes here

// GET all users
app.get("/all-users", async (req, res) => {
  try {
    const userData = await User.find({});
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ message: "Internal server error." });
  }
});

// GET a single user by its _id and populated thought and friend data
app.get("/user-by-id/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const response = await User.findOne({ _id: userId });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: "Internal server error." });
  }
});

// POST a new user
app.post("/new-user/:username/:email", (req, res) => {});

// PUT route to update a user by its _id
app.put("/update-user-by-id/:id", async (req, res) => {
  const userId = req.params.id;

  try {
  } catch (err) {
    res.status(500).json({ message: "Internal server error." });
  }
});

// DELETE route to remove a user by its _id
app.delete("/delete-user-by-id/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const response = await User.findOneAndDelete({ _id: userId });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: "Internal server error." });
  }
});

// Set to start server
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
  });
});
