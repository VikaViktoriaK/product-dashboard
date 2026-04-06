import { useParams } from "react-router-dom";
import { useProductsQuery } from "../hooks/useProducts.ts";
import { ProductDetail } from "../components/ProductDetail/ProductDetail.tsx";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const { data, isLoading, isError } = useProductsQuery({
    limit: 100,
    skip: 0,
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError) return <div className="p-4">Error loading product</div>;

  const product = data?.products.find((p) => p.id === productId);
  if (!product) return <div className="p-4">Product not found</div>;

  const similarProducts = data?.products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );

  return (
    <ProductDetail product={product} similarProducts={similarProducts || []} />
  );
};

export default ProductDetailPage;
