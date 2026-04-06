import { type FC, useState } from "react";
import type { Product } from "../../types/product";

interface ProductDetailProps {
  product: Product;
  similarProducts?: Product[];
}

interface Review {
  id: number;
  user: string;
  comment: string;
  rating: number;
}

export const ProductDetail: FC<ProductDetailProps> = ({
  product,
  similarProducts = [],
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>(product.thumbnail);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [reviews] = useState<Review[]>([
    { id: 1, user: "John Doe", comment: "Good quality product.", rating: 5 },
    { id: 2, user: "Jane Smith", comment: "Worth the price.", rating: 4 },
  ]);

  const handleAddToCart = () => alert(`Added ${quantity} item(s) to cart`);
  const handleToggleFavorite = () => setIsFavorite(!isFavorite);
  const handleQuantityChange = (delta: number) =>
    setQuantity((prev) => Math.max(1, prev + delta));

  const sortedSimilar = [...similarProducts].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price,
  );

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

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`px-4 py-2 border rounded ${
                isFavorite ? "bg-red-500 text-white" : "bg-white text-gray-700"
              }`}
            >
              {isFavorite ? "In Favorites" : "Add to Favorites"}
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

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.map((r) => (
          <div key={r.id} className="border-b py-2">
            <p className="font-semibold">{r.user}</p>
            <p className="text-gray-700">{r.comment}</p>
            <p className="text-gray-600">Rating: {r.rating}</p>
          </div>
        ))}
      </div>

      {similarProducts.length > 0 && (
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Similar Products</h2>
            <select
              className="border px-2 py-1 rounded"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sortedSimilar.map((p) => (
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
