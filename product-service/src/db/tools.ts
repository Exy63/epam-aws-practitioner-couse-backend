import * as AWS from 'aws-sdk'
import { TableName } from 'aws-sdk/clients/dynamodb'
AWS.config.update({ region: 'eu-west-1' })
const dynamo = new AWS.DynamoDB.DocumentClient()

export const scan = async (TableName: TableName) => {
  return await dynamo
    .scan({
      TableName,
    })
    .promise()
}

export const put = async (Item, TableName: TableName) => {
  return await dynamo
    .put({
      TableName,
      Item,
    })
    .promise()
}
