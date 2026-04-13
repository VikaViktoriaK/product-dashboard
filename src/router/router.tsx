import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Link,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ChatPage from "../pages/ChatPage";
import Container from "../components/Container/Container";
import { productQueryOptions, productsQueryOptions } from "../api/queryOptions";

const AppLayout = () => {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isProductsPage = pathname === "/";

  return (
    <Container className="px-4 py-4 min-h-screen">
      {!isProductsPage && (
        <div className="mb-4">
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="px-3 py-2 border rounded-lg hover:bg-gray-100 transition-colors"
          >
            ← Back to products
          </button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
        <aside className="border rounded-xl p-3 bg-white shadow-sm h-fit">
          <nav className="flex md:flex-col gap-2">
            <Link
              to="/"
              preload="intent"
              activeProps={{ className: "bg-blue-500 text-white border-blue-500" }}
              className="px-3 py-2 border rounded-lg hover:bg-gray-100 transition-colors text-sm"
            >
              Products
            </Link>
            <Link
              to="/chat"
              preload="intent"
              activeProps={{ className: "bg-blue-500 text-white border-blue-500" }}
              className="px-3 py-2 border rounded-lg hover:bg-gray-100 transition-colors text-sm"
            >
              Chat
            </Link>
          </nav>
        </aside>
        <main className="border rounded-xl p-2 md:p-4 bg-white shadow-sm">
          <Outlet />
        </main>
      </div>
    </Container>
  );
};

const rootRoute = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: () => (
    <AppLayout />
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: ProductsPage,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(productsQueryOptions({ limit: 30, skip: 0 })),
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
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
  path: "/chat",
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
