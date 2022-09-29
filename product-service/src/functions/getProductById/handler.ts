import {
  formatJSONErrorResponse,
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'

import schema from './schema'

import productService from '../../product.service'

export const getProductById: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const productId = event.pathParameters.id
  const foundProduct = productService.getProductById(productId)

  if (!foundProduct) {
    return formatJSONErrorResponse(
      `Product with id ${productId} was not found`,
      404
    )
  }

  return formatJSONResponse({
    products: foundProduct,
  })
}

export const main = middyfy(getProductById)
