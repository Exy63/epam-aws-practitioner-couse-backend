import productService from '../../src/product.service'
import { getProductList } from '../../src/functions/getProductList/handler'

describe('Unit test for getProductList handler', function () {
  it('Checks getProductList on working', async () => {
    const actualProductList = productService.getProducts()

    const { statusCode, body } = await getProductList()
    const recievedProductList = JSON.parse(body).products

    expect(statusCode).toEqual(200)
    expect(recievedProductList).toEqual(actualProductList)
  })
})
