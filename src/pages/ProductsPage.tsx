import { useState } from "react";
import type { ProductsQueryParams } from "../types/product";
import { ProductFilters } from "../components/ProductFilters/ProductFilters";
import { useProductsQuery } from "../hooks/useProducts.ts";

const ProductsPage = () => {
  const [filters, setFilters] = useState<Partial<ProductsQueryParams>>({});
  const [skip, setSkip] = useState(0);
  const limit = 10;

  const params: ProductsQueryParams = { ...filters, skip, limit };
  const { data, isLoading, isError } = useProductsQuery(params);

  const handleApplyFilters = (newFilters: Partial<ProductsQueryParams>) => {
    setFilters(newFilters);
    setSkip(0);
  };

  const handlePrev = () => setSkip((prev) => Math.max(prev - limit, 0));
  const handleNext = () =>
    setSkip((prev) =>
      prev + limit < (data?.total || 0) ? prev + limit : prev,
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <ProductFilters onChange={handleApplyFilters} />

      {isLoading && <div className="loader"></div>}
      {isError && <div>Error</div>}
      {!isLoading && data?.products.length === 0 && (
        <div>No products found</div>
      )}

      {data && data.products.length > 0 && (
        <>
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

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrev}
              disabled={skip === 0}
              className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              Prev
            </button>

            <span>
              {skip + 1} - {Math.min(skip + limit, data.total)} of {data.total}
            </span>

            <button
              onClick={handleNext}
              disabled={skip + limit >= data.total}
              className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
