import React from "react";
import Hero from "@/components/Landing/Hero";
import Dashboard from "@/components/Landing/Dashboard";
import Features from "@/components/Landing/Features";
import Working from "@/components/Landing/Working";
import FAQ from "@/components/Landing/FAQ";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
const page = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Dashboard/>
      <Features />
      <Working />
      <FAQ />
      <Footer />
    </div>
  );
};

export default page;
