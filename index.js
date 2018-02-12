const author = require(`./src/author`);
const defaultCommand = require(`./src/default`);
const description = require(`./src/description`);
const help = require(`./src/help`);
const license = require(`./src/license`);
const unknownCommand = require(`./src/unknownCommand`);
const version = require(`./src/version`);

const ERROR_EXIT_CODE = 1;
const DEFAULT_COMMAND_NAME = `default`;

const passedCommand = process.argv[2] || DEFAULT_COMMAND_NAME;

let map = new Map();
map
    .set(`${version.name}`, version)
    .set(`${help.name}`, help)
    .set(`${author.name}`, author)
    .set(`${license.name}`, license)
    .set(`${description.name}`, description)
    .set(`${defaultCommand.name}`, defaultCommand);

console.log(map, passedCommand);
if (map.has(passedCommand)) {
  map.get(passedCommand).execute();
} else {
  unknownCommand.execute();
  process.exitCode = ERROR_EXIT_CODE;
}
