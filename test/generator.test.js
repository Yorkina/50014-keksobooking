const assert = require(`assert`);
const Data = require(`../data/generate`);
const generator = require(`../data/generator`);


describe(`data generated correctly`, () => {
  const data = JSON.parse(generator.generateEntity());
  assert.notEqual(typeof data, `undefined`);
});

describe(`author.avatar field check`, () => {
  const data = JSON.parse(generator.generateEntity());

  it(`should be a string`, () => {
    assert.ok(typeof data.author.avatar === `string`);
  });

  it(`is adress an url`, () => {
    const regExpToTest = /^((https|http)\:\/\/)/;
    assert.ok(regExpToTest.test(data.author.avatar));
  });
});

describe(`JSON offer object check`, () => {
  const data = JSON.parse(generator.generateEntity());

  it(`should exist`, () => {
    assert.notEqual(typeof data.offer, `undefined`);
  });

  describe(`offer.title field check`, () => {
    it(`should be a string`, () => {
      assert.ok(typeof data.offer.title === `string`);
    });

    it(`should have one of the values: ${Data.TITLES}`, () => {
      assert.notEqual(Data.TITLES.indexOf(data.offer.title), -1);
    });
  });

  describe(`offer.address field check`, () => {
    it(`should exist`, () => {
      assert.notEqual(typeof data.offer.address, `undefined`);
    });

    it(`should be a string`, () => {
      assert.ok(typeof data.offer.address === `string`);
    });

    it(`should have two values`, () => {
      let coordinates = data.offer.address.split(`, `);
      assert.equal(coordinates.length, 2);
    });

    it(`should have values in data.location.x, data.location.y`, () => {
      const coordinates = data.offer.address.split(`, `);
      assert.ok(coordinates[0].length && coordinates[1].length);
    });
  });

  describe(`offer.price field check`, () => {
    it(`should exist`, () => {
      assert.notEqual(typeof data.offer.price, `undefined`);
    });

    it(`should have a num value`, () => {
      assert.equal(typeof data.offer.price, `number`);
    });

    it(`should have a value >= 1000 and <= 1 000 000`, () => {
      let val = (data.offer.price >= 1000 && data.offer.price <= 1000000);
      assert.equal(val, true);
    });
  });

  describe(`offer.type field check`, () => {
    it(`should be a string`, () => {
      assert.ok(typeof data.offer.type === `string`);
    });

    it(`should have one of the values: ${Data.PLACE_TYPES}`, () => {
      assert.notEqual(Data.PLACE_TYPES.indexOf(data.offer.type), -1);
    });
  });

  describe(`offer.rooms field check`, () => {
    it(`should have a number value`, () => {
      assert.ok(typeof data.offer.rooms === `number`);
    });

    it(`should have a value >= 1 and <= 5`, () => {
      assert.ok(data.offer.rooms >= 1 && data.offer.rooms <= 5);
    });
  });

  describe(`offer.guests field check`, () => {
    it(`should exist`, () => {
      assert.notEqual(typeof data.offer.guests, `undefined`);
    });

    it(`should have a number value`, () => {
      assert.ok(typeof data.offer.guests === `number`);
    });

    it(`should have a value >= 1 and <= 15`, () => {
      assert.ok(data.offer.guests >= 1 && data.offer.guests <= 15);
    });
  });

  describe(`offer.checkin field check`, () => {
    it(`should be a string`, () => {
      assert.ok(typeof data.offer.checkin === `string`);
    });

    it(`should have one of the values: ${Data.TIMES}`, () => {
      assert.notEqual(Data.TIMES.indexOf(data.offer.checkin), -1);
    });
  });

  describe(`offer.checkout field check`, () => {
    it(`should be a string`, () => {
      assert.ok(typeof data.offer.checkout === `string`);
    });

    it(`should have one of the values: ${Data.TIMES}`, () => {
      assert.notEqual(Data.TIMES.indexOf(data.offer.checkout), -1);
    });
  });

  describe(`offer.features field check`, () => {
    it(`must be an array`, () => {
      assert.ok(Array.isArray(data.offer.features));
    });

    it(`offer.features length should be >= 1 and <= ${Data.FEATURES.length - 1}`, () => {
      assert.ok(data.offer.features.length >= 1 &&
          data.offer.features.length <= Data.FEATURES.length - 1);
    });

    it(`must contain only this values: ${Data.FEATURES}`, () => {
      const comparison = (elem) => Data.FEATURES.includes(elem);
      assert.ok(data.offer.features.every(comparison));
    });

    it(`havent duplicated keys`, () => {
      const features = data.offer.features.slice().sort((a, b) => a > b);
      features.forEach((feature, index) => {
        assert.ok(features[index] !== features[index + 1]);
      });
    });
  });

  describe(`offer.description field check`, () => {
    it(`should be a string`, () => {
      assert.ok(typeof data.offer.description === `string`);
    });

    it(`string value must be empty`, () => {
      assert.equal(data.offer.description.length, 0);
    });
  });

  describe(`offer.photos field check`, () => {
    it(`must be an array`, () => {
      assert.ok(Array.isArray(data.offer.photos));
    });

    it(`should not be empty`, () => {
      assert.ok(data.offer.photos.length);
    });
  });
});

describe(`JSON location object check`, () => {
  const data = JSON.parse(generator.generateEntity());

  describe(`location.x field check`, () => {
    it(`should exist`, () => {
      assert.notEqual(typeof data.location.x, `undefined`);
    });

    it(`should be a number`, () => {
      assert.ok(typeof data.location.x === `number`);
    });

    it(`should have a value >= 300 and <= 900`, () => {
      assert.ok(data.location.x >= 300 && data.location.x <= 900);
    });
  });

  describe(`location.y field check`, () => {
    it(`should be a number`, () => {
      assert.equal(typeof data.location.y, `number`);
    });

    it(`should have a value >= 150 and <= 500`, () => {
      assert.ok(data.location.y >= 150 && data.location.y <= 500);
    });
  });
});
