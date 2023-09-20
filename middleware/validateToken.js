const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    let token;
    let authHeaders = req.headers.Authorization || req.headers.authorization;
    if (authHeaders && authHeaders.startsWith("Bearer")) {
      token = authHeaders.split(" ")[1];

      jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error("User is not authorized");
        }
        req.user = decoded.user;
        next();
      });
      if (!token) {
        res.status(401);
        throw new Error("User is not authorized or token is missing");
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = validateToken;
