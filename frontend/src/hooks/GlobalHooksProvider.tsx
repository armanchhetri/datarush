import { SnackbarProvider } from "notistack";
import { AuthProvider } from "./useAuth";
import { TopLoaderProvider } from "./useTopLoader";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const GlobalHooksProvider: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <TopLoaderProvider>
          <AuthProvider>{children}</AuthProvider>
        </TopLoaderProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};

export default GlobalHooksProvider;
