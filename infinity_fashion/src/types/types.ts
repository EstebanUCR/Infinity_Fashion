export type Product = {
    id: number
    category: string
    image: string[]
    name: string
    price: number
    oldPrice?: string
    discount?: string
    isExclusive: boolean
    description?: string
  }

  export type userData = {
    name: string
    email: string
    password: string | null
  }
  
  export type CartItem = Product & {
    quantity: number
  }

  export type ProductID = Product['id']