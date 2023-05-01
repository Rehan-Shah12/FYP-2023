import express from "express";
import { getExternalProducts } from "../controllers/scraperController.js";

const router = express.Router();

router.get("/search", getExternalProducts);

export default router;
