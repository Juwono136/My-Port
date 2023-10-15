import User from '../models/user.js';

export const authAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user.id })

        if (user) return res.status(500).json({ message: "Admin resources access denied." })

        next()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}