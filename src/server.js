const express = require(`express`);
const {router} = require(`../server/router.js`);


const HOST = `127.0.0.1`;
const PORT = process.argv[3] || 3000;

const app = express();
app.use(express.static(`static`));
app.use(`/api/offers`, router);

module.exports = {
  name: `--server`,
  description: `запускает сервер`,
  execute() {
    app.listen(PORT, HOST, (err) => {
      if (err) {
        throw new Error(err);
      }
      console.log(`Сервер запущен на ${HOST}:${PORT}/`);
    });
  },
  app
};
