import { useQuery } from "@tanstack/react-query";
import type {
  ProductsQueryParams,
  ProductsResponse,
} from "../types/product.ts";
import { getProducts } from "../api/products.ts";

export const useProductsQuery = (params: ProductsQueryParams) => {
  const { limit, skip, category, minPrice, maxPrice } = params;

  return useQuery<ProductsResponse>({
    queryKey: ["products", limit, skip, category, minPrice, maxPrice],
    queryFn: () => getProducts(params),
  });
};