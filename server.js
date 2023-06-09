import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import scraperRoutes from "./routes/scraperRoute.js";
import wishlistRoutes from "./routes/wishlistRoute.js";
import scraper from "./scraper.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
dotenv.config();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Databse Config
connectDB();

//middlewares
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "./client/build")));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/scraper", scraperRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/scraper", scraper);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(
    `Server Listning on port ${PORT} currently on ${process.env.DEV_MODE}`
      .bgCyan.white
  );
});
