import ProductsPage from "./pages/ProductsPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Container from "./components/Container/Container.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <ProductsPage />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
