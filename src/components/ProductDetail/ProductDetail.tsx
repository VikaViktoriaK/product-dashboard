import { type FC, useState } from "react";
import type { Product } from "../../types/product";

interface ProductDetailProps {
  product: Product;
  similarProducts?: Product[];
}

export const ProductDetail: FC<ProductDetailProps> = ({
  product,
  similarProducts = [],
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>(product.thumbnail);

  const handleQuantityChange = (delta: number) =>
    setQuantity((prev) => Math.max(1, prev + delta));

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-auto rounded-lg border"
          />
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {[product.thumbnail, ...(product.images || [])].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.title}-${idx}`}
                className={`w-20 h-20 object-cover rounded border-2 cursor-pointer ${
                  selectedImage === img ? "border-blue-500" : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-700">{product.description}</p>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage && (
              <span className="text-red-500 line-through">
                $
                {(
                  product.price *
                  (1 + product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
            )}
          </div>

          <div className="text-gray-700">
            Rating: {product.rating.toFixed(1)}
          </div>

          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-3 py-1 border rounded hover:bg-gray-100"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="px-3 py-1 border rounded hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <table className="mt-6 w-full border border-gray-200 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2 border">Feature</th>
                <th className="text-left p-2 border">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border p-2">Category</td>
                <td className="border p-2">{product.category}</td>
              </tr>
              {product.brand && (
                <tr className="hover:bg-gray-50">
                  <td className="border p-2">Brand</td>
                  <td className="border p-2">{product.brand}</td>
                </tr>
              )}
              <tr className="hover:bg-gray-50">
                <td className="border p-2">Stock</td>
                <td className="border p-2">{product.stock}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {similarProducts.map((p) => (
              <div
                key={p.id}
                className="border rounded p-4 hover:shadow-lg transition"
              >
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-gray-700">${p.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
