import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";
import { SESClient } from "@aws-sdk/client-ses";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "us-west-2";

export const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region }), {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

export const s3 = new S3Client({ region });
export const ses = new SESClient({ region });
