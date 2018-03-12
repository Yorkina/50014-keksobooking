const express = require(`express`);
const StartRouter = require(`../server/start-router`);
const createOffersStore = require(`../server/store`);
const imageStore = require(`../server/images/store`);

const PORT = process.argv[3] || 3000;

const app = express();
app.use(express.static(`static`));
const offersStore = createOffersStore();
const offersRouter = new StartRouter(offersStore, imageStore).getRouterWithStores();
app.use(`/api/offers`, offersRouter);

module.exports = {
  name: `--server`,
  description: `запускает сервер`,
  execute() {
    app.listen(PORT, (err) => {
      if (err) {
        throw new Error(err);
      }
      console.log(`Сервер запущен на ${PORT}/`);
    });
  },
  app
};
