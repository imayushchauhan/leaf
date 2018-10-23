const MQTTBroker = require('./mqtt');

class AppBroker {
    constructor() {
        this.mqttBroker = new MQTTBroker();
    }

    attachBrokers() {
        this.mqttBroker.attachBroker();
    }
}

module.exports = AppBroker;