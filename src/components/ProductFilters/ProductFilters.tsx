import { type FC, useState } from "react";

interface ProductFiltersProps {
  onChange: (filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => void;
}

const categories = ["beauty", "fragrances", "furniture", "groceries"];

export const ProductFilters: FC<ProductFiltersProps> = ({ onChange }) => {
  const [category, setCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const handleApply = () => {
    if (minPrice !== "" && maxPrice !== "" && minPrice > maxPrice) {
      alert("Min price cannot be greater than max price");
      return;
    }

    onChange({
      category: category || undefined,
      minPrice: minPrice === "" ? undefined : minPrice,
      maxPrice: maxPrice === "" ? undefined : maxPrice,
    });
  };

  const handleReset = () => {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    onChange({ category: undefined, minPrice: undefined, maxPrice: undefined });
  };

  return (
    <div className="flex items-end gap-4 mb-6 flex-wrap">
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-40"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Price range</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="From"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="border p-2 rounded w-24"
            min={0}
          />
          <input
            type="number"
            placeholder="To"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="border p-2 rounded w-24"
            min={0}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleApply}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Apply
        </button>
        <button
          onClick={handleReset}
          className="border px-4 py-2 rounded hover:bg-gray-100"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
