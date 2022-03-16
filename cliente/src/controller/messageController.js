const mongoose = require('mongoose');
const { messageSchema } = require('../models/task');

const MessageModel = mongoose.model('Message', messageSchema)

function processMessage(message, messageChannel) {
    const messageContent = JSON.parse(message.content.toString());
    console.log(messageContent);
    const newMessage = new MessageModel({tipo: messageContent.tipo, nombre: messageContent.nombre, capacidad: messageContent.capacidad});
    newMessage.save();
    messageChannel.ack(message);
}

module.exports = {
    processMessage: processMessage
}