import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { sendMail } from './sendMail.js';

const { CLIENT_URL } = process.env

export const signUp = async (req, res) => {
    try {
        const { email, password, firstName, lastName, confirmPassword } = req.body;

        if (!lastName || !firstName || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "Please fill in all fields." })
        }

        if (!isMatch(password, confirmPassword)) return res.status(400).json({ message: "Password don't match." })

        if (!validateEmail(email)) return res.status(400).json({ message: "Invalid emails." })

        const user = await User.findOne({ email })

        if (user) return res.status(400).json({ message: "This email already exists." })

        if (isLength(password)) return res.status(400).json({ message: "Password must be al least 8 characters." })

        const passwordHash = await bycrypt.hash(password, 12)

        const newUser = {
            name: `${firstName} ${lastName}`,
            email,
            password: passwordHash,
        }

        const activation_token = createActivationToken(newUser)

        const url = `${CLIENT_URL}/user/activate/${activation_token}`
        sendMail(email, url, "Verify your email address")

        res.json({ message: "Register Success! Please activate your email to start." })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const activateEmail = async (req, res) => {
    try {
        const { activation_token } = req.body;
        const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

        const { name, email, password } = user

        const check = await User.findOne({ email })
        if (check) return res.status(400).json({ message: "This email already exists." })

        const newUser = new User({
            name,
            email,
            password
        })

        await newUser.save()

        res.json({ message: "Account has been activated!" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!email || !password) return res.status(400).json({ message: "Please fill in all fields." })

        if (!user) return res.status(400).json({ message: "Invalid Credentials." })

        const isMatch = await bycrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials." })

        const refresh_token = createRefreshToken({ id: user._id })
        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: 'api/user/refresh_token',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        // console.log(refresh_token)
        res.json({
            email: user.email,
            message: "Login success!",
            isLoggedOut: false
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAccessToken = (req, res) => {
    try {
        const rf_token = req.cookies.refreshtoken

        if (!rf_token) return res.status(400).json({ message: "Please login now!" })

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ message: "Please login now!" })

            const access_token = createAccessToken({ id: user.id })
            res.json({ access_token })
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })

        // if (!email) return res.status(400).json({ message: "Please fill your email." })
        if (!validateEmail(email)) return res.status(400).json({ message: "Invalid emails." })

        if (!user) return res.status(400).json({ message: "This email doesn't exist." })

        const access_token = createAccessToken({ id: user._id })
        const url = `${CLIENT_URL}/user/reset/${access_token}`

        sendMail(email, url, "Reset your password")
        res.json({ message: "Please check your email for reset" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { password, confirm_password } = req.body

        if (isLength(password)) return res.status(400).json({ message: "Password must be at least 8 characters" })

        if (!isMatch(password, confirm_password)) return res.status(400).json({ message: "Password did not match." })

        const passwordHash = await bycrypt.hash(password, 12)

        // console.log(req.user);

        await User.findOneAndUpdate({ _id: req.user.id }, {
            password: passwordHash
        })

        res.json({ message: "Password successfully changed. Please login." })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const getUserInfor = async (req, res) => {
    try {
        const user = await User.findOne(req.user)
        res.json({
            name: user.name,
            avatar: user.avatar,
            stack: user.stack,
            description: user.description,
            experience: user.experience,
            support: user.support
        })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { name, avatar, stack, description, experience, support, password, confirm_password } = req.body

        if (password && password !== confirm_password) return res.status(400).json({ message: "Password did not match." });

        if (password && password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters." });

        if (name && name.length > 20) return res.status(400).json({ message: "Name cannot exceed 20 characters." });

        if (name === "") return res.status(400).json({ message: "Name cannot be empty." });

        const updates = {
            name,
            avatar,
            stack,
            description,
            experience,
            support
        }

        if (password) {
            const passwordHash = await bycrypt.hash(password, 12);
            updates.password = passwordHash;
        }

        await User.findOneAndUpdate({ _id: req.user.id }, updates)
        res.json({ message: "User Updated." })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('refreshToken', { path: '/user/refresh_token' })
        return res.json({ message: "Logged out.", isLoggedOut: true })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function isLength(password) {
    if (password.length < 8) return true
    return false
}

function isMatch(password, confirm_password) {
    if (password === confirm_password) return true
    return false
}

function createRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

function createAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3m' })
}

function createActivationToken(payload) {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
}