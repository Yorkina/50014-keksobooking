const generator = require(`../data/generator`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const upload = multer({storage: multer.memoryStorage()});
const {Router} = require(`express`);
const router = new Router();
const {validateSchema} = require(`../util/validator`);
const offersValidation = require(`../util/validation`);
const ValidationError = require(`../util/error`);

const MAX_REQUEST_LIMIT = 1;
const MIN_REQUEST_SKIP = 0;
const DEFAULT_NAMES = [`Keks`, `Pavel`, `Nikolay`, `Alex`, `Ulyana`, `Anastasyia`, `Julia`];

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

const images = upload.fields([{name: `avatar`, maxCount: 1}, {name: `preview`, maxCount: 1}]);
router.post(``, images, (req, res) => {
  const data = req.body;
  console.log(`@@@@@@@@@@@@`, req.body);
  data.name = data.name || DEFAULT_NAMES[Math.floor(Math.random() * DEFAULT_NAMES.length)];
  let errors;

  if (req.get(`Accept`) && req.get(`Accept`).includes(`application/json`)) {
    errors = validateSchema(data, offersValidation);
  } else {
    const dataForValidation = Object.assign({}, req.body);
    dataForValidation.avatar = req.files[`avatar`][0];
    dataForValidation.preview = req.files[`preview`][0];
    errors = validateSchema(dataForValidation, offersValidation);
  }

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  res.send(data);
});

router.use((exception, req, res, next) => {
  let data = exception;
  console.log(`@@@@@@@@`, data);
  if (exception instanceof ValidationError) {
    data = exception.errors;
  }
  res.status(400).send(data);
  next();
});

module.exports = {
  router
};
