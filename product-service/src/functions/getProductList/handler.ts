import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'

import productService from '../../product.service'

const getProductList = async () => {
  const productList = productService.getProducts()

  return formatJSONResponse({
    products: productList,
  })
}

export const main = middyfy(getProductList)
