import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/Section";

import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Feedbacks from "./components/Feedbacks";
import AboutPage from "./pages/AboutPage";
import AuthModal from "./components/AuthModel"; // Fixed import name

function App() {
  const [authMode, setAuthMode] = useState(null); // "signin" or "register" or null
  const [token, setToken] = useState(null);

  // Check if user is logged in on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Called when login/register is successful, receives token from AuthModal
  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setAuthMode(null); // close modal
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <div className="font-sans scroll-smooth bg-green-50 min-h-screen pt-20">
        <Header
          openAuthModal={setAuthMode}
          token={token}          // Pass token, not isLoggedIn
          onLogout={handleLogout}
        />

        <main className="space-y-10 pt-16">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Section id="home">
                    <Home />
                  </Section>

                  <Section id="about-section" title="About Us">
                    <About />
                  </Section>

                  <Section id="services" title="Our Services">
                    <Services />
                  </Section>

                  <Section id="feedbacks" title="Feedbacks">
                    <Feedbacks />
                  </Section>
                </>
              }
            />

            <Route path="/about" element={<AboutPage />} />

            <Route
              path="*"
              element={
                <div className="p-10 text-center text-gray-600">
                  Page not found
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />

        {/* Auth Modal */}
        {authMode && (
          <AuthModal
            mode={authMode}
            onClose={() => setAuthMode(null)}
            onLoginSuccess={handleLoginSuccess} // pass login success callback
          />
        )}
      </div>
    </Router>
  );
}

export default App;
