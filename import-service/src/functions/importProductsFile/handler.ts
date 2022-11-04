import {
  formatJSONErrorResponse,
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
  console.log('Lambda importProductsFile is invoked! File name: ' + name)

  try {
    const params = {
      Bucket: BUCKET,
      Key: `uploaded/${name}`,
      Expires: 60 * 2, // 2 minutes
      ContentType: 'text/csv',
    }

    const url = await s3.getSignedUrl('putObject', params)

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": '*',
      },
      body: url,
    };
  } catch (e) {
    return formatJSONErrorResponse(e, 500)
  }
}

export const main = middyfy(importProductsFile)
