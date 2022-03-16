const amqp = require("amqplib");
const queue = process.env.QUEUE || 'restaurant';
const rabbitConfig = {
    protocol: 'amqp',
    hostname: process.env.RABBIT_HOST || 'localhost',
    port: process.env.RABBIT_PORT || 5672,
    username: process.env.RABBIT_USER || 'Aforos',
    password: process.env.RABBIT_PASSWORD || '12345'
}

async function publisher() {
    const connection = await amqp.connect(rabbitConfig)
    const channel = await connection.createChannel()

    await channel.assertQueue(queue)

    const message = {"tipo": "test1", "nombre": "nombre prueba 1", "capacidad": "100"}

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