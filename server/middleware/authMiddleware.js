import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || ''
    if (!header.startsWith('Bearer ')) return res.status(401).json({ message: 'Authentication required.' })
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET || 'skillup-dev-secret')
    req.user = await User.findById(payload.id).select('-password')
    if (!req.user) return res.status(401).json({ message: 'Your session is no longer valid.' })
    next()
  } catch {
    res.status(401).json({ message: 'Authentication required.' })
  }
}

export function roleCheck(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) return res.status(403).json({ message: 'You do not have access to this area.' })
    next()
  }
}
