import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'

const hello = async () => {
    return formatJSONResponse({
      message: `Hello and welcome to my API!`,
    })
  }

export const main = middyfy(hello)
