import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Background from "@/components/layout/Background/Background";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import Home from "@/pages/Home";
import PricingPage from "@/pages/PricingPage";
import TokenPage from "@/pages/TokenPage";
import LegalPage from "@/pages/LegalPage";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import ForgotPassword from "@/pages/auth/ForgotPassword";

// Investor area (sidebar layout + charts) loads only when visited
const DashboardApp = lazy(() => import("@/app/DashboardApp"));

// Auth screens skip the footer; the dashboard has its own header and sidebar
const AUTH_PATHS = ["/login", "/signup", "/forgot-password"];

export default function App() {
  const { pathname } = useLocation();
  const isAuth = AUTH_PATHS.includes(pathname);
  const isApp = pathname.startsWith("/dashboard");

  return (
    <>
      <ScrollToTop />
      <Background />
      {!isApp && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/token" element={<TokenPage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/terms" element={<LegalPage doc="terms" />} />
          <Route path="/privacy" element={<LegalPage doc="privacy" />} />
          <Route path="/risk" element={<LegalPage doc="risk" />} />
          <Route path="/dashboard/*" element={<Suspense fallback={null}><DashboardApp /></Suspense>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isAuth && !isApp && <Footer />}
    </>
  );
}
