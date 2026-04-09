import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getProductById, getProducts } from "../api/products";
import type { Product } from "../types/product";
import ProductDetail from "../components/ProductDetail/ProductDetail.tsx";

const ProductDetailPage = () => {
  const { id } = useParams({ from: "/product/$id" });
  const productId = Number(id);

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
  });

  const { data: similarData, isLoading: isSimilarLoading } = useQuery({
    queryKey: ["products", "similar", product?.category],
    queryFn: () =>
      getProducts({ category: product?.category, limit: 5, skip: 0 }),
    enabled: !!product?.category,
  });

  if (isProductLoading)
    return <div className="p-4 flex justify-center">Loading...</div>;
  if (isProductError || !product)
    return <div className="p-4 text-red-500">Product not found</div>;

  const similarProducts =
    similarData?.products.filter((p: Product) => p.id !== product.id) || [];

  return (
    <ProductDetail
      product={product}
      similarProducts={similarProducts}
      isLoadingSimilar={isSimilarLoading}
    />
  );
};

export default ProductDetailPage;
