import QueueProducerClientSQS from "./clients/queue/queueProducerClientSQS";
import { QueueProducerParams } from "./clients/queue/QueueTypes";
import getQueueUrl from "./config/configQueue";
const crypto = require("crypto");

class Producer {
  public async execute() {
    const queueUrl = getQueueUrl();
    const producer = new QueueProducerClientSQS();
    for (let i = 0; i < 5; i++) {
      const payload = {
        id: crypto.randomUUID(),
        message: crypto.randomUUID(),
      };
      const params = {
        queueUrl,
        messageBody: payload,
        messageGroupId: "default",
      } as QueueProducerParams;
      await producer.sendMessage(params);
    }
  }
}

const init = async () => {
  new Producer().execute();
};

init();
