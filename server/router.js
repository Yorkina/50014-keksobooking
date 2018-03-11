const generator = require(`../data/generator`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const upload = multer({storage: multer.memoryStorage()});
const {Router} = require(`express`);
const router = new Router();
const {validateSchema} = require(`../util/validator`);
const offersValidation = require(`../util/validation`);
const ValidationError = require(`../util/error`);
const bufferToStream = require(`../util/bufferToStream`);
const restruct = require(`../util/restruct`);

const MAX_REQUEST_LIMIT = 1;
const MIN_REQUEST_SKIP = 0;
const DEFAULT_NAMES = [`Keks`, `Pavel`, `Nikolay`, `Alex`, `Ulyana`, `Anastasyia`, `Julia`];

const async = (fn) => (req, res, next) => fn(req, res, next).catch(next);

let offers = [];

router.use(bodyParser.json());

router.get(``, async(async (req, res) => {
  const limit = Number(req.query.limit);
  const validLimitInteger = (parseInt(limit, 10) === limit && limit > 0) ? limit :
    MAX_REQUEST_LIMIT;

  const skip = Number(req.query.skip);
  const validSkipInteger = (parseInt(skip, 10) === skip && skip > 0) ? skip :
    MIN_REQUEST_SKIP;

  offers = await generator.createData(validLimitInteger);
  res.send(offers.slice(validSkipInteger));
}));

router.get(`/:date`, async(async (req, res) => {
  const date = parseInt(req.params.date, 10);
  const offer = offers.find((it) => it.date === date);
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

const startRouter = (offersStore, imageStore) => {
  router.offersStore = offersStore;
  router.imageStore = imageStore;
  return router;
};

module.exports = startRouter;
