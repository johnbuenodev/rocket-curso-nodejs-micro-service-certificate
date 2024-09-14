//receber mensagens pelo kafka
var { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'certificate',
  brokers: ['localhost:9092'], //localhost para encontrar a porta
});

const topic = "issue-certificate"
const consumer = Kafka.consumer();

async function run() {
  await consumer.connect();
  await consumer.subscribe({topic});
  await consumer.run({
    eachMessage: async ({topic, partition, message}) => {
     const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
     console.log(`- ${prefix} ${message.key}#${message.value}`);
    },
  })
}

run().catch(console.error);