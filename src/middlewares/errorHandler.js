const errorHandler  =(err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || "Erro interno no servidor";

  res.status(status).json({ error: message });
};

module.exports = errorHandler;