import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/product";
import ProductDetail from "../components/ProductDetail/ProductDetail.tsx";
import {
  productQueryOptions,
  similarProductsQueryOptions,
} from "../api/queryOptions";
const ProductDetailPage = () => {
  const { id } = useParams({ from: "/product/$id" });
  const productId = Number(id);

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useQuery({
    ...productQueryOptions(productId),
  });

  const { data: similarData, isLoading: isSimilarLoading } = useQuery({
    ...similarProductsQueryOptions(product?.category ?? ""),
    enabled: !!product?.category,
  });

  if (isProductLoading) return <div className="loader"></div>;
  if (isProductError || !product)
    return <div className="p-4 text-red-500">Product not found</div>;

  const similarProducts =
    similarData?.products.filter((p: Product) => p.id !== product.id) || [];

  return (
    <ProductDetail
      key={product.id}
      product={product}
      similarProducts={similarProducts}
      isLoadingSimilar={isSimilarLoading}
    />
  );
};

export default ProductDetailPage;
