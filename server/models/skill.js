import mongoose from 'mongoose';

const skillSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    skill_name: {
        type: String,
        required: true,
        default: ""
    },
    level: {
        type: String,
        required: true,
        default: ""
    }
}, {
    timestamps: true
})

const Skill = mongoose.model('Skill', skillSchema)
export default Skill