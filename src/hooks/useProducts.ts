import { useQuery } from "@tanstack/react-query";
import type { ProductsQueryParams } from "../types/product";
import { productsQueryOptions } from "../api/queryOptions";

export const useProductsQuery = (params: ProductsQueryParams) => {
  return useQuery({
    ...productsQueryOptions(params),
    select: (data) => {
      let filtered = data.products;

      if (params.category) {
        filtered = filtered.filter((p) => p.category === params.category);
      }

      const minPrice = params.minPrice;
      if (minPrice != null) {
        filtered = filtered.filter((p) => p.price >= minPrice);
      }

      const maxPrice = params.maxPrice;
      if (maxPrice != null) {
        filtered = filtered.filter((p) => p.price <= maxPrice);
      }

      return { ...data, products: filtered, total: filtered.length };
    },
  });
};
