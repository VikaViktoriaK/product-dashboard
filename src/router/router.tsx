import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ChatPage from "../pages/ChatPage";
import { productQueryOptions, productsQueryOptions } from "../api/queryOptions";
import AppLayout from "../components/AppLayout/AppLayout.tsx";
import { ROUTE_PATHS } from "./routePaths";

const rootRoute = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: AppLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTE_PATHS.products,
  component: ProductsPage,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(
      productsQueryOptions({ limit: 30, skip: 0 }),
    ),
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTE_PATHS.productDetail,
  component: ProductDetailPage,
  loader: async ({ context, params }) => {
    const productId = Number(params.id);
    const product = await context.queryClient.ensureQueryData(
      productQueryOptions(productId),
    );
    if (product.category) {
      await context.queryClient.ensureQueryData(
        productsQueryOptions({ category: product.category, limit: 5, skip: 0 }),
      );
    }
    return null;
  },
});

const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTE_PATHS.chat,
  component: ChatPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productDetailRoute,
  chatRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <div className="loader" />,
  context: {
    queryClient: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
