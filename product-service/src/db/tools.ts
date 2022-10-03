import * as AWS from 'aws-sdk'
import { TableName } from 'aws-sdk/clients/dynamodb'
AWS.config.update({ region: 'eu-west-1' })
const dynamo = new AWS.DynamoDB.DocumentClient()

export const findAll = async (TableName: TableName) => {
  return (
    await dynamo
      .scan({
        TableName,
      })
      .promise()
  )?.Items
}

export const findByKey = async (
  options: { keyName?: string; value: any },
  TableName: TableName
) => {
  const { value } = options
  const keyName = options?.keyName || 'id'
  return (
    await dynamo
      .query({
        TableName,
        KeyConditionExpression: `${keyName} = :id`,
        ExpressionAttributeValues: { ':id': value },
      })
      .promise()
  )?.Items
}

export const insert = async (Item, TableName: TableName) => {
  return await dynamo
    .put({
      TableName,
      Item,
    })
    .promise()
}
