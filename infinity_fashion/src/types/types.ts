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
  name: string;
  email: string;
  phone?: string | null;
  password: string | null;
  shipping_address?: string | null;
  billing_address?: string | null;
  profile_picture?: string | null;
}

export type CartItem = Product & {
  quantity: number
}

export type ProductID = Product['id']