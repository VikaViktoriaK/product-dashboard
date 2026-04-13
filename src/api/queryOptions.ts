import { queryOptions } from "@tanstack/react-query";
import { getProductById, getProducts } from "./products";
import type { ProductsQueryParams } from "../types/product";

export const productsQueryOptions = (params: ProductsQueryParams) =>
  queryOptions({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });

export const productQueryOptions = (productId: number) =>
  queryOptions({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
  });

export const similarProductsQueryOptions = (category: string) =>
  queryOptions({
    queryKey: ["products", "similar", category],
    queryFn: () => getProducts({ category, limit: 5, skip: 0 }),
  });
