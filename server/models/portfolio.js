import mongoose from "mongoose";

const portfolioSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    project_title: {
        type: String,
        required: true,
        default: ""
    },
    project_desc: {
        type: String,
        required: true,
        default: ""
    },
    project_link: {
        type: String,
        required: true,
        default: ""
    },
    tags: {
        type: [String],
        required: true,
        default: []
    },
    project_image: {
        type: String,
        default: "https://res.cloudinary.com/dz8dtz5ki/image/upload/v1694969104/avatar/undraw_Image_upload_ntjfff.png"
    }
}, {
    timestamps: true
})

const Portfolio = mongoose.model('Portfolio', portfolioSchema)
export default Portfolio