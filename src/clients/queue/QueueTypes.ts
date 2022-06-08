export type QueueConfigurations = {
  queueUrl: string;
};

export type QueueConsumerParams = QueueConfigurations & {
  chunkSize?: number;
};

export type QueueProducerParams = QueueConfigurations & {
  messageBody: object;
  messageGroupId: string;
  messageDeduplicationId?: string;
};
