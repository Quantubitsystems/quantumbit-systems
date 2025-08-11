import Hero from "@/components/Hero";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Newsletter from "@/components/Newsletter";
import { SEOHead } from "@/components/SEOHead";
import LazyImage from "@/components/LazyImage";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import About from "./About";
import Services from "./Services";
import Products from "./Products";
import Portfolio from "./Portfolio";
import Blog from "./Blog";
import Contact from "./Contact";

const Index = () => {
  return (
    <>
      <SEOHead 
        title="QuantumBit Systems | Professional Tech Solutions in Nairobi"
        description="Professional tech solutions in Nairobi: Web/Mobile Development, WiFi Installation, Printer Repairs & Consumables. Expert IT services for businesses."
        keywords="web development, mobile apps, WiFi installation, printer repair, toner cartridges, IT support, Nairobi, Kenya"
      />
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen">
        <About />
      </section>
      
      {/* Services Section */}
      <section id="services" className="min-h-screen">
        <Services />
      </section>
      
      {/* Products Section */}
      <section id="products" className="min-h-screen">
        <Products />
      </section>
      
      {/* Portfolio Section */}
      <section id="portfolio" className="min-h-screen">
        <Portfolio />
      </section>
      
      {/* Blog Section */}
      <section id="blog" className="min-h-screen">
        <Blog />
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="min-h-screen">
        <Contact />
      </section>

      {/* WhatsApp Float */}
      <WhatsAppFloat />
    </>
  );
};

export default Index;