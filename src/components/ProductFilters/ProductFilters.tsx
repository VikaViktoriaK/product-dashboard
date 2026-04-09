import { type FC, useState, useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/products";
import { useDebounce } from "../../hooks/useDebounce";

interface ProductFiltersProps {
  onChange: (filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => void;
}

const categories = ["beauty", "fragrances", "furniture", "groceries"];

export const ProductFilters: FC<ProductFiltersProps> = ({ onChange }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [category, setCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const [searchTerm, setSearchTerm] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 400);

  const { data: suggestions, isLoading: isSearching } = useQuery({
    queryKey: ["products-search", debouncedSearch],
    queryFn: () => getProducts({ search: debouncedSearch, limit: 5 }),
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    setSearchTerm("");
    onChange({ category: undefined, minPrice: undefined, maxPrice: undefined });
  };

  return (
    <div className="flex items-end gap-4 mb-6 flex-wrap w-full relative">
      <div
        className="flex flex-col flex-1 min-w-[250px] relative"
        ref={dropdownRef}
      >
        <label className="text-sm font-medium mb-1">Search Products</label>
        <div className="relative">
          <input
            type="text"
            placeholder="Product name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsSuggestionsOpen(true);
            }}
            onFocus={() => setIsSuggestionsOpen(true)}
            className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {isSearching && (
            <div className="absolute right-3 top-2.5 animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          )}
        </div>

        {isSuggestionsOpen && debouncedSearch.trim().length > 1 && (
          <div className="absolute top-full left-0 right-0 bg-white border rounded-b shadow-xl z-50 mt-1 max-h-60 overflow-y-auto">
            {isSearching && (
              <div className="p-4 text-sm text-gray-500 text-center">
                Searching...
              </div>
            )}

            {!isSearching &&
              suggestions?.products &&
              suggestions.products.length > 0 &&
              suggestions.products.map((product) => (
                <button
                  key={product.id}
                  className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 border-b last:border-none text-left"
                  onClick={() => {
                    navigate({
                      to: "/product/$id",
                      params: { id: String(product.id) },
                    });
                    setIsSuggestionsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  <img
                    src={product.thumbnail}
                    alt=""
                    className="w-10 h-10 object-cover rounded bg-gray-50"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium truncate">
                      {product.title}
                    </span>
                    <span className="text-xs text-blue-600">
                      ${product.price}
                    </span>
                  </div>
                </button>
              ))}

            {!isSearching &&
              suggestions?.products &&
              suggestions.products.length === 0 && (
                <div className="p-4 text-sm text-gray-500 text-center">
                  No products found
                </div>
              )}
          </div>
        )}
      </div>

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

      <div className="ml-auto">
        <button
          onClick={() => navigate({ to: "/chat" })}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Customer Chat
        </button>
      </div>
    </div>
  );
};
