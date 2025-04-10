const config = require("config");
const express = require("express");
const sequelize = require("./config/db");
const mainRouter = require("./routes/index.route");
const cookieParser = require("cookie-parser");
const errorHandling = require("./middleware/error/error.handling");

const PORT = config.get("port") || 3001;

const raqam = { bir: "1" };
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api", mainRouter);
app.use(function (req, res) {
  res.status(404).json({
    error: "Route not found",
    message: `The requested URL ${req.originalUrl} was not found on this server.`,
  });
});

app.use(errorHandling);

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
