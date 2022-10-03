import { PRODUCTS_TABLE_NAME } from '@db/constants/table-name.constants'
import { dynamo } from '@db/tools'
import { ProductI } from '@interfaces/product.interface'

class ProductService {
  public async getProducts() {
    const products = (
      await dynamo
        .scan({
          TableName: PRODUCTS_TABLE_NAME,
        })
        .promise()
    ).Items

    return products as ProductI[]
  }

  public async getProductById(id: string) {
    const foundProduct = (
      await dynamo
        .query({
          TableName: PRODUCTS_TABLE_NAME,
          KeyConditionExpression: `id = :id`,
          ExpressionAttributeValues: { ':id': id },
        })
        .promise()
    ).Items[0]

    return foundProduct as ProductI
  }
}

export default new ProductService()
