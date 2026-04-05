import { useQuery } from "@tanstack/react-query";
import type {ProductsQueryParams, ProductsResponse} from "../types/product.ts";
import {getProducts} from "../api/products.ts";

export const useProductsQuery = (params: ProductsQueryParams) => {
    return useQuery<ProductsResponse>({
        queryKey: ["products", params],
        queryFn: () => getProducts(params),
    });
};