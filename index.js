const args = process.argv.slice(2);

/* eslint no-undefined: "off"*/
switch (args[0]) {
  case `--help`:
    console.log(`Доступные команды:
    --help    — печатает этот текст;
    --version — печатает версию приложения;`);
    break;
  case `--version`:
    console.log(`v8.8.9`);
    break;
  case undefined:
    console.log(`Привет пользователь!
    Эта программа будет запускать сервер «https://github.com/Yorkina/50014-keksobooking».
    Автор: Кекс.`);
    break;
  default:
    console.error(`Неизвестная команда ${args[0]}.
    Чтобы прочитать правила использования приложения, наберите "--help"`);
    process.exitCode = 1;
}
