const Thought = require("../models/Thought");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      console.log(thoughts);
      res.json(thoughts);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        res.status(404).json({ message: "No thought with this ID." });
      }
      console.log(thought);
      res.json(thought);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);
      res.json(dbThoughtData);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findByIdAndDelete(
        req.params.thoughtId
      );

      if (!deletedThought) {
        res.status(404).json({ message: "No thought with that id found." });
      }

      res.json({ message: "Successfully deleted!"});
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: "No thought with that id" });
      }

      return res.json(updatedThought);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

// ADD A PUT AND DELETE ROUTE TO UPDATE AND REMOVE THOUGHTS

// ADD A POST AND DELETE ROUTE TO ADD AND REMOVE REACTIONS FOR THOUGHTS
