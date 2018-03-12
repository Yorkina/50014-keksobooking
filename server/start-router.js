const router = require(`./router`);


class startRouter {
  constructor(offersStore, imageStore) {
    this.offersStore = offersStore;
    this.imageStore = imageStore;
  }

  getRouterWithStores() {
    router.offersStore = this.offersStore;
    router.imageStore = this.imageStore;
    return router;
  }
}

module.exports = startRouter;
