const {MongoClient} = require(`mongodb`);
const logger = require(`../util/logger`);
require(`dotenv`).config();

const DB_URL = process.env.DB_HOST || `mongodb://localhost:27017`;

module.exports = () => MongoClient.connect(DB_URL)
    .then((client) => client.db(`keksobooking`))
    .catch((err) => {
      logger.error(`Failed connection to mongodb: ${err}`);
      process.exitCode = 1;
    });
