export function notFound(req, res) {
  res.status(404).json({ message: 'The requested resource was not found.' })
}

export function errorHandler(err, req, res, next) {
  console.error(err)
  if (res.headersSent) return next(err)
  res.status(err.status || 500).json({ message: err.message || 'Something went wrong on the server.' })
}
