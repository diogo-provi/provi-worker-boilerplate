import { QueueProducerParams } from "./QueueTypes";

export default interface QueueProducerClient {
  sendMessage(params: QueueProducerParams): Promise<any>;
}
