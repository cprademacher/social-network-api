const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
} = require('../../controllers/userController');

// Route for getting all users and creating a user is /api/users
router.route('/').get(getUsers).post(createUser);

// Route for getting single user by id
router.route('/:id').get(getSingleUser);

module.exports = router;