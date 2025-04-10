const ApiError = require("../../helpers/api.error");

module.exports = function (req, res, next) {
  if (req.admin.is_creator !== true) {
    throw ApiError.forbidden("Ruxsat etilmagan foydalanuvchi");
  }
  next();
};
