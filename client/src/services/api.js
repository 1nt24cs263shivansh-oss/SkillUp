import { MOCK_JOBS } from '../data/mockData'

function calculateJobMatch(job, userSkills = []) {
  if (!userSkills || userSkills.length === 0) {
    return { ...job, matchScore: 0, matchedSkills: [] }
  }
  const normalizedUserSkills = userSkills.map((s) => s.toLowerCase().trim())
  const matchedSkills = job.skills.filter((skill) =>
    normalizedUserSkills.includes(skill.toLowerCase().trim())
  )
  const matchScore = Math.round((matchedSkills.length / job.skills.length) * 100)
  return { ...job, matchScore, matchedSkills }
}

export function apiErrorMessage(error, fallback) {
  return fallback
}

const api = {
  get: async (url, config = {}) => {
    if (url === '/jobs') {
      const studentSkills = config.params?.studentSkills
        ? config.params.studentSkills.split(',').map((s) => s.trim())
        : []

      let jobs = MOCK_JOBS.map((job) => calculateJobMatch(job, studentSkills))

      if (config.params?.search) {
        const query = config.params.search.toLowerCase()
        jobs = jobs.filter(
          (j) =>
            j.title.toLowerCase().includes(query) ||
            j.company.toLowerCase().includes(query) ||
            j.skills.some((s) => s.toLowerCase().includes(query))
        )
      }

      if (config.params?.type) {
        jobs = jobs.filter((j) => j.type === config.params.type)
      }

      return { data: { jobs } }
    }

    if (url.startsWith('/jobs/')) {
      const jobId = url.split('/')[2]
      const job = MOCK_JOBS.find((j) => j._id === jobId)

      if (!job) {
        throw new Error('Opportunity not found')
      }

      const studentSkills = config.params?.studentSkills
        ? config.params.studentSkills.split(',').map((s) => s.trim())
        : []

      return { data: { job: calculateJobMatch(job, studentSkills) } }
    }

    return { data: {} }
  },
  post: async (url, payload) => {
    return { data: { success: true, payload } }
  },
}

export default api