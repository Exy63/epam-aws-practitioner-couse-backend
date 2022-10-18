import {
  formatJSONErrorResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import schema from './schema'

const importFileParser: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  console.log('Lambda importFileParser is invoked!', event)

  try {
    return {
      statusCode: 200,
      body: 'Hello from importFileParser!',
    }
  } catch (e) {
    return formatJSONErrorResponse(e, 500)
  }
}

export const main = middyfy(importFileParser)
