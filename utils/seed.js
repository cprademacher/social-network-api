const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  const users = [
    {
      username: "Cody",
      email: "cprademacher36@gmail.com",
    },
    {
      username: "Megan",
      email: "megrad77@gmail.com",
    },
    {
      username: "Lane",
      email: "laneparr@gmail.com",
    },
    {
      username: "Wednesday",
      email: "wednesdayaddams@gmail.com",
    },
    {
      username: "Owen",
      email: "owenriazzi@gmail.com",
    },
  ];

  const thoughts = [
    {
      thoughtText: "This is my thought!",
      username: "Cody",
    },
    {
      thoughtText: "This is a way better thought!",
      username: "Megan",
    },
    {
      thoughtText: "This is the best thought ever!",
      username: "Lane",
    },
    {
      thoughtText: "Joseph Crackstone is the worst.",
      username: "Wednesday",
    },
    {
      thoughtText: "What a great day!",
      username: "Owen",
    },
    {
      thoughtText: "The beach is the best place to be!",
      username: "Megan",
    },
  ];

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});

// User data was seeded as well as thought data, but thoughts were not connected to the users
