const { constants } = require("../utils/constants");

const errorHandler = (err, req, res, next, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.status(400);
      throw new Error("Validation error");
    case constants.SERVER_ERROR:
      res.status(500);
      throw new Error("Server error");
    case constants.UNAUTHORIZED:
      res.status(401);
      throw new Error("Unauthorized");
    case constants.FORBIDDEN:
      res.status(403);
      throw new Error("Forbidden");
    case constants.NOT_FOUND:
      res.status(404);
      throw new Error("Not found");
    default:
      console.log("All good, No errors!");
      break;
  }
};
module.exports = errorHandler;
