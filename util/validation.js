const {
  isTextInRange,
  isImage,
  oneOf,
  isNumberInRange,
  isDataTime,
  isText,
  isUniqueAndContains
} = require(`./assertion`);

const TYPES = [`flat`, `house`, `bungalo`, `palace`];
const FEATURES = [`dishwasher`, `elevator`, `conditioner`, `parking`, `washer`, `wifi`];

const schema = {
  'title': {
    required: true,
    assertions: [
      isTextInRange(10, 140)
    ]
  },
  'type': {
    required: true,
    assertions: [
      oneOf(TYPES)
    ]
  },
  'price': {
    required: true,
    assertions: [
      isNumberInRange(1, 100000)
    ]
  },
  'address': {
    required: true,
    assertions: [
      isTextInRange(1, 100)
    ]
  },
  'rooms': {
    required: true,
    assertions: [
      isNumberInRange(1, 1000)
    ]
  },
  'checkin': {
    required: true,
    assertions: [
      isDataTime()
    ]
  },
  'checkout': {
    required: true,
    assertions: [
      isDataTime()
    ]
  },
  'avatar': {
    required: false,
    assertions: [
      isImage()
    ]
  },
  'preview': {
    required: false,
    assertions: [
      isImage()
    ]
  },
  'features': {
    required: false,
    assertions: [
      isUniqueAndContains(FEATURES)
    ]
  },
  'name': {
    required: false,
    assertions: [
      isText()
    ]
  }
};

module.exports = schema;
