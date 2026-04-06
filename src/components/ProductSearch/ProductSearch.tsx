import type { Product } from "../../types/product";
import { useState, type ChangeEvent } from "react";
import { useSearchProductsQuery } from "../../hooks/useSearchProducts";
import { useDebounce } from "../../hooks/useDebouns.ts";

interface ProductSearchProps {
  onSelect: (product: Product) => void;
}

export const ProductSearch = ({ onSelect }: ProductSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const { data: searchData, isLoading: isSearchLoading } =
    useSearchProductsQuery(debouncedSearch);

  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        className="p-2 border rounded w-full"
      />

      {isOpen && debouncedSearch && (
        <div className="absolute top-full left-0 w-full bg-white border rounded shadow mt-1 z-10">
          {isSearchLoading && (
            <div className="p-2 text-gray-500">Loading...</div>
          )}

          {searchData?.products?.slice(0, 5).map((product: Product) => (
            <div
              key={product.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelect(product)}
            >
              {product.title}
            </div>
          ))}

          {!isSearchLoading && searchData?.products?.length === 0 && (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};
