import type { AWS } from '@serverless/typescript'

import * as functions from '@functions'
import dbConfig from '@db/config'

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'dynamodb:Scan',
        Resource: { 'Fn::GetAtt': ['ProductsTable', 'Arn'] },
      },
      {
        Effect: 'Allow',
        Action: 'dynamodb:Query',
        Resource: { 'Fn::GetAtt': ['ProductsTable', 'Arn'] },
      },
      {
        Effect: 'Allow',
        Action: 'dynamodb:Scan',
        Resource: { 'Fn::GetAtt': ['StocksTable', 'Arn'] },
      },
      {
        Effect: 'Allow',
        Action: 'dynamodb:Query',
        Resource: { 'Fn::GetAtt': ['StocksTable', 'Arn'] },
      },
    ],
  },
  // import the function via paths
  functions,
  resources: {
    Resources: dbConfig,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
}

module.exports = serverlessConfiguration
