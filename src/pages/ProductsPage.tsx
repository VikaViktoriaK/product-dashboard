import { useProductsQuery } from "../hooks/useProducts.ts";
import type { ProductsQueryParams } from "../types/product.ts";

const ProductsPage = () => {
  const params: ProductsQueryParams = {
    limit: 10,
    skip: 0,
  };

  const { data, isLoading, isError } = useProductsQuery(params);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3">Image</th>
            <th className="text-left p-3">Title</th>
            <th className="text-left p-3">Price</th>
          </tr>
        </thead>

        <tbody>
          {data?.products.map((product) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
