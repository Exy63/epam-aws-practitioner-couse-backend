import { STOCKS_TABLE_NAME } from '@db/constants/table-name.constants'
import { dynamo } from '@db/tools'
import { StockI } from '@interfaces/stock.interface'

class StockService {
  public async getStockByProductId(id: string) {
    const foundStock = (
      await dynamo
        .query({
          TableName: STOCKS_TABLE_NAME,
          KeyConditionExpression: `product_id = :id`,
          ExpressionAttributeValues: { ':id': id },
        })
        .promise()
    ).Items[0]

    return foundStock as StockI
  }
}

export default new StockService()
