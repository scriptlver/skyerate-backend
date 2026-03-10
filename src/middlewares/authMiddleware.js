const jwt = require("jsonwebtoken");

function authMiddleware(authHeader) {

  if (!authHeader) {
    return null;
  }

  try {

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;

  } catch (error) {

    return null;

  }
}

module.exports = authMiddleware;