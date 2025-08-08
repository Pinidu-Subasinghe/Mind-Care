import React, { useState } from "react";

export default function AuthModal({ mode, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(mode === "register");

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [dob, setDob] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [status, setStatus] = useState("single"); // default status

  const [loading, setLoading] = useState(false);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          ✕
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Title */}
          <h2 className="text-3xl font-extrabold text-center text-green-800 mb-2">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-center text-gray-500 mb-6">
            {isRegister
              ? "Join us and start your journey today!"
              : "Sign in to continue exploring."}
          </p>

          {/* Error message */}
          {error && (
            <div className="mb-4 text-red-600 font-semibold text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div
              className={`grid gap-5 ${
                isRegister ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
              }`}
            >
              {isRegister && (
                <>
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                  </div>

                  {/* DOB */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1234567890"
                      value={contactNo}
                      onChange={(e) => setContactNo(e.target.value)}
                      required
                      className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    >
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              {/* Confirm Password (only register) */}
              {isRegister && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg font-semibold hover:scale-[1.02] hover:shadow-lg transition disabled:opacity-50 mt-5"
            >
              {loading
                ? isRegister
                  ? "Signing Up..."
                  : "Signing In..."
                : isRegister
                ? "Sign Up"
                : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
              <img
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
              Facebook
            </button>
          </div>

          {/* Switch between modes */}
          <p className="mt-6 text-sm text-center text-gray-600">
            {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
            <button
              onClick={() => {
                setError(null);
                setIsRegister(!isRegister);
              }}
              className="text-green-600 font-medium hover:underline"
            >
              {isRegister ? "Sign In" : "Register"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
