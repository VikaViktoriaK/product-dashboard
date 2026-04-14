import { queryOptions } from "@tanstack/react-query";
import { getProductById, getProducts } from "./products";
import type { ProductsQueryParams } from "../types/product";

const STALE_TIME_MS = 60_000;

export const productsQueryOptions = (params: ProductsQueryParams) =>
  queryOptions({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    staleTime: STALE_TIME_MS,
  });

export const productQueryOptions = (productId: number) =>
  queryOptions({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    staleTime: STALE_TIME_MS,
  });

export const similarProductsQueryOptions = (category: string) =>
  queryOptions({
    queryKey: ["products", "similar", category],
    queryFn: () => getProducts({ category, limit: 5, skip: 0 }),
    staleTime: STALE_TIME_MS,
  });
