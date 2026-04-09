import type {
  ProductsQueryParams,
  ProductsResponse,
  Product,
} from "../types/product.ts";
import { apiClient } from "./client.ts";

export const getProducts = async (
  params: ProductsQueryParams,
): Promise<ProductsResponse> => {
  let url = "/products";
  const requestParams: any = { ...params };

  if (params.search) {
    url = "/products/search";
    requestParams.q = params.search;
    delete requestParams.search;
  } else if (params.category) {
    url = `/products/category/${params.category}`;
    delete requestParams.category;
  }

  const { data } = await apiClient.get<ProductsResponse>(url, {
    params: requestParams,
  });

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    data.products = data.products.filter((p) =>
      p.title.toLowerCase().includes(searchLower),
    );
  }

  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await apiClient.get<Product>(`/products/${id}`);
  return data;
};
