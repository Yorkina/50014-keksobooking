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
    (command) => `${command.name} — ${command.description}`).join(`\n\t`);

module.exports = {
  name: `--help`,
  description: `печатает этот текст;`,
  execute() {
    console.log(`Доступные команды:
        ${help}`);
  }
};
