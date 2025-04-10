const jwtService = require("../../services/jwt.service");
const errorHandler = require("../../helpers/error.handler");
const config = require("config");
const client_access_key = config.get("client.access_key");
const admin_access_key = config.get("admin.access_key");
const owner_access_key = config.get("owner.access_key");
module.exports = function (access_keys = []) {
  return async function (req, res, next) {
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        return res
          .status(403)
          .send({ message: "authorization token berilmagan" });
      }
      const bearer = authorization.split(" ")[0];
      const token = authorization.split(" ")[1];
      if (bearer != "Bearer") {
        return res
          .status(403)
          .send({ messaga: "Bearer yoki token berilmagan" });
      }

      let verified = false;

      for (let access_key of access_keys) {
        try {
          const decoded = await jwtService.verifyAccessToken(token, access_key);
          let keyName = "";
          if (access_key === client_access_key) keyName = "client";
          else if (access_key === admin_access_key) keyName = "admin";
          else if (access_key === owner_access_key) keyName = "owner";

          req[keyName] = decoded;
          verified = true;
          break;
        } catch (err) {
          if (err.message === "invalid signature") continue;
          return errorHandler(err, res);
        }
      }

      if (!verified) {
        return res.status(403).send({ message: "Access denied" });
      }

      next();
    } catch (error) {
      errorHandler(error, res);
    }
  };
};
