import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AppointmentPage() {
  const { therapistId } = useParams();

  // Example therapist names keyed by ID — replace or expand as needed
  const therapistsMap = {
    t1: "Dr. Aisha Perera",
    t2: "Mr. Sunil Fernando",
    t3: "Ms. Nadiya Silva",
    t4: "Dr. Kavita Jayawardena",
    t5: "Mr. Rohan de Silva",
  };

  const therapistName = therapistsMap[therapistId] || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "",
    therapist: therapistName,
    date: "",
    time: "",
    sessionType: "",
    notes: "",
  });

  // Just categories here, no separate therapist select because we get therapist from URL
  const categories = [
    { id: "counseling", name: "Counseling" },
    { id: "therapy", name: "Therapy" },
    { id: "workshop", name: "Workshops" },
    { id: "support", name: "Support Groups" },
  ];

  useEffect(() => {
    // If therapist name is known, you might want to auto-fill category if desired
    // Here skipped for simplicity, but could map therapistId to category too
  }, [therapistId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment booked for ${formData.fullName} with ${formData.therapist}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-3xl p-10 sm:p-12">
        <h2 className="text-4xl font-extrabold text-green-700 text-center mb-10">
          Book an Appointment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+1 (555) 123-4567"
                className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
              Service Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Therapist (readonly) */}
          <div>
            <label htmlFor="therapist" className="block text-sm font-semibold text-gray-700 mb-2">
              Therapist
            </label>
            <input
              id="therapist"
              type="text"
              name="therapist"
              value={formData.therapist}
              readOnly
              className="w-full rounded-xl border border-gray-300 bg-gray-100 px-5 py-3 text-gray-700 cursor-not-allowed"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Date
              </label>
              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Time
              </label>
              <input
                id="time"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>
          </div>

          {/* Session Type */}
          <div>
            <label htmlFor="sessionType" className="block text-sm font-semibold text-gray-700 mb-2">
              Session Type
            </label>
            <select
              id="sessionType"
              name="sessionType"
              value={formData.sessionType}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            >
              <option value="" disabled>
                Select session type
              </option>
              <option value="online">Online</option>
              <option value="in-person">In-Person</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Any concerns or special requests..."
              className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-none"
            ></textarea>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-extrabold rounded-3xl hover:from-green-700 hover:to-green-800 shadow-lg transition-transform duration-300 hover:scale-105"
            >
              Confirm Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
