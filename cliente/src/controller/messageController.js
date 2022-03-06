// const { messageSchema } = require('./models/task');
// const mongoose = require('mongoose');

const processMessage = (message, messageChannel) => {
    const messageContent = JSON.parse(message.content.toString());
    console.log(messageContent)
    messageChannel.ack(message);
}

module.exports = {
    processMessage: processMessage
}