const Mongoose = require('mongoose');
require('./order');
require('../user/user');
const Order = Mongoose.model('Order');
const User = Mongoose.model('User');
const Utility = require('../../libs/utils');
const Constants = require('../../libs/constants');

class OrderBLManager {
    async addOrder(requestData) {
        let queryObj = {
            role: "agent",
            isAvailable: 1,
            isActive: 1,
            isDeleted: 0
        };

        let getUserResponse = {};
        try {
            getUserResponse = await User.getUser(queryObj, "", 0, 0);
        } catch (err) {
            return Utility.getResponseObject(null, Constants.MSG.UNABLE_TO_GET_USER, Constants.CODE.ERROR_RESPONSE_CODE);
        }

        try {
            await User.updateUser({_id: getUserResponse[0]._id}, {isAvailable: 0});
        } catch (err) {
            return Utility.getResponseObject(null, Constants.MSG.UNABLE_TO_UPDATE_USER, Constants.CODE.ERROR_RESPONSE_CODE);
        }

        const orderObj = new Order(requestData);
        orderObj.agent = getUserResponse[0]._id;
        orderObj.addedOn = (new Date()).getTime();
        orderObj.modifiedOn = (new Date()).getTime();

        try {
            await orderObj.saveOrder();
        } catch (err) {
            return Utility.getResponseObject(null, Constants.MSG.UNABLE_TO_SAVE_ORDER, Constants.CODE.ERROR_RESPONSE_CODE);
        }

        return Utility.getResponseObject(null, Constants.MSG.ORDER_SAVED_SUCCESSFULLY, Constants.CODE.SUCCESS_RESPONSE_CODE);
    }

    async getOrderList() {
        const queryObj = {
            isActive: 1,
            isDeleted: 0
        };

        let getOrderListResponse = [];
        try {
            getOrderListResponse = await Order.getOrder(queryObj, "", 0, 0);
        } catch (err) {
            return Utility.getResponseObject(null, Constants.MSG.UNABLE_TO_GET_ORDER_LIST, Constants.CODE.ERROR_RESPONSE_CODE);
        }

        return Utility.getResponseObject(getOrderListResponse, Constants.MSG.ORDER_LIST_FETCHED_SUCCESSFULLY, Constants.CODE.SUCCESS_RESPONSE_CODE);
    }

    async getOrderAssignedToAgent(agentId) {
        const queryObj = {
            agent: agentId,
            status: 'placed',
            isActive: 1,
            isDeleted: 0
        };

        let getOrderResponse = [];
        try {
            getOrderResponse = await Order.getOrder(queryObj, "", 0, 0);
        } catch (err) {
            return Utility.getResponseObject(null, Constants.MSG.UNABLE_TO_GET_ORDER_ASSIGNED_TO_AGENT, Constants.CODE.ERROR_RESPONSE_CODE);
        }

        return Utility.getResponseObject(getOrderResponse, Constants.MSG.ORDER_ASSIGNED_TO_AGENT_FETCHED_SUCCESSFULLY, Constants.CODE.SUCCESS_RESPONSE_CODE);
    }
}

module.exports = OrderBLManager;