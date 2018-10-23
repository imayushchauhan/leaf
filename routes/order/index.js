const OrderController = require('../../app/modules/order');

class OrderRoutes {
    attachRoutes(router) {
        router.post("/order", this.addOrder);
        router.get("/order/list", this.getOrderList);
    }

    async addOrder(req, res) {
        const orderController = new OrderController();
        res.send(await orderController.addOrder(req));
    }

    async getOrderList(req, res) {
        const orderController = new OrderController();
        res.send(await orderController.getOrderList());
    }
}

module.exports = OrderRoutes;