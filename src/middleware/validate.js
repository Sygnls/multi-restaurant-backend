module.exports = (schema, source='body') => (req, res, next) => {
  const { error, value } = schema.validate(req[source]);
  if (error) return res.status(400).json({ error: error.message });
  req[source] = value;
  next();
};
