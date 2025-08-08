import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function ProfilePage({ token, onLogout }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [status, setStatus] = useState("single");

  // Decode user ID from token
  let userId = null;
  try {
    const decoded = jwtDecode(token);
    userId = decoded.id || decoded.userId; // adjust if your token uses a different key
  } catch {
    userId = null;
  }

  useEffect(() => {
    if (!token || !userId) return;

    async function fetchProfile() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setUserData(data);
        setFullName(data.fullName || "");
        setEmail(data.email || "");
        setDob(data.dob ? data.dob.slice(0, 10) : ""); // format date to yyyy-mm-dd
        setContactNo(data.contactNo || "");
        setStatus(data.status || "single");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [token, userId]);

  const handleSave = async () => {
    if (!userId) {
      setError("Invalid user ID");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fullName, dob, contactNo, status }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const data = await res.json();
      setUserData(data);
      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your profile? This action is irreversible.")) return;
    if (!userId) {
      setError("Invalid user ID");
      return;
    }

    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete profile");
      }

      alert("Profile deleted successfully.");
      onLogout(); // log out after deletion
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading profile...</div>;

  if (error)
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Error: {error}
      </div>
    );

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Your Profile</h1>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            readOnly
            disabled
            className="w-full border bg-gray-100 px-3 py-2 rounded cursor-not-allowed"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Contact Number</label>
          <input
            type="tel"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Error message */}
        {error && <div className="text-red-600 font-semibold">{error}</div>}

        {/* Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Delete Profile
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
