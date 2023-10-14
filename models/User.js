// Require schema and model from mongoose
const mongoose = require("mongoose");

// Define a new schema named 'reactionSchema' for the subdocument
const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define a new schema named `thoughtSchema` for the subdocument
const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
  reactions: [reactionSchema],
});

// Define a new schema named `friendSchema` for the subdocument
const friendSchema = new mongoose.Schema({});

// Construct a new instance of the schema class
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
  },
  thoughts: [thoughtSchema],
  friends: [friendSchema],
});

const reactionData = [
  {
    reactionBody: "This is awesome!",
    username: "Cody",
  },
  {
    reactionBody: "This is not as awesome!",
    username: "Cody",
  },
];

const thoughtData = [
  {
    thoughtText: "This is the first thought.",
    username: "Cody",
    reactions: [reactionSchema],
  },
  {
    thoughtText: "This is the second thought",
    username: "Cody",
    reactions: [reactionSchema],
  },
];

const User = mongoose.model("User", userSchema);

User.create({
  username: "Cody",
  email: "cprademacher36@gmail.com",
})
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

User.create({
  username: "Megan",
  email: "megrad77@gmail.com",
})
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

User.create({
  username: "Lane",
  email: "laneparr@gmail.com",
})
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

module.exports = User;
