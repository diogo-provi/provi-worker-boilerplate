import { QueueConfigurations } from "../clients/queue/QueueTypes";
import "dotenv/config";

const getQueueUrl = (): string => {
  const { AWS_ACCOUNT_ID, AWS_QUEUE_NAME, AWS_SQL_BASE_PATH } = process.env;
  if (!AWS_ACCOUNT_ID || !AWS_QUEUE_NAME || !AWS_SQL_BASE_PATH)
    throw new Error("Queue configurations not found");
  return `${AWS_SQL_BASE_PATH}/${AWS_ACCOUNT_ID}/${AWS_QUEUE_NAME}`;
};

export default getQueueUrl;
