import { useProductsQuery } from "../hooks/useProducts";
import type { ProductsQueryParams, Product } from "../types/product";
import { ProductSearch } from "../components/ProductSearch/ProductSearch.tsx";

const ProductsPage = () => {
  const params: ProductsQueryParams = {
    limit: 10,
    skip: 0,
  };

  const { data, isLoading, isError } = useProductsQuery(params);

  const handleSelectProduct = (product: Product) => {
    console.log("Selected product:", product);
  };

  if (isLoading) return <div className="loader"></div>;
  if (isError) return <div>Error</div>;
  if (!data || data.products.length === 0)
    return <div className="p-4">No products found</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <ProductSearch onSelect={handleSelectProduct} />

      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3">Image</th>
            <th className="text-left p-3">Title</th>
            <th className="text-left p-3">Price</th>
            <th className="text-left p-3">Rating</th>
            <th className="text-left p-3">Category</th>
            <th className="text-left p-3">Stock</th>
            <th className="text-left p-3">Details</th>
          </tr>
        </thead>

        <tbody>
          {data.products.map((product) => (
            <tr key={product.id} className="border-t hover:bg-gray-50">
              <td className="p-3">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-12 h-12 object-cover rounded"
                />
              </td>
              <td className="p-3">{product.title}</td>
              <td className="p-3 font-medium">${product.price}</td>
              <td className="p-3">{product.rating}</td>
              <td className="p-3">{product.category}</td>
              <td className="p-3">{product.stock}</td>
              <td className="p-3">
                <button className="text-blue-500 hover:underline">
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
