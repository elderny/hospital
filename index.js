const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  compression = require("compression")(),
  cookieParser = require("cookie-parser")(),
  morgan = require("morgan")("dev"),
  dotenv = require("dotenv").config(),
  mongoose = require("mongoose"),
  corsConfig = require("./routes/cors-config"),
  cors = require("cors")(),
  PORT = process.env.PORT || 3000,
  dbConfig = require("./routes/db-config");

app.use(
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  compression,
  cookieParser,
  cors
);

app.use("/api", require("./controllers"));
app.use(express.static("build"));
app.use("*", express.static("build"));
app.use("/prescription", express.static("uploads"));

mongoose.connect(dbConfig);
const server = app.listen(PORT);

process.on("SIGINT", () => {
  server.close(() => {
    mongoose.disconnect(() => {
      process.exit(0);
    });
  });
});

process.on("SIGTERM", () => {
  server.close(() => {
    mongoose.disconnect(() => {
      process.exit(0);
    });
  });
});
