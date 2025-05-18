require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const serverless = require("serverless-http");

const authRoutes = require("../routes/employee.routes");
const assetRoutes = require("../routes/asset.routes");

const app = express();

app.use(express.json());
app.use(cors());


app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/assets", assetRoutes);

app.get("/", (req, res) => {
  res.send("API working...");
});


let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/DocBox`);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

  
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running locally on port ${port}`);
  });
}

module.exports.handler = async (event, context) => {
  await connectToDatabase();
  return serverless(app)(event, context);
};
