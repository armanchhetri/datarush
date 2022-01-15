import { SnackbarProvider } from "notistack";
import { AuthProvider } from "./useAuth";
import { TopLoaderProvider } from "./useTopLoader";

const GlobalHooksProvider: React.FC = ({ children }) => {
  return (
    <SnackbarProvider>
      <TopLoaderProvider>
        <AuthProvider>{children}</AuthProvider>
      </TopLoaderProvider>
    </SnackbarProvider>
  );
};

export default GlobalHooksProvider;
