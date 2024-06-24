const mongoose = require("mongoose");

const mongoUrl = process.env.MONGO_URL;
console.log(process.env.MONGO_URL);

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("Error connecting to database");
});

connection.on("connected", () => {
  console.log("Connected to database");
});

module.exports = connection;
