import { formatJSONErrorResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent } from "aws-lambda";
import { v4 } from "uuid";
import { dynamo } from "@db/tools";
import {
  PRODUCTS_TABLE_NAME,
  STOCKS_TABLE_NAME,
} from "@db/constants/table-name.constants";
import * as AWS from "aws-sdk";

interface CatalogBatchProcessEventI extends APIGatewayProxyEvent {
  Records: {
    body: string;
  }[];
}

interface ParsedBody {
  price: number;
  count: number;
  description?: string;
  title: string;
}

const catalogBatchProcess = async (event: CatalogBatchProcessEventI) => {
  console.log("Lambda catalogBatchProcess is invoked! Event: ", event);
  const sns = new AWS.SNS({ region: "eu-west-1" });
  const promises = [];

  try {
    const validatedProducts = event.Records.map(({ body }) => {
      const parsedBody: ParsedBody = JSON.parse(body);

      const isRequestValid =
        parsedBody.price > 0 &&
        parsedBody.count > 0 &&
        parsedBody.title.length > 0;

      if (isRequestValid) {
        return parsedBody;
      }
    });
    console.log("🚀 ~  validatedProducts", validatedProducts);

    validatedProducts.forEach(async (product) => {
      const { count, ...productInfo } = product;

      const id = v4();

      const productPromise = dynamo
        .put({
          TableName: PRODUCTS_TABLE_NAME,
          Item: { ...productInfo, id },
        })
        .promise();

      const stockPromise = dynamo
        .put({
          TableName: STOCKS_TABLE_NAME,
          Item: { product_id: id, count },
        })
        .promise();

      promises.push(productPromise);
      promises.push(stockPromise);
    });

    await Promise.all(promises);

    const processedMessages = validatedProducts
      .map((product) => JSON.stringify(product))
      .join(" ");

    await sns
      .publish(
        {
          Subject: "New Products Has Been Processed!",
          Message: processedMessages,
          TopicArn: process.env.CREATE_PRODUCT_TOPIC_ARN,
        },
        () => {
          console.log("Email has been successfully sent");
        }
      )
      .promise();
  } catch (e) {
    return formatJSONErrorResponse(e, 500);
  }
};

export const main = middyfy(catalogBatchProcess);
