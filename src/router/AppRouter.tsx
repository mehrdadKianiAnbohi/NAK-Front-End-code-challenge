import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import DashboardPage from "@/pages/DashboardPage";
import MainLayout from "@/components/layout/MainLayout";

const ProtectedRoutes = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" replace />;
};

const PublicRoutes = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return !isLoggedIn ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<PublicRoutes />}>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
