const fs = require(`fs`);
const readline = require(`readline`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);
let rl;

const {createData} = require(`../data/generator`);
const FILE_WRITE_OPTIONS = {encoding: `utf-8`, mode: 0o644};

const generateDialog = () => {
  return new Promise((resolve, reject) => {
    const cb = (answer) => answer.trim() === `y` ? resolve() : reject(
        new Error(`пользователь не захотел генерировать данные`));
    return rl.question(`Сгенерировать данные? (y/n):`, cb);
  });
};

const createQuantity = () => {
  return new Promise((resolve, reject) => {
    const cb = (quantity) => !Number.isInteger(quantity) && Number(quantity) > 0 ?
      resolve({quantity}) : reject(new Error(`пользователь ввел не верное значение`));
    return rl.question(`Введите целое значение больше ноля: `, cb);
  });
};

const createName = (userAnswer) => {
  return new Promise((resolve) => {
    rl.question(`Укажите путь к файлу: `, (path) => {
      userAnswer.name = `${path}.json`;
      resolve(userAnswer);
    });
  });
};

const resolveFileName = (userAnswer) => {
  return new Promise((resolve, reject) => {
    const cb = (answer) => answer === `y` ? resolve(userAnswer) :
      reject(new Error(`отказ перезаписать файл`));

    fs.exists(userAnswer.name, (exists) => {
      return exists ? rl.question(
          `Файл с таким именем уже существует, перезаписать? (y/n):`, cb) :
        resolve(userAnswer);
    });
  });
};

const createDataFile = (userAnswer) => {
  const data = createData(userAnswer.quantity);
  return writeFile(userAnswer.name, JSON.stringify(data), FILE_WRITE_OPTIONS);
};

module.exports = {
  name: `default`,
  description: `Создает JSON с данными`,
  execute() {
    rl = readline.createInterface({input: process.stdin, output: process.stdout});

    generateDialog()
        .then(createQuantity)
        .then(createName)
        .then(resolveFileName)
        .then(createDataFile)
        .catch((err) => {
          console.error(err.message);
        })
        .then(() => rl.close());
  },
  createDataFile
};
