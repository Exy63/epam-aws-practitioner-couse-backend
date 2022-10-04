import { v4 } from 'uuid'
import {
  PRODUCTS_TABLE_NAME,
  STOCKS_TABLE_NAME,
} from '@db/constants/table-name.constants'
import { dynamo } from '@db/tools'
import { ProductI } from '@interfaces/product.interface'

const initProducts: ProductI[] = [
  {
    id: v4(),
    title: 'Pen',
    description: 'Nice automatic pen. Best quality.',
    price: 2,
  },
  {
    id: v4(),
    title: 'Pencil',
    description: 'Black 2B pencil. Best thing for scratching.',
    price: 1,
  },
  {
    id: v4(),
    title: 'Book',
    description: 'Very intelligent book. Makes people smarter.',
    price: 5,
  },
]

initProducts.forEach(async (product) => {
  const count = Math.floor(Math.random() * 10) + 1
  await Promise.all([
    dynamo
      .put({
        TableName: PRODUCTS_TABLE_NAME,
        Item: { ...product },
      })
      .promise(),
    dynamo
      .put({
        TableName: STOCKS_TABLE_NAME,
        Item: { product_id: product.id, count },
      })
      .promise(),
  ])
})
