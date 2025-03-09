export interface CategoryType {
  id: string;
  name: string;
  imageUrl: string;
}

export interface ProductType {
  id: string;
  name: string;
  categoryId: {
    id: string,
    name: string,
  };
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string
}
