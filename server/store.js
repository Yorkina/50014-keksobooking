const db = require(`../db/db`);
const logger = require(`../util/logger`);

const setupCollection = async () => {
  const dbPromise = db();
  const dBase = await dbPromise;
  return dBase.collection(`offers`);
};

class OffersStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getOfferByDate(date) {
    return (await this.collection).findOne({date});
  }

  async getOffers() {
    return (await this.collection).find().toArray();
  }

  async saveOffer(offerData) {
    return (await this.collection).insertOne(offerData);
  }
}

const createOffersStore = () => new OffersStore(setupCollection()
    .catch((e) => {
      logger.error(`Failed to set up offers-collection: ${e}`);
    }));

module.exports = createOffersStore;
