import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BlurText from "@/components/ui/BlurText";
import "./PageHero.css";

/* Compact hero for inner pages */
export default function PageHero({ crumb, segments, lead, children }) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        <motion.nav className="page-hero__crumbs" aria-label="Breadcrumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{crumb}</span>
        </motion.nav>
        <BlurText className="page-hero__title" segments={segments} />
        {lead && (
          <motion.p className="lead" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}>
            {lead}
          </motion.p>
        )}
        {children && (
          <motion.div className="page-hero__actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7 }}>
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
