const fs = require("fs")
const dotenv = require('dotenv');
dotenv.config();

const queue = 'csv-task';
const amqp = require('amqplib')

const publishMessage = async (data) => {
    try {
        const connection = await amqp.connect(process.env.RABBIT)
        const channel = await connection.createChannel()
        const assertion = await channel.assertQueue(queue)

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)))
    } catch (error) {
        console.log(error)
    }
}

// Consumer
const consumeMessage = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBIT)
        const channel = await connection.createChannel()
        const assertion = await channel.assertQueue(queue)

        channel.consume(queue, async (message) => {
            const { msg } = JSON.parse(message.content.toString())
            await fs.writeFile('D:/doneprojects/sellproject/public/testcsv.csv', msg, (err, result) => {
                if (err) console.log(err)
            });
            channel.ack(message)
            
        })

    } catch (error) {
        console.log(error)
    }
    return "success"
};
module.exports = {
    publishMessage,
    consumeMessage
}