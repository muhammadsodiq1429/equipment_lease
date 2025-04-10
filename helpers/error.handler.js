const logger = require("../services/logger.service");

module.exports = (error, res) => {
  console.log(error);
  logger.error(error);
  return res.status(400).send({ error: error.message });
};
