
const queue = 'csv-task';
const fs = require("fs")
const dotenv = require('dotenv');
dotenv.config();
const open = require('amqplib').connect(process.env.RABBIT);

// Publisher
const publishMessage = payload => open.then(connection => connection.createChannel())
    .then(channel => channel.assertQueue(queue)
        .then(() => channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)))))
    .catch(error => console.warn(error));

// Consumer
const consumeMessage = () => {
    open.then(connection => connection.createChannel()).then(channel => channel.assertQueue(queue).then(() => {
        console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);
        return channel.consume(queue, async (msg) => {
            if (msg !== null) {
                const filetext = msg.content.toString()
                await fs.writeFile('D:/doneprojects/sellproject/public/testcsv.csv', filetext);
                channel.ack(msg);
            }
        });
    })).catch(error => console.warn(error));
};

module.exports = {
    publishMessage,
    consumeMessage
}