import {
  Link,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import Container from "../Container/Container";

const AppLayout = () => {
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
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
              className="px-3 py-2 border rounded-lg hover:bg-blue-600 transition-colors text-sm"
              activeProps={{
                className: "bg-blue-500 text-white border-blue-500",
              }}
            >
              Products
            </Link>

            <Link
              to="/chat"
              preload="intent"
              className="px-3 py-2 border rounded-lg hover:bg-blue-600 transition-colors text-sm"
              activeProps={{
                className: "bg-blue-500 text-white border-blue-500",
              }}
            >
              Chat
            </Link>
          </nav>
        </aside>

        <main>
          <Outlet />
        </main>
      </div>
    </Container>
  );
};

export default AppLayout;
