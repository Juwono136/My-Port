import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    stack: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    experience: {
        type: String,
        default: ""
    },
    support: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dz8dtz5ki/image/upload/v1621053362/avatar/btr8lq1dmq0esypqufx2.png"
    },
    id: {
        type: String
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
export default User