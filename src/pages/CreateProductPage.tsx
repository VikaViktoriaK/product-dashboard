import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { Product, ProductsResponse } from "../types/product.ts";
import { CreateProductForm } from "../components/CreateProductForm/CreateProductForm.tsx";
import type { CreateProductFormData } from "../types/types.ts";

export const CreateProductPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation<Product, Error, CreateProductFormData>({
    mutationFn: async (data) => ({
      id: Date.now(),
      ...data,
      rating: 0,
      stock: 0,
      images: [data.thumbnail],
    }),
    onSuccess: (data) => {
      queryClient.setQueryData<ProductsResponse>(["products"], (old) => {
        if (!old) {
          return { products: [data], total: 1, skip: 0, limit: 10 };
        }
        return {
          ...old,
          products: [...old.products, data],
          total: old.total + 1,
        };
      });

      alert("Товар успешно создан");
      navigate("/products");
    },
  });

  return (
    <CreateProductForm
      onSubmit={mutation.mutate}
      isLoading={mutation.isPending}
    />
  );
};
