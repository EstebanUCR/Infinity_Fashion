import { Database, Enums, Tables, TablesInsert } from '../../supabase/database.types'

export type databaseProduct = Tables<'products'>

export type productWithCategory = {
  arrival_date: string | null
  categories: {
    id: number,
    name: string
  }
  description: string | null
  discount: number | null
  id: number
  is_exclusive: boolean
  name: string
  price: number
}

export type productImage = Tables<'product_images'>