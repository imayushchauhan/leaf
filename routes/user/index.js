const UserController = require('../../app/modules/user');

class UserRoutes {
    attachRoutes(router) {
        router.post("/user", this.addUser);
        router.get("/user/list", this.getUserList);
    }

    async addUser(req, res) {
        const userController = new UserController();
        res.send(await userController.addUser(req));
    }

    async getUserList(req, res) {
        const userController = new UserController();
        res.send(await userController.getUserList());
    }
}

module.exports = UserRoutes;