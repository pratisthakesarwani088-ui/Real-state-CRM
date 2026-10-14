const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected "))
  .catch((err) => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// routes
const leadRoutes = require("./routes/leadRoutes");
app.use("/api/leads", leadRoutes);

// server start
app.listen(5001, () => {
  console.log("Server running on port 5001");
});