// Require schema and model from mongoose
const { Schema, model } = require("mongoose");

// Construct a new instance of the schema class
const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Create models from schema
const User = model("user", userSchema);

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

const newThought = new Thought({
  thoughtText: "This is a thought",
  user: "652dbb93c00a8fe0668c3da2",
});

newThought.save();

// Create users, thoughts, and reactions
User.create({
  username: "Cody",
  email: "cprademacher36@gmail.com",
  //   thoughts: thoughtData,
})
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

User.create({
  username: "Megan",
  email: "megrad77@gmail.com",
  //   thoughts: thoughtData,
})
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

User.create({
  username: "Lane",
  email: "laneparr@gmail.com",
  thoughts: newThought,
  //   thoughts: thoughtData,
})
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

module.exports = User;
