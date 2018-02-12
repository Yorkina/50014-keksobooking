const packageInfo = require(`../package.json`);


const name = Symbol.for(`default`);

module.exports = {
  name,
  description: `печатает информацию о приложении`,
  execute() {
    console.log(
        `Привет пользователь!
        Эта программа будет запускать сервер «https://github.com/Yorkina/50014-keksobooking».
        Автор: ${packageInfo.author}`
    );
  }
};
