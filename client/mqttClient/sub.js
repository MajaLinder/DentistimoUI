/* eslint-disable */
const mqtt = require('./mqtt');

export default class Subsrciber{

    constructor(){}

    connectToBroker() {
        mqtt.client.on('connect',  ()  => {
            console.log('Connected to Broker');
        })
    }

    subToTopic(topic, qos){

        mqtt.client.subscribe(topic, { qos }, (error, res) => {
          if (error) {
            console.log("Subscribe to topics error", error);
            return;
          }
          console.log("Subscribe to topics res", res);
        });
    }
}
