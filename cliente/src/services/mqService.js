const amqp = require("amqplib");
const { processMessage } = require('../controller/messageController');
const queue = process.env.QUEUE || 'restaurant';

const rabbitConfig = {
    protocol: 'amqp',
    hostname: process.env.RABBIT_HOST || 'localhost',
    port: process.env.RABBIT_PORT || 5672,
    username: process.env.RABBIT_USER || 'Aforos',
    password: process.env.RABBIT_PASSWORD || '12345'
}

async function amqpConnectAndConsume(){

    const mqConnection = await amqp.connect(rabbitConfig);
    const channel = await mqConnection.createChannel();

    await channel.assertQueue(queue);

    channel.consume(queue, (message) => {
        processMessage(message, channel);
        // const messageContent = JSON.parse(message.content.toString());

        // console.log(`Tipo: ${messageContent.tipo}, nombre: ${messageContent.nombre}, cantidad: ${messageContent.cantidad}`);
        // console.log(messageContent);

        // channel.ack(message);
    });
}

amqpConnectAndConsume().catch((error) => {
    console.error(error)
    process.exit(1)
})
module.exports = {
    amqpConnectAndConsume: amqpConnectAndConsume
}