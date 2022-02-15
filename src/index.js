const exp = require('constants');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { route } = require('./routes/taskroutes');
const { dirname } = require('path/posix');
const mongoose = require('./database');
const app = express();

//configuracion
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Rutas
app.use('/api/tasks' , require('./routes/taskroutes'));

//static fields
app.use(express.static(path.join(__dirname, 'public')));

//servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});