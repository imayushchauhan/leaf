const ProductController = require('../../app/modules/product');

class ProductRoutes {
    attachRoutes(router) {
        router.post("/product", this.addProduct);
        router.get("/product/list", this.getProductList);
    }

    async addProduct(req, res) {
        const productController = new ProductController();
        res.send(await productController.addProduct(req));
    }

    async getProductList(req, res) {
        const productController = new ProductController();
        res.send(await productController.getProductList());
    }
}

module.exports = ProductRoutes;