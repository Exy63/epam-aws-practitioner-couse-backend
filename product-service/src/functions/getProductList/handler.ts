import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'

import productService from '../../product.service'

export const getProductList = async () => {
  const products = await productService.getProducts()

  return formatJSONResponse({
    products,
  })
}

export const main = middyfy(getProductList)
