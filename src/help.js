const colors = require(`colors`);
const author = require(`./author`);
const description = require(`./description`);
const license = require(`./license`);
const version = require(`./version`);


const COMMANDS = [
  author,
  description,
  license,
  version
];

const help = COMMANDS.map(
    (command) => `${colors.gray(command.name)} — ${colors.green(command.description)}`).join(`\n\t`);

module.exports = {
  name: `--help`,
  description: `печатает правила использования приложения`,
  execute() {
    console.log(`Доступные команды:
        ${help}`);
  }
};
