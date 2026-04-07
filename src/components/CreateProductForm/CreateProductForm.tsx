import type { FC } from "react";
import type { CreateProductFormProps } from "../../types/types.ts";

export const CreateProductForm: FC<CreateProductFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = {
          title: "Test product",
          description: "Test description",
          price: 100,
          category: "test",
          brand: "test",
          thumbnail: "https://via.placeholder.com/150",
        };
        onSubmit(data);
      }}
    >
      <button disabled={isLoading}>Create</button>
    </form>
  );
};
