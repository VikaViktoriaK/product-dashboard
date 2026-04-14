import { createFileRoute } from "@tanstack/react-router";
import ProductsPage from "../pages/ProductsPage";
import { productsQueryOptions } from "../api/queryOptions";

export const Route = createFileRoute("/")({
  component: ProductsPage,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(
      productsQueryOptions({ limit: 30, skip: 0 }),
    ),
});
