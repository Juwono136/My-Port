import express from 'express'
import { activateEmail, forgotPassword, getAccessToken, getUserInfor, logout, resetPassword, signIn, signUp, updateUser } from '../controllers/users.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.post("/signup", signUp)
router.post('/activation', activateEmail)
router.post("/signin", signIn)
router.post("/refresh_token", getAccessToken)
router.post('/forgot', forgotPassword)
router.post('/reset', auth, resetPassword)

router.get("/logout", logout)
router.get("/infor", getUserInfor)

router.patch("/update", auth, updateUser)

export default router;