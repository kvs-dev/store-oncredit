export interface Product {
  id?: number;
  title: string;
  price: number;
  description?: string;
  category: Category;
  image?: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface CreateProductDto {
  title: string;
  price: number;
  description?: string;
  categoryId: number;
  image?: string;
}

export enum ProductCategory {
  ELECTRONICS = 'Electronics',
  CLOTHING = 'Clothing',
  FOOD = 'Food',
  BOOKS = 'Books',
  OTHER = 'Other'
} 