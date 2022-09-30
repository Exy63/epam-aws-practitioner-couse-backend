import * as AWS from 'aws-sdk'
import { TableName } from 'aws-sdk/clients/dynamodb'
AWS.config.update({ region: 'eu-west-1' })
const dynamo = new AWS.DynamoDB.DocumentClient()

export const findAll = async (TableName: TableName) => {
  return await dynamo
    .scan({
      TableName,
    })
    .promise()
}

export const findById = async (id: string, TableName: TableName) => {
  return await dynamo
    .query({
      TableName,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: { ':id': id },
    })
    .promise()
}

export const insert = async (Item, TableName: TableName) => {
  return await dynamo
    .put({
      TableName,
      Item,
    })
    .promise()
}
