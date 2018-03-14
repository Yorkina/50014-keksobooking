const author = require(`./author`);
const description = require(`./description`);
const help = require(`./help`);
const license = require(`./license`);
const version = require(`./version`);

const passedCommand = process.argv[2];
const COMMANDS = [
  author,
  description,
  help,
  license,
  version
];

const helpsArr = COMMANDS.map(
    (command) => `${command.name} — ${command.description}`).join(`\n\t`);

module.exports = {
  name: `undefined`,
  description: `печатает этот текст;`,
  execute() {
    console.error(
        `Неизвестная команда ${passedCommand}.
      Чтобы прочитать правила использования приложения, наберите "--help".
      Доступные команды:
        ${helpsArr}`
    );
  }
};
