const OrderBLManager = require('./bl-manager');

class OrderController {
    async addOrder(req) {
        const orderBLManager = new OrderBLManager();
        return await orderBLManager.addOrder(req.body);
    }

    async getOrderList() {
        const orderBLManager = new OrderBLManager();
        return await orderBLManager.getOrderList();
    }
}

module.exports = OrderController;