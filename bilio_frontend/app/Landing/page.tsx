import React from "react";
import Hero from "@/components/Landing/Hero";
import Dashboard from "@/components/Landing/Dashboard";
import Features from "@/components/Landing/Features";
import Working from "@/components/Landing/Working";
import FAQ from "@/components/Landing/FAQ";
const page = () => {
  return (
    <div>
      <Hero />
      <Dashboard/>
      <Features />
      <Working />
      <FAQ />
    </div>
  );
};

export default page;
