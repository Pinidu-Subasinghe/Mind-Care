import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/Section";

import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="font-sans scroll-smooth bg-green-50 min-h-screen pt-20">
      <Header />
      <main className="space-y-10"> {/* Reduced vertical spacing here */}
        <Section id="home">
          <Home />
        </Section>

        <Section id="about" title="About Us">
          <About />
        </Section>

        <Section id="services" title="Our Services">
          <Services />
        </Section>

        <Section id="pricing" title="Pricing">
          <Pricing />
        </Section>

        <Section id="contact" title="Contact Us">
          <Contact />
        </Section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
