import Subscriber from "./sub";

export default class BrokerConnector {
    constructor() {
    }
    // this method is called in the main.js so once the page is loaded we connect and subscribe automatically.
    establishConnection() {
        const subscriber = new Subscriber();
        // we list here all the topics we want to listen to ( could be refactrored to smaller method >> " listen to topics ")
        subscriber.connectToBroker();
        subscriber.subToTopic("/jsonData", 1);
        subscriber.subToTopic('/availableTimeslots', 1); 
    }

}