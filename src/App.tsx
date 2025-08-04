import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRouter from "@/router/AppRouter";
import GlobalStyles from "@/styles/GlobalStyles";
import { useInitializeAuth } from "@/store/authStore";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
function App() {
  useNetworkStatus();
  useInitializeAuth();
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Toaster position="bottom-right" />
      <AppRouter />
    </BrowserRouter>
  );
}
export default App;
