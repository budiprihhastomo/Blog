"use client";

import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ToolsSection from "@/components/ToolsSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

import type { Route } from "./+types/_index";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutSection />
      <ToolsSection />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Index;
