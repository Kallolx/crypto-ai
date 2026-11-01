import { Routes, Route, useLocation } from "react-router-dom";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Background from "@/components/layout/Background/Background";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import Cursor from "@/components/ui/Cursor/Cursor";
import Home from "@/pages/Home";
import PricingPage from "@/pages/PricingPage";
import TokenPage from "@/pages/TokenPage";
import LegalPage from "@/pages/LegalPage";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import ForgotPassword from "@/pages/auth/ForgotPassword";

// Auth screens use their own split layout, without the site header and footer
const AUTH_PATHS = ["/login", "/signup", "/forgot-password"];

export default function App() {
  const { pathname } = useLocation();
  const isAuth = AUTH_PATHS.includes(pathname);

  return (
    <SmoothScroll>
      <Background />
      <Cursor />
      {!isAuth && <Header />}
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
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isAuth && <Footer />}
    </SmoothScroll>
  );
}
