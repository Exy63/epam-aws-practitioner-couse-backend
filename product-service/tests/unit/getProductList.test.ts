import { expect, describe, it } from '@jest/globals'
import productService from '../../src/product.service'
import { getProductList } from '../../src/functions/getProductList/handler'
import stockService from '../../src/stock.service'

describe('Test for getProductList handler', function () {
  it('Checks getProductList on success', async () => {
    const [products, stocks] = await Promise.all([
      productService.getProducts(),
      stockService.getStocks(),
    ])

    const productIdList = products.map((product) => product.id)

    const filteredStocks = stocks.filter((stock) =>
      productIdList.includes(stock.product_id)
    )

    const actualProducts: any[] = []

    products.forEach((product) => {
      const { id } = product
      const stock = filteredStocks.find((el) => el.product_id === id)

      actualProducts.push({ ...product, count: stock?.count || 0 })
    })

    const { statusCode, body } = await getProductList()
    const recievedProducts = JSON.parse(body).products

    expect(statusCode).toEqual(200)
    expect(recievedProducts).toEqual(actualProducts)
  })
})
