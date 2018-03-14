const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const upload = multer({storage: multer.memoryStorage()});
const {Router} = require(`express`);
const router = new Router();
const {validateSchema} = require(`../util/validator`);
const offersValidation = require(`../util/validation`);
const ValidationError = require(`../util/error`);
const bufferToStream = require(`../util/buffer-to-stream`);
const restruct = require(`../util/restruct`);
const logger = require(`../util/logger`);


const MAX_REQUEST_LIMIT = 10;
const MIN_REQUEST_SKIP = 0;
const DEFAULT_NAMES = [`Keks`, `Pavel`, `Nikolay`, `Alex`, `Ulyana`, `Anastasyia`, `Julia`];

let offers = [];

const async = (fn) => (req, res, next) => fn(req, res, next).catch(next);

router.use(bodyParser.json());
router.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

router.get(``, async(async (req, res) => {
  const limit = Number(req.query.limit);
  const validLimitInteger = (parseInt(limit, 10) === limit && limit > 0) ? limit :
    MAX_REQUEST_LIMIT;

  const skip = Number(req.query.skip);
  const validSkipInteger = (parseInt(skip, 10) === skip && skip > 0) ? skip :
    MIN_REQUEST_SKIP;

  offers = await router.offersStore.getOffers();
  const offersToSend = offers.slice(0, validLimitInteger).slice(validSkipInteger);
  res.send(offersToSend);
}));

router.get(`/:date`, async(async (req, res) => {
  const date = parseInt(req.params.date, 10);
  const offer = await router.offersStore.getOfferByDate(date);
  if (!offer) {
    res.status(404).end();
  } else {
    res.send(offer);
  }
}));

router.get(`/:date/avatar`, async(async (req, res) => {
  const date = parseInt(req.params.date, 10);
  const offer = await router.offersStore.getOfferByDate(date);
  if (!offer) {
    res.status(404).end();
  }

  const avatar = offer.author.avatar;
  if (!avatar) {
    res.status(404).end();
  }

  const {info, stream} = await router.imageStore.get(avatar.path);

  if (!info) {
    res.status(404).end();
  }

  res.set(`content-type`, avatar.mimetype);
  res.status(200);
  stream.pipe(res);
}));

const images = upload.fields([{name: `avatar`, maxCount: 1}, {name: `preview`, maxCount: 1}]);
router.post(``, images, async(async (req, res) => {
  const data = req.body;
  if (!data.date) {
    data.date = parseInt(new Date().getTime(), 10);
  }

  data.name = data.name || DEFAULT_NAMES[Math.floor(
      Math.random() * DEFAULT_NAMES.length)];

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

  if (req.files && req.files[`avatar`]) {
    const avatarInfo = {
      path: `/api/offers/${data.date}/avatar`,
      mimetype: req.files[`avatar`][0].mimetype,
    };

    await router.imageStore.save(avatarInfo.path, bufferToStream(
        req.files[`avatar`][0].buffer));
    data.avatar = avatarInfo;
  }

  if (req.files && req.files[`preview`]) {
    const previewInfo = {
      path: `/api/offers/${data.date}/preview`,
      mimetype: req.files[`avatar`][0].mimetype,
    };

    await router.imageStore.save(previewInfo.path, bufferToStream(
        req.files[`preview`][0].buffer));
    data.preview = previewInfo;
  }

  const offer = restruct(data);

  logger.info(`Data from user: ${JSON.stringify(offer)}`);
  await router.offersStore.saveOffer(offer);

  res.send(offer);
}));

router.use((exception, req, res, next) => {
  let data = exception;
  if (exception instanceof ValidationError) {
    data = exception.errors;
    res.status(400).send(data);
  }
  res.status(500);
  next();
});

module.exports = router;
