import { formatJSONErrorResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { APIGatewayProxyEvent } from 'aws-lambda'

interface CatalogBatchProcessEventI extends APIGatewayProxyEvent {
  Records: {
    body: string
  }[]
}

interface ParsedBody {
  price: number
  count: number
  description?: string
  title: string
}

const catalogBatchProcess = async (event: CatalogBatchProcessEventI) => {
  console.log('Lambda catalogBatchProcess is invoked! Event: ', event)
  try {
    const validatedProducts = event.Records.map(({ body }) => {
      const parsedBody: ParsedBody = JSON.parse(body)
      if (
        parsedBody.price > 0 &&
        parsedBody.count > 0 &&
        parsedBody.title.length > 0
      ) {
        return parsedBody
      }
    })
    console.log("🚀 ~  validatedProducts", validatedProducts)

    // validatedProducts.forEach(async (product) => {
    //   const { count, ...productInfo } = product
    //   console.log("🚀 ~ file: handler.ts ~ line 37 ~ validatedProducts.forEach ~ productInfo", productInfo)

    //   const productId = await productService.createProduct(productInfo)
    //   console.log("🚀 ~ file: handler.ts ~ line 39 ~ validatedProducts.forEach ~ productId", productId)
    // })
  } catch (e) {
    return formatJSONErrorResponse(e, 500)
  }
}

export const main = middyfy(catalogBatchProcess)
