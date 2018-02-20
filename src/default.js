const fs = require(`fs`);
const readline = require(`readline`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);

const {generateEntity} = require(`../data/generator`);
const rl = readline.createInterface({input: process.stdin, output: process.stdout});

const createData = (quantity) => {
  const data = [];
  for (let i = 0; i < quantity; i++) {
    data.push(generateEntity());
  }
  return data;
};

const generateDialog = () => {
  const reject = () => {
    console.log(`Значит не сегодня. Пока!`);
    rl.close();
  };

  return new Promise((resolve) => {
    const cb = (answer) => answer.trim() === `y` ? resolve() : reject();
    return rl.question(`Сгенерировать данные? (y/n):`, cb);
  });
};

const createQuantity = () => {
  const reject = () => {
    console.log(`Введено некорректное значение`);
    rl.close();
  };
  return new Promise((resolve) => {
    const cb = (quantity) => Number(quantity) > 0 ? resolve({quantity}) : reject();
    return rl.question(`Введите значение целое значение больше ноля: `, cb);
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
  const reject = () => {
    console.log(`Невозможно создать файл`);
    rl.close();
  };

  return new Promise((resolve) => {
    const cb = (answer) => answer === `y` ? resolve(userAnswer) : reject();

    fs.exists(userAnswer.name, (exists) => {
      return exists ? rl.question(
          `Файл с таким именем уже существует, перезаписать? (y/n):`, cb) :
        resolve(userAnswer);
    });
  });
};

const createDataFile = (userAnswer) => {
  const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};
  const data = createData(userAnswer.quantity);
  return writeFile(userAnswer.name, JSON.stringify(data), fileWriteOptions)
      .then(() => rl.close());
};

module.exports = {
  name: `default`,
  description: `Создает JSON с данными`,
  execute() {
    generateDialog()
        .then(createQuantity)
        .then(createName)
        .then(resolveFileName)
        .then(createDataFile)
        .catch((err) => {
          console.err(err.message);
          rl.close();
        });
  },
  createDataFile
};
