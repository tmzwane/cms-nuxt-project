import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

// Load config
import { mongoURI } from "./utils/config.js";

// API Routes
import items from "./routes/api/items.js";
import categories from "./routes/api/categories.js";

const server = express();

server.use(cors());
server.use(morgan("dev"));

// Body Parsing
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// Connect to MongoDB
const dbConfig = {
  autoIndex: false,
  useNewUrlParser: true,
};

mongoose
  .connect(mongoURI, dbConfig)
  .then(() => console.log("MongoDB Connected"))
  .catch((errorDetails) =>
    console.error(`Error connecting to MongoDB: ${errorDetails}`)
  );

// API Endpoints
server.use("/api/items", items);
server.use("/api/categories", categories);

// Route Not Found
server.use(function (req, res) {
  const error = new Error("Lost location");
  return res
    .status(404)
    .json({ success: false, message: "Route Not found", error });
});

export default server;
