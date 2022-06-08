import QueueProducerClient from "./QueueProducerClient";
import { QueueProducerParams } from "./QueueTypes";
import AWS from "../../config/awsSQS";
const crypto = require("crypto");

export default class QueueProducerClientSQS implements QueueProducerClient {
  private clientSQL: AWS.SQS;
  constructor() {
    this.clientSQL = new AWS.SQS({ apiVersion: "2012-11-05" });
  }
  public async sendMessage(params: QueueProducerParams): Promise<any> {
    const { queueUrl, messageBody, messageGroupId, messageDeduplicationId } =
      params;
    const messageDeduplicationIdOrGenerated =
      messageDeduplicationId || crypto.randomUUID();
    const paramsSQS = {
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(messageBody),
      MessageGroupId: messageGroupId,
      MessageDeduplicationId: messageDeduplicationIdOrGenerated,
    };
    console.log(paramsSQS);
    this.clientSQL.sendMessage(paramsSQS, (err) => {
      if (err) {
        console.log(`Error trying to send message. \n ${err}`);
      } else {
        console.log(`Message sent successfully.`);
      }
    });
  }
}
