const mongoose = require('mongoose');
const {Schema} = mongoose;

const TaskSchema = new Schema({
    tipo: { type: String, required: true},
    nombre: {type: String, required: true},
    capacidad: {type: Number, required: true}
});

module.exports = mongoose.model('Task', TaskSchema);