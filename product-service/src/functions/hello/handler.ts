import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'

const hello = async () => {
  return formatJSONResponse({
    message: `Hello and welcome to my API!`,
    endpoints: {
      'GET - /products': 'Gives you a full array of products',
      'GET - /products/${id}':
        'Gives you one searched product from an array of products',
    },
  })
}

export const main = middyfy(hello)
