const mongoose = require('mongoose');
const {Schema} = mongoose;

const messageSchema = new Schema({
    tipo: { type: String, required: true},
    nombre: {type: String, required: true},
    capacidad: {type: Number, required: true}
}, {
    timestamps: true
});

module.exports = {
    messageSchema: messageSchema
}