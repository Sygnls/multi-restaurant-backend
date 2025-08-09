function errorHandler(err, _req, res, _next) {
  const code = err.status || 500;
  res.status(code).json({
    error: err.publicMessage || 'Internal Server Error',
    code
  });
}
module.exports = { errorHandler };
