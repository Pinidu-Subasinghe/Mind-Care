import React from "react";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-green-100 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Column 1 - About */}
        <div>
          <h3 className="text-lg font-semibold mb-4 font-sans">About Mind Care</h3>
          <p className="text-sm leading-6">
            At Mind Care, we are dedicated to providing compassionate mental
            health support through counseling, therapy, and community
            connection. Your well-being is our mission.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 font-sans">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="hover:underline hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="/pricing" className="hover:underline hover:text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 font-sans">Contact Us</h3>
          <p className="text-sm">For inquiries and appointments:</p>
          <p className="mt-2 font-semibold text-white">+1 (555) 123-4567</p>
          <p className="mt-1 font-semibold text-white">
            email@mindfulcare.com
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-700">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-xs text-green-200">
          © {new Date().getFullYear()} Mind Care. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
