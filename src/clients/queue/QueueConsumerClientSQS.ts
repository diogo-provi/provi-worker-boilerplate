import AWS from "aws-sdk";
import QueueConsumerClient from "./QueueConsumerClient";
import { QueueParams } from "./QueueTypes";

AWS.config.update({ region: "us-east-1" });

export default class QueueConsumerClientSQS implements QueueConsumerClient {
  private clientSQL: AWS.SQS;
  constructor() {
    this.clientSQL = new AWS.SQS({ apiVersion: "2012-11-05" });
  }
  public async receiveMessage(
    params: QueueParams,
    execute: Function
  ): Promise<any> {
    const {
      queueUrl,
      maxNumberOfMessages,
      visibilityTimeout,
      waitTimeSeconds,
    } = params;
    const paramsSQS = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: maxNumberOfMessages,
      VisibilityTimeout: visibilityTimeout,
      WaitTimeSeconds: waitTimeSeconds,
    };
    this.clientSQL.receiveMessage(paramsSQS, async (err, data) => {
      if (err) {
        console.log(`Error trying to get message. \n ${err}`);
      } else {
        try {
          if (
            data &&
            data.Messages &&
            data.Messages.length > 0 &&
            data.Messages[0].Body &&
            data.Messages[0].ReceiptHandle
          ) {
            const body = data.Messages[0].Body;
            const jsonData = JSON.parse(body);
            await execute(jsonData);
            await this.deleteMessage(data.Messages[0].ReceiptHandle, queueUrl);
          } else {
            console.log("Error trying to get message. \n No data found.");
            return;
          }
        } catch (err) {
          console.log("Something went wrong trying to get message. \n", err);
        }
      }
    });
  }

  private async deleteMessage(receiptHandle: string, queueUrl: string) {
    const params = {
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle,
    };
    this.clientSQL.deleteMessage(params, (err, data) => {
      if (err) {
        console.log(`Error trying to delete message. \n ${err}`);
      } else {
        console.log(`Message ${receiptHandle} deleted successfully.`);
      }
    });
  }
}
