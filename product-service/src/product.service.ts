import { ProductI } from './interfaces/product.interface'
import { v4 } from 'uuid'

class ProductService {
  private products: ProductI[] = [
    {
      id: '0dff3aa9-8ea9-4098-9ce0-921771c9d167',
      productName: 'Pen',
      price: 2,
    },
    {
      id: '49644adf-56eb-4d50-b214-a5cc233510c5',
      productName: 'Pencil',
      price: 1,
    },
    {
      id: '8f260efa-a54e-4522-903d-16b0686c2d34',
      productName: 'Book',
      price: 5,
    },
  ]

  public getProducts(): ProductI[] {
    const products = this.products
    return products
  }

  public getProductById(id: string): ProductI | undefined {
    const foundProduct = this.products.find((product) => product.id === id)
    return foundProduct
  }

  public createProduct(product: Omit<ProductI, 'id'>): ProductI {
    const id = v4()

    const newRecord = { ...product, id }

    this.products.push(newRecord)

    return newRecord
  }
}

export default new ProductService()
