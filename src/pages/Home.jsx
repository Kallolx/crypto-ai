import { lazy, Suspense } from "react";
import Hero from "@/sections/Hero/Hero";
import Stats from "@/sections/Stats/Stats";
import Products from "@/sections/Products/Products";
import HowItWorks from "@/sections/HowItWorks/HowItWorks";
import Pricing from "@/sections/Pricing/Pricing";
import Security from "@/sections/Security/Security";
import FAQ from "@/sections/FAQ/FAQ";
import CTA from "@/sections/CTA/CTA";

// Dashboard pulls in Recharts; load it separately so the first paint stays light
const Dashboard = lazy(() => import("@/sections/Dashboard/Dashboard"));

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Products />
      <HowItWorks />
      <Pricing />
      <Suspense fallback={<section className="section" id="dashboard" style={{ minHeight: 900 }} />}>
        <Dashboard />
      </Suspense>
      <Security />
      <FAQ />
      <CTA />
    </>
  );
}
