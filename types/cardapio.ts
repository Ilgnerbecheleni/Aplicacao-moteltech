export interface ItemCardapio {
  id: number
  product_name: string
  product_description: string
  product_category_id: number
  rate: string
  taxes: string
  quantity_number: number
  is_digital: number
  product_image: string
  recurring: number
  recurring_type: string
  custom_recurring: number
  cycles: number
}

export interface CategoriaCardapio {
  id: number
  name: string
  description?: string
}

export interface CardapioResponse {
  products: ItemCardapio[]
}
