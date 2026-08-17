import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";

import ProtectedRoute from "./routes/ProtectedRoute";

import DashboardLayout from "./layouts/DashboardLayout";

import DashboardHome from "./pages/DashboardHome";
import MarketPage from "./pages/MarketPage";
import PortfolioPage from "./pages/PortfolioPage";
import WatchlistPage from "./pages/WatchlistPage";
import AlertsPage from "./pages/AlertsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import NewsPage from "./pages/NewsPage";
import ProfilePage from "./pages/ProfilePage";
import AIPage from "./pages/AIPage";

import { DashboardProvider } from "./context/DashboardContext";
import useDashboard from "./hooks/useDashboard";

function DashboardRoutes() {
  const dashboard = useDashboard();

  return (
    <DashboardProvider value={dashboard}>
      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />

        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<DashboardLayout />}
          >

            <Route
              index
              element={<DashboardHome />}
            />

            <Route
              path="market"
              element={<MarketPage />}
            />

            <Route
              path="portfolio"
              element={<PortfolioPage />}
            />

            <Route
              path="watchlist"
              element={<WatchlistPage />}
            />

            <Route
              path="alerts"
              element={<AlertsPage />}
            />

            <Route
              path="analytics"
              element={<AnalyticsPage />}
            />

            <Route
              path="news"
              element={<NewsPage />}
            />

            <Route
              path="profile"
              element={<ProfilePage />}
            />

            <Route
              path="ai"
              element={<AIPage />}
            />

          </Route>

        </Route>

      </Routes>
    </DashboardProvider>
  );
}

export default DashboardRoutes;