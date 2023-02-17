/* eslint-disable */
const mqtt = require('./mqtt')

export default class Publisher{

    constructor(){}

    pubToTopic(topic, payload, qos){
        mqtt.client.publish(topic, payload, qos, (error) => {
            console.log(' I did publish')
        if (error) {
          console.log("Publish error", error);
        }
        });
    }
}