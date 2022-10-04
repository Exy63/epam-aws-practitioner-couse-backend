import { formatJSONErrorResponse, formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'

const hello = async () => {
  try {
    console.log('Lambda hello is invoked! No arguments needed.')

    return formatJSONResponse({
      message: `Hello and welcome to my API!`,
      endpoints: {
        'GET - /products': 'Gives you a full array of products',
        'GET - /products/${id}':
          'Gives you one searched product from an array of products',
        'POST - /products':
          'Creates a new product. Required properties {"title": string, "price": number, "count": number}',
      },
    })
  } catch (e) {
    return formatJSONErrorResponse(e, 500)
  }
}

export const main = middyfy(hello)
