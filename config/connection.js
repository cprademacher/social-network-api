const mongoose = require('mongoose');

// Wrap mongoose around local connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/socialDB');

// Export connection
module.exports = mongoose.connection;