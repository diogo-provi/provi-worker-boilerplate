import AWS from "aws-sdk";
import "dotenv/config";

AWS.config.update({
  region: process.env.AWS_SQS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export default AWS;
