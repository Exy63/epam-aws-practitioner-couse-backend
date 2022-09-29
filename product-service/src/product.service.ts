import { ProductI } from './interfaces/product.interface'

class ProductService {
  private products: ProductI[] = [
    {
      uuid: '0dff3aa9-8ea9-4098-9ce0-921771c9d167',
      productName: 'Pen',
      price: 2,
    },
    {
      uuid: '49644adf-56eb-4d50-b214-a5cc233510c5',
      productName: 'Pencil',
      price: 1,
    },
    {
      uuid: '8f260efa-a54e-4522-903d-16b0686c2d34',
      productName: 'Book',
      price: 5,
    },
  ]

  public getProducts(): ProductI[] {
    const products = this.products
    return products
  }

  public getProductById(id: string): ProductI | undefined {
    const foundProduct = this.products.find((product) => product.uuid === id)
    return foundProduct
  }
}

export default new ProductService()
