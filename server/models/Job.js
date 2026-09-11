import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    type: { type: String, enum: ['internship', 'full-time'], required: true },
    duration: { type: String, default: '' },
    description: { type: String, required: true },
    skills: { type: [String], default: [] },
    experienceLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
)

export default mongoose.model('Job', jobSchema)
