import React, { useState, useEffect } from "react";

// Floating particle component
const FloatingParticle = ({ delay = 0, className = "" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0, opacity: 0.6 });

  useEffect(() => {
    const animate = () => {
      const time = Date.now() / 4000 + delay;
      const x = Math.sin(time) * 20;
      const y = Math.cos(time * 0.8) * 15;
      const opacity = 0.4 + Math.sin(time * 2) * 0.3;
      setPosition({ x, y, opacity });
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [delay]);

  return (
    <div
      className={`absolute ${className} pointer-events-none`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: position.opacity,
      }}
    >
      <div className="w-2 h-2 bg-green-400 rounded-full blur-sm shadow-lg animate-pulse"></div>
    </div>
  );
};

// Enhanced input component
const ModernInput = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  required = false, 
  options = null 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  const baseClasses = `
    w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 rounded-xl
    text-gray-800 placeholder-gray-400 transition-all duration-300
    focus:outline-none focus:bg-white
  `;

  const borderClasses = isFocused || hasValue
    ? 'border-green-500 shadow-lg shadow-green-500/20'
    : 'border-gray-200 hover:border-gray-300';

  const labelClasses = `
    absolute left-4 transition-all duration-300 pointer-events-none
    ${isFocused || hasValue
      ? '-top-2.5 text-xs bg-white px-2 text-green-600 font-semibold'
      : 'top-3.5 text-gray-500'
    }
  `;

  if (options) {
    return (
      <div className="relative group">
        <select
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className={`${baseClasses} ${borderClasses}`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label className={labelClasses}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="absolute inset-0 rounded-xl bg-green-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className={`${baseClasses} ${borderClasses}`}
  style={
    type === "date"
      ? { colorScheme: "light", WebkitTextFillColor: value ? "" : "transparent" }
      : {}
  }
      />
      <label className={labelClasses}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="absolute inset-0 rounded-xl bg-green-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

// Social button component
const SocialButton = ({ icon, name, onClick }) => (
  <button 
    onClick={onClick}
    className="group relative flex items-center justify-center gap-3 w-full border-2 border-gray-200 bg-white hover:bg-gray-50 rounded-xl py-3 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-50 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
    <img src={icon} alt={name} className="w-5 h-5 relative z-10" />
    <span className="relative z-10 font-medium text-gray-700">{name}</span>
  </button>
);

export default function AuthModal({ mode, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(mode === "register");
  const [isVisible, setIsVisible] = useState(false);
  
  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [dob, setDob] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [status, setStatus] = useState("single");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const statusOptions = [
    { value: "single", label: "Single" },
    { value: "relationship", label: "In a Relationship" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "other", label: "Other" }
  ];

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError(null);

    if (isRegister) {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName,
            email,
            password,
            dob,
            contactNo,
            status,
          }),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
          setError(data.message || "Failed to register");
        } else {
          if (data.token) {
            onLoginSuccess(data.token);
          } else {
            onClose();
          }
        }
      } catch (err) {
        setLoading(false);
        setError("Server error");
      }
    } else {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
          setError(data.message || "Login failed");
        } else {
          if (data.token) {
            onLoginSuccess(data.token);
          } else {
            onClose();
          }
        }
      } catch (err) {
        setLoading(false);
        setError("Server error");
      }
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const switchMode = () => {
    setError(null);
    setIsRegister(!isRegister);
  };

  return (
    <div 
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      {/* Modal Container */}
      <div 
        className={`relative w-full max-w-4xl max-h-[95vh] overflow-y-auto transform transition-all duration-500 ease-out ${
          isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Background with modern design */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
          
          {/* Animated background elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            {/* Subtle gradient overlay */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-50/50 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-green-50/30 to-transparent rounded-full blur-3xl"></div>
            
            {/* Floating particles */}
            <FloatingParticle className="top-1/4 left-1/5" delay={0} />
            <FloatingParticle className="top-1/3 right-1/4" delay={Math.PI/2} />
            <FloatingParticle className="bottom-1/4 left-1/3" delay={Math.PI} />
            <FloatingParticle className="bottom-1/3 right-1/3" delay={Math.PI*1.5} />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-90 group"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-3 text-green-800">
                {isRegister ? "Join Mind Care" : "Welcome Back"}
              </h2>
              <p className="text-gray-600 text-lg max-w-md mx-auto">
                {isRegister
                  ? "Start your mental wellness journey with us today"
                  : "Continue your path to better mental health"}
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-700 font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Form */}
            <div className="space-y-6">
              <div className={`grid gap-6 ${isRegister ? 'md:grid-cols-2 lg:grid-cols-3' : 'max-w-md mx-auto'}`}>
                {isRegister && (
                  <>
                    <ModernInput
                      label="Full Name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                    
                    <ModernInput
                      label="Date of Birth"
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                    
                    <ModernInput
                      label="Contact Number"
                      type="tel"
                      value={contactNo}
                      onChange={(e) => setContactNo(e.target.value)}
                      required
                    />
                    
                    <ModernInput
                      label="Relationship Status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      options={statusOptions}
                    />
                  </>
                )}
                
                <ModernInput
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                
                <ModernInput
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                
                {isRegister && (
                  <ModernInput
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                )}
              </div>

              {/* Submit button */}
              <div className={!isRegister ? 'max-w-md mx-auto' : ''}>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="group relative w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  
                  {/* Loading spinner */}
                  {loading && (
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  {/* Button text */}
                  <span className={`relative z-10 transition-opacity duration-200 flex items-center justify-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                    {isRegister ? "Create Account" : "Sign In"}
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-4 text-gray-500 font-medium text-sm">or continue with</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Social Buttons */}
            <div className={`grid grid-cols-2 gap-4 mb-8 ${!isRegister ? 'max-w-md mx-auto' : ''}`}>
              <SocialButton
                icon="https://www.svgrepo.com/show/475656/google-color.svg"
                name="Google"
                onClick={() => console.log('Google login')}
              />
              <SocialButton
                icon="https://www.svgrepo.com/show/475647/facebook-color.svg"
                name="Facebook"
                onClick={() => console.log('Facebook login')}
              />
            </div>

            {/* Mode switch */}
            <div className="text-center">
              <p className="text-gray-600">
                {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={switchMode}
                  className="text-green-600 font-semibold hover:text-green-700 transition-colors duration-200 hover:underline"
                >
                  {isRegister ? "Sign In" : "Create Account"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}