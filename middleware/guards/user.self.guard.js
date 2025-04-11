const errorHandler = require("../../helpers/error.handler");

module.exports = function (roleKeys = []) {
  return function (req, res, next) {
    try {
      const id = +req.params.id;
      for (const roleKey of roleKeys) {
        const user = req[roleKey];
        if (user && (+user.id === id || user?.is_creator !== null)) {
          return next();
        }
      }

      return res.status(403).send({
        message: "Faqat shaxsiy ma'lumotlarni bilan ishlashga ruxsat etiladi.",
      });
    } catch (error) {
      errorHandler(error, res);
    }
  };
};
