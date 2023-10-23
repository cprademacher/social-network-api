const { connect, connection } = require("mongoose");

// Wrap mongoose around local connection to MongoDB
connect("mongodb://127.0.0.1:27017/socialDB");

// Export connection
module.exports = connection;
