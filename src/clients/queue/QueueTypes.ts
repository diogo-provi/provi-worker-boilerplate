export type QueueParams = {
  queueUrl: string;
  maxNumberOfMessages?: number;
  visibilityTimeout?: number;
  waitTimeSeconds?: number;
};
