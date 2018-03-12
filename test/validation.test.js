const {validate} = require(`../util/validator`);

const schema = require(`../util/validation`);
const assert = require(`assert`);

const assertField = (fieldName, fieldValue, ...errorMessages) => {

  const expected = errorMessages.map((errorMessage) => ({
    fieldName, fieldValue, errorMessage
  }));

  const actual = validate({[fieldName]: fieldValue}, fieldName, schema[fieldName]);

  assert.deepEqual(actual, expected);
};

describe(`validate fields`, () => {
  describe(`'title'`, () => {
    const fieldName = `title`;

    it(`it is required`, () => {
      assertField(fieldName, void 0, `is required`);
      assertField(fieldName, null, `is required`);
      assertField(fieldName, ``, `is required`);
    });

    it(`it should be in range from 10 to 140`, () => {
      assertField(fieldName, 200, `should be a string with length in range 10..140`);
      assertField(fieldName, `-1`, `should be a string with length in range 10..140`);
      assertField(fieldName, `sss `, `should be a string with length in range 10..140`);
    });

  });

  describe(`'address'`, () => {
    const fieldName = `address`;

    it(`it is required`, () => {
      assertField(fieldName, void 0, `is required`);
      assertField(fieldName, null, `is required`);
      assertField(fieldName, ``, `is required`);
    });

    it(`it should be in range from 0 to 100`, () => {
      assertField(fieldName, 200, `should be a string with length in range 1..100`);
      assertField(fieldName, [], `should be a string with length in range 1..100`);
      assertField(fieldName, {}, `should be a string with length in range 1..100`);
    });

  });

  describe(`'type'`, () => {
    const fieldName = `type`;

    it(`it is required`, () => {
      assertField(fieldName, void 0, `is required`);
      assertField(fieldName, null, `is required`);
      assertField(fieldName, ``, `is required`);
    });

    it(`it should be one of the values`, () => {
      assertField(fieldName, 200, `should be one of [flat,house,bungalo,palace]`);
      assertField(fieldName, `hostel`, `should be one of [flat,house,bungalo,palace]`);
      assertField(fieldName, [], `should be one of [flat,house,bungalo,palace]`);
    });

  });

  describe(`'price'`, () => {
    const fieldName = `price`;

    it(`it is required`, () => {
      assertField(fieldName, void 0, `is required`);
      assertField(fieldName, null, `is required`);
      assertField(fieldName, ``, `is required`);
    });

    it(`it should be in range from 1 to 100000`, () => {
      assertField(fieldName, [`gfhfh`], `should be a number in range 1..100000`);
      assertField(fieldName, -1, `should be a number in range 1..100000`);
      assertField(fieldName, `bla`, `should be a number in range 1..100000`);
    });

  });

  describe(`'rooms'`, () => {
    const fieldName = `rooms`;

    it(`it is required`, () => {
      assertField(fieldName, void 0, `is required`);
      assertField(fieldName, null, `is required`);
      assertField(fieldName, ``, `is required`);
    });

    it(`it should be in range from 1 to 1000`, () => {
      assertField(fieldName, [`gfhfh`], `should be a number in range 1..1000`);
      assertField(fieldName, -1, `should be a number in range 1..1000`);
      assertField(fieldName, `bla`, `should be a number in range 1..1000`);
    });

  });

  describe(`'checkin'`, () => {
    const fieldName = `checkin`;

    it(`it is required`, () => {
      assertField(fieldName, void 0, `is required`);
      assertField(fieldName, null, `is required`);
      assertField(fieldName, ``, `is required`);
    });

    it(`it should be in range from 1 to 1000`, () => {
      assertField(fieldName, [], `should be a string in format "hh:mm"`);
      assertField(fieldName, `35:26`, `should be a string in format "hh:mm"`);
      assertField(fieldName, 9, `should be a string in format "hh:mm"`);
    });

  });

  describe(`'checkout'`, () => {
    const fieldName = `checkout`;

    it(`it is required`, () => {
      assertField(fieldName, void 0, `is required`);
      assertField(fieldName, null, `is required`);
      assertField(fieldName, ``, `is required`);
    });

    it(`it should be in range from 1 to 1000`, () => {
      assertField(fieldName, [], `should be a string in format "hh:mm"`);
      assertField(fieldName, `35:26`, `should be a string in format "hh:mm"`);
      assertField(fieldName, 9, `should be a string in format "hh:mm"`);
    });

  });

  describe(`'name'`, () => {
    const fieldName = `name`;

    it(`it should be a string`, () => {
      assertField(fieldName, 32, `should be a string`);
    });

  });

  describe(`'avatar'`, () => {
    const fieldName = `avatar`;

    it(`it should be an image/jpg, image/png`, () => {
      assertField(fieldName, {mimetype: `text/html`}, `should be an image`);
      assertField(fieldName, {mimetype: `video/mpeg`}, `should be an image`);
      assertField(fieldName, {mimetype: `audio/mpeg`}, `should be an image`);
    });

  });

  describe(`'preview'`, () => {
    const fieldName = `preview`;

    it(`it should be an image/jpg, image/png`, () => {
      assertField(fieldName, {mimetype: `text/html`}, `should be an image`);
      assertField(fieldName, {mimetype: `video/mpeg`}, `should be an image`);
      assertField(fieldName, {mimetype: `audio/mpeg`}, `should be an image`);
    });

  });

  describe(`'features'`, () => {
    const fieldName = `features`;

    it(`it should contains in array`, () => {
      assertField(fieldName, 200, `should contains in array [dishwasher,elevator,conditioner,parking,washer,wifi] and be unique`);
      assertField(fieldName, `hostel`, `should contains in array [dishwasher,elevator,conditioner,parking,washer,wifi] and be unique`);
      assertField(fieldName, [`bla`], `should contains in array [dishwasher,elevator,conditioner,parking,washer,wifi] and be unique`);
    });

  });

});
