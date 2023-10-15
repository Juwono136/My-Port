import express from 'express';
import { auth } from '../middleware/auth.js';
import { createSkill, deleteSkill, getSkills, updateSkill } from '../controllers/skills.js';

const router = express.Router()

router.get("/", getSkills)

router.post("/add", auth, createSkill)

router.delete("/delete/:id", auth, deleteSkill)

router.put("/update/:id", auth, updateSkill)

export default router