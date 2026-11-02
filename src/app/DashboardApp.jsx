import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Overview from "./pages/Overview";
import { pageFor } from "./pages";
import { Checkout } from "./pages/Plans";
import { OverviewSkeleton, SectionSkeleton } from "./Skeletons";
import { routes, BASE } from "./nav";
import "./DashboardApp.css";
import "./ui.css";
import "./pages/pages.css";

// Simulated request time. With a real API, drop this and use each page's own fetch state.
const LOAD_MS = 650;

/* Investor area: fixed sidebar, sticky top bar and a scrolling content column.
   Mounted at /dashboard/* and lazy-loaded, so the marketing pages never ship this code. */
export default function DashboardApp() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  // The page counts as loaded only once its own path has finished "fetching"
  const [loadedPath, setLoadedPath] = useState(null);
  const loading = loadedPath !== pathname;

  useEffect(() => {
    setOpen(false);
    const t = setTimeout(() => setLoadedPath(pathname), LOAD_MS);
    return () => clearTimeout(t);
  }, [pathname]);

  const isOverview = pathname.replace(/\/$/, "") === BASE;

  return (
    <div className={`app ${open ? "is-nav-open" : ""}`}>
      <Sidebar onClose={() => setOpen(false)} />
      <button className="app__scrim" aria-label="Close menu" onClick={() => setOpen(false)} />

      <div className="app__main">
        <Topbar onMenu={() => setOpen(true)} />
        <div className="app__body" aria-busy={loading}>
          {loading ? (
            isOverview ? <OverviewSkeleton /> : <SectionSkeleton />
          ) : (
            <Routes>
              <Route index element={<Overview />} />
              {routes.filter((r) => pageFor[r.path]).map((r) => (
                <Route key={r.path} path={r.path} element={pageFor[r.path]} />
              ))}
              <Route path="invest/:planId" element={<Checkout />} />
              <Route path="*" element={<Navigate to={BASE} replace />} />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
}
