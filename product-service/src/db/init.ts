import { v4 } from 'uuid'
import {
  PRODUCTS_TABLE_NAME,
  STOCKS_TABLE_NAME,
} from '@db/constants/table-name.constants'
import { put } from '@db/tools'
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

initProducts.forEach((product) => {
  put(product, PRODUCTS_TABLE_NAME)

  const count = Math.floor(Math.random() * 10) + 1

  put({ id: v4(), product_id: product.id, count }, STOCKS_TABLE_NAME)
})
