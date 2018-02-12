const colors = require(`colors`);
const packageInfo = require(`../package.json`);


module.exports = {
  name: `--author`,
  description: `печатает имя автора приложения`,
  execute() {
    console.log(`автор: ${colors.green(packageInfo.author)}`);
  }
};
