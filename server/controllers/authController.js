import User from '../models/User.js'
import { makeToken, normalizeSkills, publicUser } from '../utils.js'

const validRoles = ['student', 'mentor', 'recruiter']

export async function register(req, res, next) {
  try {
    const { name, email, password, confirmPassword, role, skills } = req.body
    if (!name || !email || !password || !confirmPassword || !role) return res.status(400).json({ message: 'Please complete every field.' })
    if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match.' })
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' })
    if (!validRoles.includes(role)) return res.status(400).json({ message: 'Please choose a valid role.' })
    const normalizedEmail = email.trim().toLowerCase()
    if (await User.exists({ email: normalizedEmail })) return res.status(409).json({ message: 'An account with this email already exists.' })
    const user = await User.create({ name: name.trim(), email: normalizedEmail, password, role, skills: normalizeSkills(skills) })
    res.status(201).json({ token: makeToken(user), user: publicUser(user) })
  } catch (error) {
    next(error)
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' })
    const user = await User.findOne({ email: email.trim().toLowerCase() })
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Email or password is incorrect.' })
    res.json({ token: makeToken(user), user: publicUser(user) })
  } catch (error) {
    next(error)
  }
}

export function currentUser(req, res) {
  res.json({ user: publicUser(req.user) })
}

export async function updateProfile(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { skills: normalizeSkills(req.body.skills) }, { new: true, runValidators: true }).select('-password')
    res.json({ user: publicUser(user) })
  } catch (error) {
    next(error)
  }
}
