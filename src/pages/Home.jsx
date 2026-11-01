import Hero from "@/sections/Hero/Hero";
import Stats from "@/sections/Stats/Stats";
import Products from "@/sections/Products/Products";
import HowItWorks from "@/sections/HowItWorks/HowItWorks";
import Pricing from "@/sections/Pricing/Pricing";
import Dashboard from "@/sections/Dashboard/Dashboard";
import Security from "@/sections/Security/Security";
import FAQ from "@/sections/FAQ/FAQ";
import CTA from "@/sections/CTA/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Products />
      <HowItWorks />
      <Pricing />
      <Dashboard />
      <Security />
      <FAQ />
      <CTA />
    </>
  );
}
