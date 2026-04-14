import { createFileRoute } from "@tanstack/react-router";
import ProductDetailPage from "../pages/ProductDetailPage";
import {
  productQueryOptions,
  similarProductsQueryOptions,
} from "../api/queryOptions";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetailPage,
  loader: async ({ context, params }) => {
    const productId = Number(params.id);
    const product = await context.queryClient.ensureQueryData(
      productQueryOptions(productId),
    );

    if (product.category) {
      await context.queryClient.ensureQueryData(
        similarProductsQueryOptions(product.category),
      );
    }

    return null;
  },
});
