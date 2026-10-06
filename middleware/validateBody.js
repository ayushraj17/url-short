export const validateBody = (schema) => {
  return (req, res, next) => {
    const validation = schema.safeParse(req.body)
    if (!validation.success) {
      return res.status(400).json(validation.error.format())
    }
    req.body = validation.data
    next()
  }
}