import {
  formatJSONErrorResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import schema from './schema'


const catalogBatchProcess: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  console.log('Lambda catalogBatchProcess is invoked! File name: ' + event)

  try {
  } catch (e) {
    return formatJSONErrorResponse(e, 500)
  }
}

export const main = middyfy(catalogBatchProcess)
