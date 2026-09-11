import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import Job from '../models/Job.js'
import User from '../models/User.js'
import { jobs } from '../data/jobs.js'

const users = [
  { name: 'Aarav Mehta', email: 'student@skillup.dev', password: 'Demo@123', role: 'student', skills: ['React', 'JavaScript', 'MongoDB'] },
  { name: 'Nisha Iyer', email: 'mentor@skillup.dev', password: 'Demo@123', role: 'mentor' },
  { name: 'Kabir Shah', email: 'recruiter@skillup.dev', password: 'Demo@123', role: 'recruiter' },
]

try {
  await connectDB()
  await Job.deleteMany({})
  await Job.insertMany(jobs)
  await User.deleteMany({ email: { $in: users.map((user) => user.email) } })
  await User.create(users)
  console.log(`Seeded ${jobs.length} opportunities and ${users.length} demo users.`)
} catch (error) {
  console.error('Seed failed:', error.message)
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}
