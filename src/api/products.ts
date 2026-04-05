import type {ProductsQueryParams, ProductsResponse} from "../types/product.ts";
import {apiClient} from "./client.ts";

export const getProducts = async (params: ProductsQueryParams): Promise<ProductsResponse> => {
    const { data } = await apiClient.get<ProductsResponse>("/products", { params });
    return data;
};