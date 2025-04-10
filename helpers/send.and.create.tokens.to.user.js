const config = require("config");
const jwtService = require("../services/jwt.service");

module.exports = async (res, user, access_key, refresh_key) => {
  const payload = {
    id: user.id,
    email: user.email,
    is_creator: user.is_creator ?? null,
  };
  const { access_token, refresh_token } = await jwtService.generateTokens(
    payload,
    access_key,
    refresh_key
  );
  user.refresh_token = refresh_token;
  await user.save();

  res.cookie("refreshToken", refresh_token, {
    httpOnly: true,
    maxAge: config.get("refresh_cookie_time"),
  });

  return res.send({
    message: "Welcome to the system",
    accessToken: access_token,
  });
};
