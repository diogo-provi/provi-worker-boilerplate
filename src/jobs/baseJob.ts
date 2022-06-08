import { QueueConfigurations } from "@src/clients/queue/QueueTypes";
import { Message } from "aws-sdk/clients/sqs";

export default interface BaseJob {
  queueUrl: string;
  execute(): void;
}
