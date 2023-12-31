const User = require("../models/User");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID." });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete({
        _id: req.params.userId,
      });

      if (!deletedUser) {
        res.status(404).json({ message: "No user with that ID." });
      }

      res.json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json(updatedUser);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

// ADD A PUT AND DELETE ROUTE TO UPDATE AND REMOVE USERS

// ADD A POST AND DELETE ROUTE TO ADD AND REMOVE FRIENDS FOR USERS
