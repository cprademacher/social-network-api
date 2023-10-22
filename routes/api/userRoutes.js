const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../../controllers/userController");

// Route for getting all users
router.route("/").get(getUsers);

// Route for adding a new user
router.route("/").post(createUser);

// Route for getting single user by id
router.route("/:userId").get(getSingleUser);

// Route for deleting a user by id and it's thoughts
router.route("/:userId").delete(deleteUser);

// Route for updating a user by id
router.route("/:userId").put(updateUser);

module.exports = router;
