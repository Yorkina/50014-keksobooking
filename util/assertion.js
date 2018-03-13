const oneOf = (types) => {
  return {
    assert(option) {
      return types.indexOf(option) >= 0;
    },
    message: `should be one of [${types}]`
  };
};

const anyOfTypes = (types, options) => {
  return options.every((type) => {
    return types.includes(type);
  });
};


module.exports = {
  oneOf,
  isNumberInRange(from, to) {
    return {
      assert(number) {
        return +number >= from && +number <= to;
      },
      message: `should be a number in range ${from}..${to}`
    };
  },
  isTextInRange(from, to) {
    return {
      assert(text) {
        return text.length >= from && text.length <= to;
      },
      message: `should be a string with length in range ${from}..${to}`
    };
  },
  isImage() {
    return {
      assert(image) {
        return image.mimetype.startsWith(`image/`);
      },
      message: `should be an image`
    };
  },
  isDataTime() {
    return {
      assert(data) {
        if (typeof data !== `string`) {
          return false;
        }

        let [hh, mm] = data.split(`:`);
        return (hh >= 0 && hh < 24 && mm >= 0 && mm < 60);
      },
      message: `should be a string in format "hh:mm"`
    };
  },
  isText() {
    return {
      assert(value) {
        return typeof value === `string`;
      },
      message: `should be a string`
    };
  },
  isUniqueAndContains(types) {
    return {
      assert(options) {
        if (!Array.isArray(options)) {
          return false;
        }

        const isContains = anyOfTypes(types, options);
        if (isContains) {
          const set = new Set(options);
          return set.size === options.length;
        } else {
          return false;
        }
      },
      message: `should contains in array [${types}] and be unique`
    };
  },
};
