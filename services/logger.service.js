require("winston");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, json } = format;
const moment = require("moment-timezone");

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    label({ label: "myApp" }),
    timestamp({
      format: () => moment().tz("Asia/Tashkent").format("YYYY-MM-DD HH:mm:ss"),
    }),
    myFormat
    // json()
  ),
  transports: [
    new transports.Console({ level: "debug" }),
    new transports.File({
      filename: "log/error.log",
      level: "error",
      handleExceptions: true,
    }),
    new transports.Console({
      level: "error",
      handleExceptions: true,
    }),
    new transports.File({ filename: "log/combine.log", level: "info" }),
  ],
});

logger.exitOnError = false;
logger.exceptions.handle(
  new transports.File({ filename: "log/exceptions.log" })
);
logger.rejections.handle(
  new transports.File({ filename: "log/rejections.log" })
);

module.exports = logger;
