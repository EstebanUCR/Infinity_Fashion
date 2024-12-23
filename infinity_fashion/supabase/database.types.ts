export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cart_items: {
        Row: {
          id: number
          product_id: number | null
          quantity: number | null
          shopping_cart_id: number | null
          size: string | null
          subtotal: number | null
        }
        Insert: {
          id?: number
          product_id?: number | null
          quantity?: number | null
          shopping_cart_id?: number | null
          size?: string | null
          subtotal?: number | null
        }
        Update: {
          id?: number
          product_id?: number | null
          quantity?: number | null
          shopping_cart_id?: number | null
          size?: string | null
          subtotal?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_shopping_cart_id_fkey"
            columns: ["shopping_cart_id"]
            isOneToOne: false
            referencedRelation: "shopping_carts"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          description: string | null
          id: number
          name: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      product_images: {
        Row: {
          id: number
          image_data: string
          product_id: number
        }
        Insert: {
          id?: number
          image_data: string
          product_id: number
        }
        Update: {
          id?: number
          image_data?: string
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          arrival_date: string | null
          category_id: number
          description: string | null
          discount: number | null
          id: number
          is_exclusive: boolean
          name: string
          price: number
        }
        Insert: {
          arrival_date?: string | null
          category_id: number
          description?: string | null
          discount?: number | null
          id?: number
          is_exclusive: boolean
          name: string
          price: number
        }
        Update: {
          arrival_date?: string | null
          category_id?: number
          description?: string | null
          discount?: number | null
          id?: number
          is_exclusive?: boolean
          name?: string
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_histories: {
        Row: {
          id: number
          purchase_date: string | null
          shipping_id: number | null
          shopping_cart_id: number | null
          total: number | null
          user_id: string
        }
        Insert: {
          id?: number
          purchase_date?: string | null
          shipping_id?: number | null
          shopping_cart_id?: number | null
          total?: number | null
          user_id: string
        }
        Update: {
          id?: number
          purchase_date?: string | null
          shipping_id?: number | null
          shopping_cart_id?: number | null
          total?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_histories_shipping_id_fkey"
            columns: ["shipping_id"]
            isOneToOne: false
            referencedRelation: "shipping_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_histories_shopping_cart_id_fkey"
            columns: ["shopping_cart_id"]
            isOneToOne: false
            referencedRelation: "shopping_carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_histories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      shipping_options: {
        Row: {
          description: string | null
          id: number
          name: string | null
          price: number | null
        }
        Insert: {
          description?: string | null
          id?: number
          name?: string | null
          price?: number | null
        }
        Update: {
          description?: string | null
          id?: number
          name?: string | null
          price?: number | null
        }
        Relationships: []
      }
      shopping_carts: {
        Row: {
          added_date: string | null
          id: number
          user_id: string
        }
        Insert: {
          added_date?: string | null
          id?: number
          user_id: string
        }
        Update: {
          added_date?: string | null
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shopping_carts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sizes: {
        Row: {
          id: number
          name: string | null
          products_id: number | null
          stock: number | null
        }
        Insert: {
          id?: number
          name?: string | null
          products_id?: number | null
          stock?: number | null
        }
        Update: {
          id?: number
          name?: string | null
          products_id?: number | null
          stock?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sizes_products_id_fkey"
            columns: ["products_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      tokens: {
        Row: {
          created_at: string | null
          expires_at: string
          id: number
          token: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: number
          token: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: number
          token?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          billing_address: string | null
          creation_date: string | null
          email: string
          id: string
          last_name: string | null
          name: string | null
          password_hash: string
          phone: string | null
          profile_picture: string | null
          shipping_address: string | null
        }
        Insert: {
          billing_address?: string | null
          creation_date?: string | null
          email: string
          id: string
          last_name?: string | null
          name?: string | null
          password_hash: string
          phone?: string | null
          profile_picture?: string | null
          shipping_address?: string | null
        }
        Update: {
          billing_address?: string | null
          creation_date?: string | null
          email?: string
          id?: string
          last_name?: string | null
          name?: string | null
          password_hash?: string
          phone?: string | null
          profile_picture?: string | null
          shipping_address?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
