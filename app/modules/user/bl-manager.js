const Mongoose = require('mongoose');
require('./user');
const User = Mongoose.model('User');
const Utility = require('../../libs/utils');
const Constants = require('../../libs/constants');

class UserBLManager {
    async addUser(requestData) {
        const userObj = new User(requestData);
        userObj.addedOn = (new Date()).getTime();
        userObj.modifiedOn = (new Date()).getTime();

        try {
            await userObj.saveUser();
        } catch (err) {
            return Utility.getResponseObject(null, Constants.MSG.UNABLE_TO_SAVE_USER, Constants.CODE.ERROR_RESPONSE_CODE);
        }

        return Utility.getResponseObject(null, Constants.MSG.USER_SAVED_SUCCESSFULLY, Constants.CODE.SUCCESS_RESPONSE_CODE);
    }

    async getUserList() {
        const queryObj = {
            isActive: 1,
            isDeleted: 0
        };

        let getUserListResponse = [];
        try {
            getUserListResponse = await User.getUser(queryObj, "", 0, 0);
        } catch (err) {
            return Utility.getResponseObject(null, Constants.MSG.UNABLE_TO_GET_USER_LIST, Constants.CODE.ERROR_RESPONSE_CODE);
        }

        return Utility.getResponseObject(getUserListResponse, Constants.MSG.USER_LIST_FETCHED_SUCCESSFULLY, Constants.CODE.SUCCESS_RESPONSE_CODE);
    }

    async updateUser(userId, requestData) {
        requestData['modifiedOn'] = (new Date()).getTime();

        const queryObj = {
            _id: userId,
            isActive: 1,
            isDeleted: 0
        };

        try {
            await User.updateUser(queryObj, requestData);
        } catch (err) {
            return Utility.getResponseObject(null, Constants.MSG.UNABLE_TO_UPDATE_USER, Constants.CODE.ERROR_RESPONSE_CODE);
        }

        return Utility.getResponseObject(null, Constants.MSG.USER_UPDATED_SUCCESSFULLY, Constants.CODE.SUCCESS_RESPONSE_CODE);
    }
}

module.exports = UserBLManager;