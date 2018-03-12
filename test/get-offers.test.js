const assert = require(`assert`);
const request = require(`supertest`);
const mockOffersRouter = require(`../util/offers/mockOffersRouter`);
const app = require(`express`)();

app.use(`/api/offers`, mockOffersRouter);

const TEST_LIMIT = 7;
const TEST_SKIP = 3;

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
