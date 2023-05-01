import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import scraperRoutes from "./routes/scraperRoute.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 8080;

//Databse Config
connectDB();

//middlewares
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/scraper", scraperRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Rehan Shah</h1>");
});

app.listen(PORT, () => {
  console.log(
    `Server Listning on port ${PORT} currently on ${process.env.DEV_MODE}`
      .bgCyan.white
  );
});
