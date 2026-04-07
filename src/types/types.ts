import type { Product } from "./product";

export type CreateProductFormData = Omit<Product, "id" | "rating" | "stock">;

export type CreateProductFormProps = {
  onSubmit: (data: CreateProductFormData) => void;
  isLoading: boolean;
};
