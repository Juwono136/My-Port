import express from 'express';
import { auth } from '../middleware/auth.js';
import { createPortfolio, deletePortfolio, getPortfolios, updatePortfolio } from '../controllers/portfolio.js';

const router = express.Router()

router.get("/", getPortfolios)

router.post("/add", auth, createPortfolio)

router.delete("/delete/:id", auth, deletePortfolio)

router.put("/update/:id", auth, updatePortfolio)

export default router