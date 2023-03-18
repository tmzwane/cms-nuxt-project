const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

//API Routes
const items = require(path.join(__dirname, "routes", "api", "items"));
const categories = require(path.join(__dirname, "routes", "api", "categories"));
const locale = require(path.join(__dirname, "routes", "api", "locale"));
const content = require(path.join(__dirname, "routes", "api", "content"));
const media = require(path.join(__dirname, "routes", "api", "media"));

const server = express();

// Body Parsing
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// Connect to MongoDB
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(mongoUrl)
  .then(() => console.log("MongoDB Connected"))
  .catch((errorDetails) =>
    console.error(`Error connecting to MongoDB: ${errorDetails}`)
  );

// API Endpoints
server.use("/api/items", items);
server.use("/api/categories", categories);
server.use("/api/locale", locale);
server.use("/api/content", content);
server.use("/api/media", media);

// Route Not Found
server.use(function (req, res) {
  const error = new Error("Lost location");
  return res.status(404).json({ message: "Route Not found", error });
});

module.exports = server;
