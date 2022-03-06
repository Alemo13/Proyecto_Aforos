const amqp = require("amqplib");
const queue = process.env.QUEUE;
const rabbitConfig = {
    protocol: 'amqp',
    hostname: process.env.RABBIT_HOST,
    port: process.env.RABBIT_PORT,
    username: process.env.RABBIT_USER,
    password: process.env.RABBIT_PASSWORD,
}

async function publisher() {
    const connection = await amqp.connect(rabbitConfig)
    const channel = await connection.createChannel()

    await channel.assertQueue(queue)

    const message = {"tipo": tipo, "nombre": nombre, "capacidad": capacidad}

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
    })