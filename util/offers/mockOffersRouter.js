const createOffersRouter = require(`../../server/router`);
const generator = require(`../../data/generator`);

const offers = [...new Array(10)]
    .map(() => generator.generateEntity());

class Cursor {
  constructor(data) {
    this.data = data;
  }

  skip(count) {
    return new Cursor(this.data.slice(count));
  }

  limit(count) {
    return new Cursor(this.data.slice(0, count));
  }

  async count() {
    return this.data.length;
  }

  async toArray() {
    return this.data;
  }
}

class MockOffersStore {
  constructor() {
  }

  async getOfferByDate(date) {
    return offers.find((it) => it.date === date);
  }

  async getOffers() {
    return new Cursor(offers).toArray();
  }

  async saveOffer() {
  }

}

class MockImageStore {

  async getBucket() {
  }

  async get() {
  }

  async save() {
  }

}

module.exports = createOffersRouter(new MockOffersStore(), new MockImageStore());
