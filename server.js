import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";

dotenv.config();
const PORT = process.env.PORT || 8080;

//Databse Config
connectDB();

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Rehan Shah</h1>");
});

app.listen(PORT, () => {
  console.log(
    `Server Listning on port ${PORT} currently on ${process.env.DEV_MODE}`
      .bgCyan.white
  );
});
