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

export type sizeWithStock = Tables<'sizes'>

export type productImage = Tables<'product_images'>

// Define the type for the `users` table
export type User = Tables<'users'>;
