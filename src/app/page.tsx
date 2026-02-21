"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Marquee from "@/components/Marquee/Marquee";
import Projects from "@/components/Projects/Projects";
import AbtMe from "@/components/abt-me/AbtMe";
import Footer from "@/components/footer/Footer";
import Loader from "@/components/Loader/Loader";

import './Home.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <main className="relative bg-background">
      {isLoading && <Loader onLoadingComplete={handleLoadingComplete} />}

      <div style={{
        opacity: isLoading ? 0 : 1,
        transition: "opacity 1s ease-in-out",
        visibility: isLoading ? "hidden" : "visible"
      }}>
        <Navbar />
        <Hero />
        <Marquee />
        <Projects />
        <AbtMe />
        <Footer />
      </div>
    </main>
  );
}

