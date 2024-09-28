export type Product = {
    id: number
    category: string
    image: string
    name: string
    price: number
    oldPrice?: string
    discount?: string
    isExclusive: boolean
  }

  export type CartItem = Product & {
    quantity: number
  }

  export type ProductID = Product['id']