const config = require("config");
const jwt = require("jsonwebtoken");
const generateTokens = async (payload, access_key, refresh_key) => {
  const access_token = jwt.sign(payload, access_key, {
    expiresIn: config.get("access_time"),
  });
  const refresh_token = jwt.sign(payload, refresh_key, {
    expiresIn: config.get("refresh_time"),
  });
  return {
    access_token,
    refresh_token,
  };
};

const verifyAccessToken = async (token, access_key) => {
  return jwt.verify(token, access_key);
};

const verifyRefreshToken = (token, refresh_key) => {
  return jwt.verify(token, refresh_key);
};

module.exports = { generateTokens, verifyAccessToken, verifyRefreshToken };
