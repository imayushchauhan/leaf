const UserBLManager = require('./bl-manager');

class UserController {
    async addUser(req) {
        const userBLManager = new UserBLManager();
        return await userBLManager.addUser(req.body);
    }

    async getUserList() {
        const userBLManager = new UserBLManager();
        return await userBLManager.getUserList();
    }
}

module.exports = UserController;