import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { User, Heart, Calendar, Settings, Bell, Shield, Phone, Mail, MapPin, Trash2, Save, Edit3 } from "lucide-react";

export default function ModernProfilePage({ token, onLogout }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);

  // Personal Info State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [status, setStatus] = useState("single");
  const [address, setAddress] = useState("");

  // Medical Info State
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medications, setMedications] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");

  // Mock data for channels/appointments
  const [appointments] = useState([
    {
      id: 1,
      doctorName: "Dr. Sarah Wilson",
      specialty: "Cardiology",
      date: "2025-08-15",
      time: "10:30 AM",
      status: "Confirmed",
      type: "Consultation"
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "Dermatology", 
      date: "2025-08-20",
      time: "2:00 PM",
      status: "Pending",
      type: "Follow-up"
    },
    {
      id: 3,
      doctorName: "Dr. Emily Rodriguez",
      specialty: "General Medicine",
      date: "2025-08-12",
      time: "9:00 AM",
      status: "Completed",
      type: "Check-up"
    }
  ]);

  // Decode user ID from token
  let userId = null;
  try {
    const decoded = jwtDecode(token);
    userId = decoded.id || decoded.userId;
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
        setDob(data.dob ? data.dob.slice(0, 10) : "");
        setContactNo(data.contactNo || "");
        setStatus(data.status || "single");
        setAddress(data.address || "");
        
        // Medical info (would come from API)
        setBloodType(data.bloodType || "");
        setAllergies(data.allergies || "");
        setMedications(data.medications || "");
        setEmergencyContact(data.emergencyContact || "");
        setMedicalHistory(data.medicalHistory || "");
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
      const profileData = {
        fullName, dob, contactNo, status, address,
        bloodType, allergies, medications, emergencyContact, medicalHistory
      };

      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const data = await res.json();
      setUserData(data);
      setIsEditing(false);
      setError(null);
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

      onLogout();
    } catch (err) {
      setError(err.message);
    }
  };

  const sideNavItems = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "medical", label: "Medical Info", icon: Heart },
    { id: "channels", label: "My Channels", icon: Calendar },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Personal Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Edit3 size={16} />
          <span>{isEditing ? "Cancel Edit" : "Edit Profile"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Full Name</label>
          {isEditing ? (
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          ) : (
            <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{fullName || "Not provided"}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Email</label>
          <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
            <Mail size={16} className="text-gray-500" />
            <span className="text-gray-900">{email}</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Date of Birth</label>
          {isEditing ? (
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          ) : (
            <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{dob || "Not provided"}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Contact Number</label>
          {isEditing ? (
            <input
              type="tel"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          ) : (
            <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
              <Phone size={16} className="text-gray-500" />
              <span className="text-gray-900">{contactNo || "Not provided"}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Marital Status</label>
          {isEditing ? (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 capitalize">{status}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Address</label>
          {isEditing ? (
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          ) : (
            <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
              <MapPin size={16} className="text-gray-500" />
              <span className="text-gray-900">{address || "Not provided"}</span>
            </div>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      )}
    </div>
  );

  const renderMedicalInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Medical Information</h2>
        <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
          <Shield size={14} />
          <span>Confidential</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Blood Type</label>
          {isEditing ? (
            <select
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          ) : (
            <p className="px-4 py-3 bg-red-50 rounded-lg text-gray-900 font-medium">{bloodType || "Not provided"}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Emergency Contact</label>
          {isEditing ? (
            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              placeholder="Name and phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          ) : (
            <p className="px-4 py-3 bg-red-50 rounded-lg text-gray-900">{emergencyContact || "Not provided"}</p>
          )}
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Known Allergies</label>
          {isEditing ? (
            <textarea
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              rows={3}
              placeholder="List any known allergies..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
            />
          ) : (
            <p className="px-4 py-3 bg-yellow-50 rounded-lg text-gray-900 min-h-[80px]">{allergies || "No known allergies"}</p>
          )}
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Current Medications</label>
          {isEditing ? (
            <textarea
              value={medications}
              onChange={(e) => setMedications(e.target.value)}
              rows={3}
              placeholder="List current medications..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
            />
          ) : (
            <p className="px-4 py-3 bg-blue-50 rounded-lg text-gray-900 min-h-[80px]">{medications || "No current medications"}</p>
          )}
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Medical History</label>
          {isEditing ? (
            <textarea
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              rows={4}
              placeholder="Brief medical history..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
            />
          ) : (
            <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 min-h-[100px]">{medicalHistory || "No medical history recorded"}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderChannels = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">My Channels</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          + New Appointment
        </button>
      </div>

      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Calendar className="text-indigo-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{appointment.doctorName}</h3>
                  <p className="text-gray-600">{appointment.specialty}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{appointment.date}</p>
                <p className="text-gray-600">{appointment.time}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{appointment.type}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                  appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Account Settings</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell size={20} className="text-gray-600" />
                <span className="text-gray-900">Email notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900">SMS notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Danger Zone</h3>
          <p className="text-red-700 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
          <button
            onClick={handleDelete}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 size={16} />
            <span>Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "personal":
        return renderPersonalInfo();
      case "medical":
        return renderMedicalInfo();
      case "channels":
        return renderChannels();
      case "settings":
        return renderSettings();
      default:
        return renderPersonalInfo();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                <User className="text-white" size={24} />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{fullName || "User"}</h2>
                <p className="text-sm text-gray-600">Profile Settings</p>
              </div>
            </div>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {sideNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsEditing(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeSection === item.id
                          ? "bg-indigo-100 text-indigo-700 border-r-2 border-indigo-700"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="absolute bottom-6 left-4 right-4">
            <button
              onClick={onLogout}
              className="w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-left"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}