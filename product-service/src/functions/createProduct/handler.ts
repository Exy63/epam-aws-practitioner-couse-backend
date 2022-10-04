import {
  formatJSONErrorResponse,
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'

import schema from './schema'

import productService from '../../product.service'
import stockService from '../../stock.service'

export const createProduct: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const { count, ...product } = event.body

  if (!product.title || !product.price || !count) {
    return formatJSONErrorResponse(
      "Your request isn't valid. Please fill title, price and count",
      400
    )
  }

  const productId = await productService.createProduct(product)

  await stockService.createStock({ product_id: productId, count })

  return formatJSONResponse({
    products: { id: productId, ...event.body },
  })
}

export const main = middyfy(createProduct)
