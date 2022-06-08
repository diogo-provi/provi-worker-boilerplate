import { Message } from "aws-sdk/clients/sqs";
import { Consumer } from "sqs-consumer";
import { QueueConsumerParams } from "./QueueTypes";

export default interface QueueConsumerClient {
  create(
    params: QueueConsumerParams,
    execute: (message: Message) => Promise<void>
  ): Consumer;
}
