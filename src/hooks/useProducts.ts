// src/hooks/useProductsQuery.ts
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client.ts";
import type { ProductsQueryParams, ProductsResponse } from "../types/product";

export const useProductsQuery = (params: ProductsQueryParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async (): Promise<ProductsResponse> => {
      // Получаем все продукты, чтобы фильтровать на фронте
      const { data } = await apiClient.get<ProductsResponse>("/products");
      return data;
    },
    select: (data) => {
      let filtered = data.products;

      // фильтр по категории
      if (params.category) {
        filtered = filtered.filter((p) => p.category === params.category);
      }

      // Фильтр по минимальной цене
      const minPrice = params.minPrice;
      if (minPrice !== undefined) {
        filtered = filtered.filter((p) => p.price >= minPrice);
      }

      // Фильтр по максимальной цене
      const maxPrice = params.maxPrice;
      if (maxPrice !== undefined) {
        filtered = filtered.filter((p) => p.price <= maxPrice);
      }

      const total = filtered.length;
      const start = params.skip;
      const end = params.skip + params.limit;
      const paginated = filtered.slice(start, end);

      return { ...data, products: paginated, total };
    },
  });
};
