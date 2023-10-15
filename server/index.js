import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import skillRoutes from './routes/skills.js';
import portfolioRoutes from './routes/portfolio.js';
import cookieParser from 'cookie-parser';

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use(cookieParser())

app.use("/api/user", userRoutes)
app.use("/api/skill", skillRoutes)
app.use("/api/portfolio", portfolioRoutes)

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT

mongoose.set("strictQuery", true)

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))