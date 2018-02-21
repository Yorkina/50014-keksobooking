const assert = require(`assert`);
const {createDataFile} = require(`../src/default`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const unlink = promisify(fs.unlink);
const readFile = promisify(fs.readFile);

const PATH = `testFile.json`;

describe(`Generate JSON file`, () => {
  it(`should create json file`, () => {
    createDataFile({name: PATH, quantity: 10})
        .then(() => {
          assert.ok(`file generated`);
          unlink(PATH);
        })
        .catch((err) => {
          assert.error(err.message);
          unlink(PATH);
        });
  });

  it(`can read file`, () => {
    createDataFile({name: PATH, quantity: 10})
        .then(readFile(PATH, `utf8`))
        .then((err, data) => {
          if (err) {
            assert.error(err);
          }
          assert.ok(data.length > 0);
          unlink(PATH);
        })
        .catch((err) => {
          assert.error(err.message);
          unlink(PATH);
        });
  });
});
