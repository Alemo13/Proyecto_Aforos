require('dotenv').config();
const mongoose = require('mongoose');

// environment variables
const MONGO_CONTAINER_NAME = process.env.MONGO_HOST || 'localhost';
const MONGO_URI = `mongodb://${MONGO_CONTAINER_NAME}:27017/aforos`;

const mongoConnect = () => {
 mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    
    }, (err) => {  
        if(err) {
            console.error('Mongo ERROR ' + err)
        }
    })
    mongoose.connection.on('connected', function () {  
        console.log('info',`Mongoose - connection established at ${MONGO_URI}`);
    }); 
    
    mongoose.connection.on('error',function (err) {  
        console.log('fatal',`Mongoose - connection error: ${MONGO_URI}`);
    }); 
    
    mongoose.connection.on('disconnected', function () {  
        console.log('fatal',`Mongoose - disconnected: ${MONGO_URI}`);
    });
}

module.exports = {
    mongoConnect: mongoConnect,
}