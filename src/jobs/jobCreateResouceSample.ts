import BaseJob from "./baseJob";
import { QueueConsumerParams } from "../clients/queue/QueueTypes";
import { Message } from "aws-sdk/clients/sqs";
import QueueConsumerClientSQS from "../clients/queue/queueConsumerClientSQS";

export default class JobCreateResourceSample implements BaseJob {
  queueUrl: string;
  constructor(queueUrl: string) {
    this.queueUrl = queueUrl;
  }

  public execute(): void {
    const consumer = new QueueConsumerClientSQS();
    const params = {
      queueUrl: this.queueUrl,
      chunkSize: 1,
    } as QueueConsumerParams;
    const createdConsumer = consumer.create(params, this.handler);
    createdConsumer.start();
  }

  private async handler(message: Message): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const messageBody = JSON.parse(message.Body || "");
        console.log(`Mensagem capturada: ${messageBody.id}`);
        const key = Math.floor(Math.random() * 5 + 1);
        console.log(`Falhou? ${key === 1}`);
        if (key === 1) throw new Error();
        console.log(`\n-------------------------------\n`);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
