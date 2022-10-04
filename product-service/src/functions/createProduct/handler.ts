import {
  formatJSONErrorResponse,
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'

import schema from './schema'

import productService from '../../product.service'
import stockService from '../../stock.service'
import { ProductI } from '@interfaces/product.interface'

export const createProduct: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  try {
    console.log(
      'Lambda createProduct is invoked! Body: ' + JSON.stringify(event.body)
    )

    const count = event.body.count as number
    const product = {
      title: event.body.title,
      description: event.body?.description,
      price: event.body.price,
    } as ProductI

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
  } catch (e) {
    return formatJSONErrorResponse(e, 500)
  }
}

export const main = middyfy(createProduct)
