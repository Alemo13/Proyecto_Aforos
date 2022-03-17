const amqp = require("amqplib");
const queue = process.env.QUEUE || 'restaurant';
const type = process.env.TYPE || 'local';
const name = process.env.NAME || 'local-Random';
var can = 0;
const rabbitConfig = {
    protocol: 'amqp',
    hostname: process.env.RABBIT_HOST || 'localhost',
    port: process.env.RABBIT_PORT || 5672,
    username: process.env.RABBIT_USER || 'Aforos',
    password: process.env.RABBIT_PASSWORD || '12345'
}

function cantidad(){
    var rcan = Math.floor(Math.random()*(5-(1+1))+1);
    var des = Math.random();
    if(can == 0){
        return can = can + rcan;
    }else if(can > 0){
        if(des > 0.6){
            return can = can + rcan;
        }else{
            can = can - rcan;
            if(can <= 0){
                can = 0;
            }
            return can;
        }
    }
}

async function publisher() {
    const connection = await amqp.connect(rabbitConfig)
    const channel = await connection.createChannel()

    await channel.assertQueue(queue)

    const message = {"tipo": type, "nombre": name, "capacidad": cantidad()}

    const sent = await channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(message)),
        {
            persistent: true
        }
    )

    sent
        ? console.log(`Sent message to "${queue}" queue`, message)
        : console.log(`Fails sending message to "${queue}" queue`, message)

}

publisher()
    .catch(err => {
        console.error(`Error => ${err}`)
    });

setInterval(() =>{
    publisher();
}, 5000);