import Job from '../models/Job.js'
import { addJobMatch, normalizeSkills } from '../utils.js'

export async function getJobs(req, res, next) {
  try {
    const { search, type, location, skills, experienceLevel, studentSkills } = req.query
    const query = {}
    if (type) query.type = type.toLowerCase()
    if (experienceLevel) query.experienceLevel = experienceLevel.toLowerCase()
    if (location) query.location = { $regex: location.trim(), $options: 'i' }
    if (skills) query.skills = { $regex: skills.trim(), $options: 'i' }
    if (search) {
      const term = { $regex: search.trim(), $options: 'i' }
      query.$or = [{ title: term }, { company: term }, { location: term }, { skills: term }]
    }
    const jobs = await Job.find(query).sort({ createdAt: -1 })
    res.json({ jobs: jobs.map((job) => addJobMatch(job, normalizeSkills(studentSkills))) })
  } catch (error) {
    next(error)
  }
}

export async function getJob(req, res, next) {
  try {
    const job = await Job.findById(req.params.id)
    if (!job) return res.status(404).json({ message: 'Opportunity not found.' })
    res.json({ job: addJobMatch(job, normalizeSkills(req.query.studentSkills)) })
  } catch (error) {
    if (error.name === 'CastError') return res.status(404).json({ message: 'Opportunity not found.' })
    next(error)
  }
}
