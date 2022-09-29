import { expect, describe, it } from '@jest/globals'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { getProductById } from '../../src/functions/getProductById/handler'
import productService from '../../src/product.service'

describe('Unit test for getProductById handler', function () {
  it('Checks getProductById on success', async () => {
    const actualProduct = productService.getProducts()[0]

    const event: APIGatewayProxyEvent = {
      pathParameters: {
        id: actualProduct.id,
      },
    } as any
    const { statusCode, body } = await getProductById(event)
    const recievedProduct = JSON.parse(body).products

    expect(statusCode).toEqual(200)
    expect(actualProduct).toEqual(recievedProduct)
  })

  it('Checks getProductById on failure', async () => {
    const event: APIGatewayProxyEvent = {
      pathParameters: {
        id: 'notActualProductId',
      },
    } as any
    const { statusCode, body } = await getProductById(event)
    const errorMessage = JSON.parse(body).error

    expect(statusCode).toEqual(404)
    expect(errorMessage).toEqual(
      'Product with id notActualProductId was not found'
    )
  })
})
