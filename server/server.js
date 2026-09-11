import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import authRoutes from './routes/authRoutes.js'
import jobRoutes from './routes/jobRoutes.js'

const app = express()
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.get('/', (req, res) => res.json({ name: 'SkillUp API', status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/jobs', jobRoutes)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`API listening on http://localhost:${port}`))