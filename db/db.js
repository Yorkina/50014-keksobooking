const {MongoClient} = require(`mongodb`);
const logger = require(`../util/logger`);

const DB_URL = process.env.DB_HOST;

module.exports = () => MongoClient.connect(DB_URL)
    .then((client) => client.db(`keksobooking`))
    .catch((err) => {
      logger.error(`Failed connection to mongodb: ${err}`);
      process.exitCode = 1;
    });
