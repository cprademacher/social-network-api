const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
} = require("../../controllers/thoughtController");

// Route for getting all thoughts and creating a thought is /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// Route for getting single thought by id
router.route("/:id").get(getSingleThought);

module.exports = router;
