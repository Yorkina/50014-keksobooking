const express = require(`express`);
const StartRouter = require(`../server/start-router`);
const createOffersStore = require(`../server/store`);
const imageStore = require(`../server/images/store`);

const PORT = parseInt(process.env.SERVER_PORT, 10) || 3000;

const app = express();
app.use(express.static(`static`));
const offersStore = createOffersStore();
const offersRouter = new StartRouter(offersStore, imageStore).getRouterWithStores();
app.use(`/api/offers`, offersRouter);

module.exports = {
  name: `--server`,
  description: `запускает сервер`,
  execute() {
    const port = parseInt(process.argv[3], 10) || PORT;
    app.listen(port, (err) => {
      if (err) {
        throw new Error(err);
      }
      console.log(`Сервер запущен на ${port}/`);
    });
  },
  app
};
