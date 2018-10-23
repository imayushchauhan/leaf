const UserRoutes = require('./user');
const ProductRoutes = require('./product');
const OrderRoutes = require('./order');

class AppRouter {
    constructor() {
        this.userRoutes = new UserRoutes();
        this.productRoutes = new ProductRoutes();
        this.orderRoutes = new OrderRoutes();
    }

    attachRoutes(router) {
        this.userRoutes.attachRoutes(router);
        this.productRoutes.attachRoutes(router);
        this.orderRoutes.attachRoutes(router);
    }
}

module.exports = AppRouter;