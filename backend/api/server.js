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
// أو إعداد مخصص:
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/assets", assetRoutes);

app.get("/", (req, res) => {
  res.send("API working...");
});

// الاتصال بقاعدة البيانات
mongoose
  .connect(`${process.env.MONGO_URL}/DocBox`)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// تشغيل محلي فقط إذا لم يكن يعمل على Vercel
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running locally on port ${port}`);
  });
}

// التصدير لـ Vercel
module.exports = serverless(app);
