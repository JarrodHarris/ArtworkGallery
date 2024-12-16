const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const artworkRoute = require("./routes/artworks");

const app = express();
const port = process.env.PORT || 5000;

const connectDB = async () => {
  app.use(cors());

  mongoose.set("strictQuery", true);

  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "artworks",
    });
    console.log(`MongoDB connected: ${connect.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  app.use(express.json());
  // app.use(express.static("public"));

  // app.use("/images", express.static(path.join(__dirname, "public/images")));

  //creating a place to store the new images
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../client/public/images");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploaded successfully");
    } catch (error) {
      console.log(error);
    }
  });

  app.use("/api/artworks", artworkRoute);

  app.listen(port, () => {
    console.log(`Backend server stared on: ${port}`);
  });
};

connectDB();
