const request = require(`supertest`);
const generator = require(`../data/generator`);

const mockOffersRouter = require(`../util/offers/mockOffersRouter`);
const app = require(`express`)();
const bodyParser = require(`body-parser`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(`/api/offers`, mockOffersRouter);

const mock = {
  author: {
    name: `Keks`,
  },
  offer: {
    "title": `Уютное бунгало далеко от моря`,
    "address": `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`,
    "price": `56768`,
    "type": `bungalo`,
    "rooms": `2`,
    "guests": `7`,
    "checkin": `13:00`,
    "checkout": `13:00`,
    "features": [`dishwasher`, `conditioner`],
    "description": `bla`,
  },
  location: {
    x: 867,
    y: 545
  },
  date: 1519136255300
};

describe(`POST /offers`, () => {
  it(`should consume JSON`, () => {
    return request(app).post(`/api/offers`)
        .set(`Accept`, `application/json`)
        .send({
          name: mock.author.name,
          title: mock.offer.title,
          address: mock.offer.address,
          description: mock.offer.description,
          price: mock.offer.price,
          type: mock.offer.type,
          rooms: mock.offer.rooms,
          guests: mock.offer.guests,
          checkin: mock.offer.checkin,
          checkout: mock.offer.checkout,
          features: mock.offer.features,
          x: mock.location.x,
          y: mock.location.y,
          date: 1519136255300
        })
        .expect(200, mock);
  });

  it(`should return 404 if path is wrong`, () => {
    const data = generator.generateEntity();
    return request(app).post(`/api/offersdsfdsf`)
        .send(data)
        .expect(404)
        .expect(`Content-type`, /html/);
  });

  it(`should consume form-data`, () => {
    return request(app)
        .post(`/api/offers`)
        .set(`Accept`, `application/json`)
        .field(`name`, mock.author.name)
        .field(`title`, mock.offer.title)
        .field(`address`, mock.offer.address)
        .field(`description`, mock.offer.description)
        .field(`price`, mock.offer.price)
        .field(`type`, mock.offer.type)
        .field(`rooms`, mock.offer.rooms)
        .field(`guests`, mock.offer.guests)
        .field(`checkin`, mock.offer.checkin)
        .field(`checkout`, mock.offer.checkout)
        .field(`features`, mock.offer.features)
        .field(`x`, mock.location.x)
        .field(`y`, mock.location.y)
        .field(`date`, mock.date)
        .expect(200, mock);
  });

  it(`should consume form-data with avatar and preview`, () => {
    return request(app).post(`/api/offers`)
        .field(`name`, mock.author.name)
        .field(`title`, mock.offer.title)
        .field(`address`, mock.offer.address)
        .field(`description`, mock.offer.description)
        .field(`price`, mock.offer.price)
        .field(`type`, mock.offer.type)
        .field(`rooms`, mock.offer.rooms)
        .field(`guests`, mock.offer.guests)
        .field(`checkin`, mock.offer.checkin)
        .field(`checkout`, mock.offer.checkout)
        .field(`features`, mock.offer.features)
        .field(`x`, mock.location.x)
        .field(`y`, mock.location.y)
        .field(`date`, mock.date)
        .attach(`avatar`, `test/avatar.png`)
        .attach(`preview`, `test/avatar.png`)
        .expect(200, {
          ...mock,
          author: {
            ...mock.author,
            avatar: {
              path: `/api/offers/${mock.date}/avatar`,
              mimetype: `image/png`
            }
          },
          ...mock.preview,
          preview: {
            path: `/api/offers/${mock.date}/preview`,
            mimetype: `image/png`
          }
        });
  });

  it(`should fail and show error message`, () => {
    return request(app).post(`/api/offers`)
        .field(`title`, mock.offer.title)
        .field(`type`, `bla`)
        .field(`price`, mock.offer.price)
        .field(`address`, mock.offer.address)
        .field(`rooms`, mock.offer.rooms)
        .field(`checkin`, mock.offer.checkin)
        .attach(`avatar`, `test/avatar.png`)
        .attach(`preview`, `test/avatar.png`)
        .expect(400);
  });
});
