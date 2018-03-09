const assert = require(`assert`);
const request = require(`supertest`);
const {app} = require(`../src/server.js`);
const generator = require(`../data/generator`);

const TEST_LIMIT = 7;
const TEST_SKIP = 3;

const testData = {
  "title": `Уютное бунгало далеко от моря`,
  "address": `867, 370`,
  "price": `56768`,
  "type": `bungalo`,
  "rooms": `2`,
  "guests": `7`,
  "checkin": `13:00`,
  "checkout": `13:00`,
  "features": `dishwasher`,
  "description": ``,
  "photos": `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  "locationX": `867`,
  "locationY": `370`,
  "name": `Keks`
};

describe(`GET /api/offers`, () => {

  it(`object should have 3 keys (author, offer, location)`, () => {
    return request(app)
        .get(`/api/offers?limit=${TEST_LIMIT}&skip=${TEST_SKIP}`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const offer = response.body[0];
          const isKeysValid = offer[`location`] && offer[`author`] && offer[`offer`];
          assert.ok(isKeysValid);
          assert.equal(response.body.length, TEST_LIMIT - TEST_SKIP);
        });
  });

  it(`object should have 3 keys (author, offer, location)`, () => {
    const testParam = `bla`;
    return request(app)
        .get(`/api/offers?limit=${testParam}&skip=${testParam}`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const offer = response.body[0];
          const isKeysValid = offer[`location`] && offer[`author`] && offer[`offer`];
          assert.ok(isKeysValid);
          assert.equal(response.body.length, 1);
        });
  });

  it(`should return 404 if path is wrong`, () => {
    return request(app)
        .get(`/api/offerstest`)
        .set(`Accept`, `application/json`)
        .expect(404)
        .expect(`Content-type`, /html/);
  });

});

describe(`GET /api/offers/:date`, () => {
  it(`should find offer by date`, async () => {
    let date;
    await request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          date = response.body[0].date;
        });

    return request(app)
        .get(`/api/offers/${date}`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          assert.equal(response.body.date, date);
        });
  });

  it(`should return 404 if offer hasnt date`, async () => {
    const testDate = 233333;
    return request(app)
        .get(`/api/offers/${testDate}`)
        .set(`Accept`, `application/json`)
        .expect(404);
  });
});

describe(`POST /offers`, () => {
  it(`should consume JSON`, () => {
    return request(app).post(`/api/offers`)
        .send(testData)
        .expect(200, testData);
  });

  it(`should return 404 if path is wrong`, () => {
    const data = generator.generateEntity();
    return request(app).post(`/api/offersdsfdsf`)
        .send(data)
        .expect(404)
        .expect(`Content-type`, /html/);
  });

  it(`should consume form-data`, () => {
    return request(app).post(`/api/offers`)
        .field(`title`, testData.title)
        .field(`address`, testData.address)
        .field(`price`, testData.price)
        .field(`type`, testData.type)
        .field(`rooms`, testData.rooms)
        .field(`guests`, testData.guests)
        .field(`checkin`, testData.checkin)
        .field(`checkout`, testData.checkout)
        .field(`features`, testData.features)
        .field(`description`, testData.description)
        .field(`photos`, testData.photos)
        .field(`locationX`, testData.locationX)
        .field(`locationY`, testData.locationY)
        .field(`name`, `Keks`)
        .attach(`avatar`, `test/avatar.png`)
        .attach(`preview`, `test/avatar.png`)
        .expect(200, testData);
  });

});
