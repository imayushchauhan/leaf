const Mongoose = require('mongoose');
require('./product');
const Product = Mongoose.model('Product');
const Utility = require('../../libs/utils');
const Constants = require('../../libs/constants');

class ProductBLManager {
    async addProduct(requestData) {
        const productObj = new Product(requestData);
        productObj.addedOn = (new Date()).getTime();
        productObj.modifiedOn = (new Date()).getTime();

        try {
            await productObj.saveProduct();
        } catch (err) {
            return Utility.getResponseObject(null, Constants.MSG.UNABLE_TO_SAVE_PRODUCT, Constants.CODE.ERROR_RESPONSE_CODE);
        }

        return Utility.getResponseObject(null, Constants.MSG.PRODUCT_SAVED_SUCCESSFULLY, Constants.CODE.SUCCESS_RESPONSE_CODE);
    }

    async getProductList() {
        const queryObj = {
            isActive: 1,
            isDeleted: 0
        };

        let getProductListResponse = [];
        try {
            getProductListResponse = await Product.getProduct(queryObj, "", 0, 0);
        } catch (err) {
            return Utility.getResponseObject(null, Constants.MSG.UNABLE_TO_GET_PRODUCT_LIST, Constants.CODE.ERROR_RESPONSE_CODE);
        }

        return Utility.getResponseObject(getProductListResponse, Constants.MSG.PRODUCT_LIST_FETCHED_SUCCESSFULLY, Constants.CODE.SUCCESS_RESPONSE_CODE);
    }
}

module.exports = ProductBLManager;