import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ openAuthModal, token, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // Guest navigation
  const guestLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Therapists", href: "/therapists" },
    { name: "Resources", href: "/resources" },
    { name: "Pricing", href: "/pricing" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Logged-in user navigation
  const userLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "My Sessions", href: "/my-sessions" },
    { name: "Messages", href: "/messages" },
    { name: "Community", href: "/community" },
    { name: "Resources", href: "/resources" },
  ];

  const navLinks = token ? userLinks : guestLinks;

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 md:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold font-sans text-green-700 tracking-wide"
        >
          Mind Care
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="hover:text-green-600 transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth / User */}
        <div className="hidden md:flex items-center space-x-4">
          {!token ? (
            <>
              <button
                onClick={() => openAuthModal("signin")}
                className="px-4 py-2 text-sm font-semibold text-green-700 border border-green-600 rounded-full hover:bg-green-50 transition"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal("register")}
                className="px-5 py-2 text-sm font-semibold bg-green-600 text-white rounded-full hover:bg-green-700 transition"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded-full hover:bg-red-700 transition"
              >
                Logout
              </button>
              <Link to="/profile" aria-label="Profile">
                <button className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                  U
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6 text-green-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md py-4 flex flex-col items-center space-y-4 font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="hover:text-green-600 transition"
            >
              {link.name}
            </Link>
          ))}

          {!token ? (
            <>
              <button
                onClick={() => {
                  openAuthModal("signin");
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-center text-sm font-semibold text-green-700 border border-green-600 rounded-full hover:bg-green-50 transition w-full max-w-xs"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  openAuthModal("register");
                  setIsOpen(false);
                }}
                className="px-5 py-2 text-center text-sm font-semibold bg-green-600 text-white rounded-full hover:bg-green-700 transition w-full max-w-xs"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded-full hover:bg-red-700 transition w-full max-w-xs"
              >
                Logout
              </button>
              <Link to="/profile" aria-label="Profile">
                <button className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                  U
                </button>
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
