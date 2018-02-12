const packageInfo = require(`../package.json`);


module.exports = {
  name: `default`,
  description: `печатает информацию о приложении`,
  execute() {
    console.log(
        `Привет пользователь!
        Эта программа будет запускать сервер «https://github.com/Yorkina/50014-keksobooking».
        Автор: ${packageInfo.author}`
    );
  }
};
