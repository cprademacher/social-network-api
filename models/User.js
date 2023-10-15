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
    get: (timestamp) => dateFormat(timestamp),
  },
});

// Define a new schema named `thoughtSchema` for the subdocument
const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  username: { type: String, required: true },
  reactions: [reactionSchema],
});

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
  friends: [
    {
      type: mongoose.Schema.type.ObjectId,
      ref: "User",
    },
  ],
});

// Create models from schema
const User = mongoose.model("User", userSchema);
const Thought = mongoose.model("Thought", thoughtSchema);
const Reaction = mongoose.model("Reaction", reactionSchema);

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
    thoughtText: "This is my thought!",
    username: "Cody",
    reactions: [
      {
        reactionBody: "Cool thought!",
        username: "Megan",
      },
      {
        reactionBody: "I agree!",
        username: "Cody",
      },
    ],
  },
  {
    thoughtText: "This is a way better thought!",
    username: "Megan",
    reactions: [
      {
        reactionBody: "Interesting!",
        username: "Cody",
      },
      {
        reactionBody: "Whoa!",
        username: "Lane",
      },
    ],
  },
  {
    thoughtText: "This is the best thought ever!",
    username: "Lane",
    reactions: [
      {
        reactionBody: "So cool!",
        username: "Cody",
      },
      {
        reactionBody: "Agreed!",
        username: "Megan",
      },
    ],
  },
];


async function seedDatabase() {
  try {
    // Clear existing data (optional)
    await User.deleteMany({});
    await Thought.deleteMany({});
    await Reaction.deleteMany({});

    // Create users, thoughts, and reactions
    User.create({
        username: "Cody",
        email: "cprademacher36@gmail.com",
        thoughts: [thoughtData],
      })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      
      User.create({
        username: "Megan",
        email: "megrad77@gmail.com",
        thoughts: [thoughtData],
      })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      
      User.create({
        username: "Lane",
        email: "laneparr@gmail.com",
        thoughts: [thoughtData],
      })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

    const createdThoughts = await Thought.insertMany(thoughtData);

    console.log("Sample data created successfully");
  } catch (error) {
    console.error("Error creating sample data:", error);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
}

seedDatabase();

module.exports = { User, Thought, Reaction };
