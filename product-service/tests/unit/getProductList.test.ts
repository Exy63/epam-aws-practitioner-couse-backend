import productService from '../../src/product.service'
import { getProductList } from '../../src/functions/getProductList/handler'

describe('Unit test for getProductList handler', function () {
  it('Checks getProductList on success', async () => {
    const actualProducts = productService.getProducts()

    const { statusCode, body } = await getProductList()
    const recievedProducts = JSON.parse(body).products

    expect(statusCode).toEqual(200)
    expect(recievedProducts).toEqual(actualProducts)
  })
})
