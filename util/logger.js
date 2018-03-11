const winston = require(`winston`);
const path = require(`path`);

const errors = path.resolve(process.cwd(), `errors.log`);
const combined = path.resolve(process.cwd(), `combined.log`);

const logger = winston.createLogger({
  level: `silly`,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({filename: errors, level: `error`}),
    new winston.transports.File({filename: combined})
  ]
});


if (process.env.NODE_ENV !== `production`) {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
