import QueueConsumerClient from "./QueueConsumerClient";
import { QueueConsumerParams } from "./QueueTypes";
import AWS from "../../config/awsSQS";
import { Consumer } from "sqs-consumer";
import { Message } from "aws-sdk/clients/sqs";

export default class QueueConsumerClientSQS implements QueueConsumerClient {
  create(
    params: QueueConsumerParams,
    execute: (message: Message) => Promise<void>
  ): Consumer {
    const { queueUrl, chunkSize } = params;
    const clientConsumer: Consumer = Consumer.create({
      queueUrl,
      sqs: new AWS.SQS({ apiVersion: "2012-11-05" }),
      handleMessage: execute,
      batchSize: chunkSize || 10,
    });

    clientConsumer.on("error", (error) => console.log(error));
    clientConsumer.on("processing_error", (error) => console.log(error));
    clientConsumer.on("timeout_error", (error) => console.log(error));

    return clientConsumer;
  }
}
