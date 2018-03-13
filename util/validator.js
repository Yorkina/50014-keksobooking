const printError = (name, value, message) => ({
  fieldName: name,
  fieldValue: value,
  errorMessage: message
});

const exists = (value) => {
  switch (typeof value) {
    case `number`:
      return !Number.isNaN(value);
    case `string`:
      return value.length > 0;
    default:
      return value;
  }
};

const validate = (data, fieldName, {required = false, assertions}) => {
  const rawValue = data[fieldName];
  if (!rawValue && !required) {
    return [];
  }

  const errors = [];
  try {
    if (exists(rawValue)) {
      for (const assertion of assertions) {
        if (!(assertion.assert(rawValue, data))) {
          errors.push(printError(fieldName, rawValue, assertion.message));
        }
      }
    } else if (required) {
      errors.push(printError(fieldName, rawValue, `is required`));
    }
  } catch (err) {
    errors.push(printError(fieldName, rawValue, err.message));
  }
  return errors;
};

const validateSchema = (data, schema) => {
  const errors = [];
  for (let key of Object.keys(schema)) {
    for (let error of validate(data, key, schema[key])) {
      errors.push(error);
    }
  }
  return errors;
};

module.exports = {
  validateSchema,
  validate
};
