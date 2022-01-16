import { SnackbarProvider } from "notistack";
import { TopLoaderProvider } from "./useTopLoader";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const GlobalHooksProvider: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <TopLoaderProvider>{children}</TopLoaderProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};

export default GlobalHooksProvider;
