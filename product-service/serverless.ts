import type { AWS } from "@serverless/typescript";

import * as functions from "@functions";
import dbConfig from "@db/config";

const serverlessConfiguration: AWS = {
  service: "product-service",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "dev",
    region: "eu-west-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: "dynamodb:*",
            Resource: { "Fn::GetAtt": ["ProductsTable", "Arn"] },
          },
          {
            Effect: "Allow",
            Action: "dynamodb:*",
            Resource: { "Fn::GetAtt": ["StocksTable", "Arn"] },
          },
          {
            Effect: "Allow",
            Action: "sqs:*",
            Resource: { "Fn::GetAtt": ["CatalogItemsQueue", "Arn"] },
          },
          {
            Effect: "Allow",
            Action: "sns:*",
            Resource: { Ref: "CreateProductTopic" },
          },
        ],
      },
    },
  },
  // import the function via paths
  functions,
  resources: {
    Resources: {
      ...dbConfig,
      CatalogItemsQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "CatalogItemsQueue",
        },
      },
      CreateProductTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "CreateProductTopic",
        },
      },
      CreateProductSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "ilyaprikaz@gmail.com",
          Protocol: "email",
          TopicArn: { Ref: "CreateProductTopic" },
        },
      },
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
