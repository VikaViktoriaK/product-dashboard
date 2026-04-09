import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import type { ProductsResponse } from "../types/product";

export const useSearchProductsQuery = (search: string) => {
  return useQuery<ProductsResponse>({
    queryKey: ["products", "search", search],
    queryFn: async () => {
      const { data } = await apiClient.get<ProductsResponse>(
        "/products/search",
        { params: { q: search } },
      );
      return data;
    },
    enabled: !!search,
  });
};
