import { QueueParams } from "./QueueTypes";

export default interface QueueConsumerClient {
  receiveMessage(params: QueueParams, execute: Function): Promise<any>;
}
