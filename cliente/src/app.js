 const { mongoConnect } = require('./services/database');
const { amqpConnectAndConsume} = require('./services/mqService');
const SLEEP_TIME = process.env.SLEEP_TIME || 100;

startServer = () => {
    // Connect to MongoDB
    mongoConnect();
    // Connect to RabbmitMQ and consume orders
    amqpConnectAndConsume();
}

module.exports = {
    startServer: startServer
}