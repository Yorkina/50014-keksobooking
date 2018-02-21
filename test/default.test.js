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
          assert.ok(`файл сгенерирован`);
          unlink(PATH);
        })
        .catch((err) => {
          assert.fail(err.message);
        });
  });

  it(`can read file`, () => {
    createDataFile({name: PATH, quantity: 10})
        .then(() => readFile(PATH, {encoding: `utf-8`}))
        .then((data, err) => {
          if (JSON.parse(data).length < 1 || err) {
            assert.fail(`не сгенерировались данные`);
          }
        })
        .catch((err) => {
          assert.fail(err.message);
        })
        .then(() => {
          assert.ok(`файл читается`);
          unlink(PATH);
        });
  });
});
