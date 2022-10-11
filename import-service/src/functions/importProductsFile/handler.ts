import {
  formatJSONErrorResponse,
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import schema from './schema'

const AWS = require('aws-sdk')
const s3 = new AWS.S3({ region: 'eu-west-1' })
const BUCKET = 'superstore-import'

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const { name } = event.queryStringParameters
  console.log('Lambda importProductsFile is invoked! fileName: ' + name)

  try {
    const params = {
      Bucket: BUCKET,
      Key: `uploaded/${name}.csv`,
      Expires: 60,
      ContentType: 'text/csv',
    }

    const url = await s3.getSignedUrl('putObject', params)

    return formatJSONResponse({
      result: 'Hey! You are good!',
      url,
    })
  } catch (e) {
    return formatJSONErrorResponse(e, 500)
  }
}

export const main = middyfy(importProductsFile)
