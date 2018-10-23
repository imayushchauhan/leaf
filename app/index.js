const Express = require('express');
const Config = require('config');
const Mongoose = require('mongoose');
const Fs = require('fs');
const Path = require('path').join;
const Router = require('router');
const BodyParser = require('body-parser');
const appRoot = require('app-root-path');
const AppRouter = require('../routes');
const AppBroker = require('../broker');

class App {
    constructor() {
        this.app = Express();
        this.app.use(BodyParser.json({limit: '50mb'}));
        this.app.use(Express.static(appRoot + '/public'));
        this.router = Router();
        this.app.use(this.router);
        this.env = process.env.NODE_ENV || 'development';
        this.port = Config.get(this.env + '.appConfig.port');
    }

    startServer() {
        this.app.listen(this.port, () => console.log(`App listening on port ${this.port}!!!`))
    }

    attachRoutes() {
        let appRouter = new AppRouter();
        appRouter.attachRoutes(this.router);
    }

    attachBrokers() {
        let appBroker = new AppBroker();
        appBroker.attachBrokers();
    }

    connectDatabases() {
        const url = Config.get(this.env + '.dbConfig.url');
        this.connectMongo(url);
    }

    connectMongo(url) {
        return new Promise((resolve, reject) => {
            Mongoose.connect(url, function (err, res) {
                if (err)
                    reject(err);

                resolve(res);
            });
        });
    }
}

module.exports = App;