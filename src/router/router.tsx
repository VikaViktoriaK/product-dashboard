import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ChatPage from "../pages/ChatPage";
import Container from "../components/Container/Container";
import { Outlet } from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <Container>
      <Outlet />
    </Container>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: ProductsPage,
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductDetailPage,
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

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
