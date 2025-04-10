const ApiError = require("../../helpers/api.error");

module.exports = function (req, res, next) {
  if (+req.admin.id === +req.params.id || req.admin.is_creator === true) {
    return next();
  }
  throw ApiError.forbidden("Ruxsat etilmagan foydalanuvchi");
};
