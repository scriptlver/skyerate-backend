function roleMiddleware(user, role) {

  if (!user) {
    throw new Error("Não autenticado");
  }

  if (user.role !== role) {
    throw new Error("Acesso negado");
  }

}

module.exports = roleMiddleware;