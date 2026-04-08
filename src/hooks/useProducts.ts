import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client.ts";
import type { ProductsQueryParams, ProductsResponse } from "../types/product";

export const useProductsQuery = (params: ProductsQueryParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async (): Promise<ProductsResponse> => {
      const { data } = await apiClient.get<ProductsResponse>("/products");
      return data;
    },
    select: (data) => {
      let filtered = data.products;

      if (params.category) {
        filtered = filtered.filter((p) => p.category === params.category);
      }

      const minPrice = params.minPrice;
      if (minPrice != null) {
        // undefined или null
        filtered = filtered.filter((p) => p.price >= minPrice);
      }

      const maxPrice = params.maxPrice;
      if (maxPrice != null) {
        filtered = filtered.filter((p) => p.price <= maxPrice);
      }

      const total = filtered.length;
      const start = params.skip ?? 0;
      const end = start + (params.limit ?? 10);
      const paginated = filtered.slice(start, end);

      return { ...data, products: paginated, total };
    },
  });
};
