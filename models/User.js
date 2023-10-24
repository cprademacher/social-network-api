// Require schema and model from mongoose
const { Schema, model } = require("mongoose");
const Thought = require("./Thought");

// Construct a new instance of the schema class
const userSchema = new Schema(
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
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
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
const User = model("User", userSchema);

module.exports = User;
