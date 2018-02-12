const commands = require(`./src/main`);


const passedCommand = process.argv[2] || Symbol.for(`default`);

const ERROR_EXIT_CODE = 1;

const filteredCommand = commands.filter(
    (command) => command.name === passedCommand);

if (filteredCommand.length) {
  filteredCommand[0].execute();
} else {
  console.error(
      `Неизвестная команда ${passedCommand[0]}.
      Чтобы прочитать правила использования приложения, наберите "--help"`
  );
  process.exitCode = ERROR_EXIT_CODE;
}
