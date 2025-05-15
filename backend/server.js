require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/employee.routes");
const assetRoutes = require("./routes/asset.routes");

const app = express();
app.use(express.json());
app.use(cors())
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true, // Required for cookies
//   methods: ["GET", "POST", "PUT", "DELETE"],
// }));
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/assets", assetRoutes);

app.get("/", (req,res)=>{
  res.send("API working")
})

mongoose
  .connect(`${process.env.MONGO_URL}/DocBox`)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
