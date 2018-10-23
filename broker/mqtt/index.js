const MQTT = require('mqtt');
const Client = MQTT.connect('mqtt://broker.hivemq.com');
const UserBLManager = require('../../app/modules/user/bl-manager');
const OrderBLManager = require('../../app/modules/order/bl-manager');

class MQTTBroker {
    async attachBroker() {
        const _this = this;
        Client.on('connect', function () {
            Client.subscribe("agent_location", function (err) {
                if (!err) {
                    Client.on('message', (topic, message) => {
                        _this.handleAgentLocation(JSON.parse(message));
                    });
                }
            });
        });
    }

    async handleAgentLocation(message) {
        const userBLManager = new UserBLManager();
        const agentId = message.agentId;

        delete message.agentId;
        userBLManager.updateUser(agentId, message);
        delete message.modifiedOn;

        const orderBLManager = new OrderBLManager();
        let response = await orderBLManager.getOrderAssignedToAgent(agentId);
        if (response && response.data.length > 0)  {
            Client.publish(response.data[0].consumer.toString(), JSON.stringify(message));
        }
    }
}

module.exports = MQTTBroker;