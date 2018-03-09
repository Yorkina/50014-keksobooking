const generator = require(`../data/generator`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const upload = multer({storage: multer.memoryStorage()});
const {Router} = require(`express`);
const router = new Router();

const MAX_REQUEST_LIMIT = 10;
const MIN_REQUEST_SKIP = 0;

let offers = [];

router.use(bodyParser.json());

router.get(``, (req, res) => {
  const limit = Number(req.query.limit);
  const validLimitInteger = (parseInt(limit, 10) === limit && limit > 0) ? limit :
    MAX_REQUEST_LIMIT;

  const skip = Number(req.query.skip);
  const validSkipInteger = (parseInt(skip, 10) === skip && skip > 0) ? skip :
    MIN_REQUEST_SKIP;

  offers = generator.createData(validLimitInteger).slice(validSkipInteger);
  res.send(offers);
});

router.get(`/:date`, (req, res) => {
  const date = parseInt(req.params.date, 10);
  const offer = offers.find((it) => it.date === date);
  if (!offer) {
    res.status(404).end();
  } else {
    res.send(offer);
  }
});

router.post(``, upload.none(), (req, res) => {
  res.send(req.body);
});

module.exports = {
  router
};
