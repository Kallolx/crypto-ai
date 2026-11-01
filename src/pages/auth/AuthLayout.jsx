import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo/Logo";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import "./Auth.css";

/* Minimal shell shared by sign in, sign up and password reset: logo + centred form card. */
export default function AuthLayout({ children }) {
  return (
    <div className="auth">
      <Logo />
      <motion.div className="auth__card-wrap" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
        <GlassCard strong className="auth__card">{children}</GlassCard>
      </motion.div>
    </div>
  );
}
