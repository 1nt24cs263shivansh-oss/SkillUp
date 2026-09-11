import jwt from 'jsonwebtoken'

export function makeToken(user) {
  return jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET || 'skillup-dev-secret', { expiresIn: '7d' })
}

export function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role, skills: user.skills || [] }
}

export function normalizeSkills(value) {
  const values = Array.isArray(value) ? value : typeof value === 'string' ? value.split(',') : []
  return [...new Set(values.map((skill) => String(skill).trim()).filter(Boolean))].slice(0, 20)
}

function normalizedText(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9+#. ]/g, ' ').replace(/\s+/g, ' ').trim()
}

function skillMatches(studentSkill, companySkill) {
  const student = normalizedText(studentSkill)
  const company = normalizedText(companySkill)
  return Boolean(student && company && (student === company || student.includes(company) || company.includes(student)))
}

export function addJobMatch(job, studentSkills) {
  const plainJob = typeof job.toObject === 'function' ? job.toObject() : job
  const skills = normalizeSkills(studentSkills)
  if (!skills.length) return plainJob

  const description = normalizedText(plainJob.description)
  const matchedSkills = skills.filter((studentSkill) => {
    const requiredSkillMatch = plainJob.skills.some((companySkill) => skillMatches(studentSkill, companySkill))
    const descriptionMatch = description.includes(normalizedText(studentSkill))
    return requiredSkillMatch || descriptionMatch
  })

  return {
    ...plainJob,
    matchScore: Math.round((matchedSkills.length / skills.length) * 100),
    matchedSkills,
  }
}
