export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage?: number;
    rating: number;
    category: string;
    brand?: string;
    stock: number;
    tags?: string[];
    thumbnail: string;
    images?: string[];
}

export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface ProductsQueryParams {
    limit: number;
    skip: number;
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
}