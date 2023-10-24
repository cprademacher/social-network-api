const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
} = require("../../controllers/thoughtController");

// Route for getting all thoughts and post to create a new thought
router.route("/").get(getThoughts).post(createThought);

// Route for getting single thought by id
router.route("/:thoughtId").get(getSingleThought);

// Route for deleting a thought by id
router.route("/:thoughtId").delete(deleteThought);

// Route for updating a thought by id
router.route("/:thoughtId").put(updateThought);

module.exports = router;
