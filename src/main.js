const author = require(`./author`);
const defaultCommand = require(`./default`);
const description = require(`./description`);
const help = require(`./help`);
const license = require(`./license`);
const version = require(`./version`);


const COMMANDS = [
  author,
  defaultCommand,
  description,
  help,
  license,
  version
];

module.exports = COMMANDS.map((command) => {
  return {
    name: command.name,
    execute: command.execute
  };
});
