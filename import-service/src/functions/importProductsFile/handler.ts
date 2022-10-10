import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'

import schema from './schema'

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  console.log(
    'Lambda importProductsFile is invoked! fileName: ' +
      event.pathParameters.name
  )

  const fileName = event.pathParameters.name

  return formatJSONResponse({
    message: `Hello and welcome to the exciting Serverless world!`,
    fileName,
  })
}

export const main = middyfy(importProductsFile)
