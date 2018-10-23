const ProductBLManager = require('./bl-manager');

class ProductController {
    async addProduct(req) {
        const productBLManager = new ProductBLManager();
        return await productBLManager.addProduct(req.body);
    }

    async getProductList() {
        const productBLManager = new ProductBLManager();
        return await productBLManager.getProductList();
    }
}

module.exports = ProductController;