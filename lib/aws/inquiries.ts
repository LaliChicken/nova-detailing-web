import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { dynamo } from "@/lib/aws/clients";
import { requiredEnv } from "@/lib/env";
import type { Inquiry } from "@/types/inquiry";

export async function createInquiry(inquiry: Inquiry) {
  await dynamo.send(
    new PutCommand({
      TableName: requiredEnv("INQUIRIES_TABLE"),
      Item: inquiry,
      ConditionExpression: "attribute_not_exists(id)",
    })
  );
}
