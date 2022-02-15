const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/',async(req, res) => {
    const tasks = await Task.find();
    /* console.log(tasks); */
    res.json(tasks);
});

router.get('/:id', async(req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
})

router.post('/', async (req, res) => {
    const {tipo, nombre, capacidad} = req.body;
    const task = new Task({
        tipo,
        nombre,
        capacidad
    });
    await task.save();
    res.json({status: 'Task Saved'});
});

router.put('/:id', async(req, res) => {
    const { tipo, nombre, capacidad} = req.body;
    const newTask = {tipo, nombre, capacidad};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'Task updated'});
});

router.delete('/:id', async(req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'task deleted'});
});


module.exports = router;