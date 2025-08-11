import React, { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";

const useInView = (threshold = 0.12) => {
  const ref = useRef();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
};

const therapistsData = [
  {
    id: "t1",
    name: "Dr. Aisha Perera",
    title: "Clinical Psychologist",
    specialties: ["Counseling", "Anxiety", "Depression"],
    bio: "Dr. Aisha uses integrative approaches combining CBT and mindfulness to help clients build coping skills and resilience.",
    image:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1b7e2c4fd9c4f9a6f7d9aaad7f9b883b",
    rating: 4.9,
    years: 8,
    price: 30,
  },
  {
    id: "t2",
    name: "Mr. Sunil Fernando",
    title: "Counselor",
    specialties: ["Counseling","Career", "Stress Management"],
    bio: "Sunil focuses on practical strategies for stress, work-life balance and career transitions, offering supportive one-on-one sessions.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4.7,
    years: 6,
    price: 20,
  },
  {
    id: "t3",
    name: "Ms. Nadiya Silva",
    title: "CBT Therapist",
    specialties: ["Therapy", "CBT", "Anxiety"],
    bio: "Nadiya specializes in Cognitive Behavioral Therapy with structured programs tailored to each client’s goals.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6f0eaaf152d6f8f6b9b0db8f6a2c2b3d",
    rating: 4.8,
    years: 7,
    price: 35,
  },
  {
    id: "t4",
    name: "Dr. Kavita Jayawardena",
    title: "Group Facilitator",
    specialties: ["Support Groups", "Grief", "Community"],
    bio: "Kavita runs therapeutic support groups and workshops focused on grief, peer support and social reconnection.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.85,
    years: 10,
    price: 25,
  },
  {
    id: "t5",
    name: "Mr. Rohan de Silva",
    title: "Mindfulness Coach",
    specialties: ["Workshops", "Mindfulness", "Meditation"],
    bio: "Rohan leads practical mindfulness workshops blending breathing, movement and psychoeducation for everyday mental health.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=0a9b0d3b6a765c9c6b5b2a6b6a7b9c3e",
    rating: 4.6,
    years: 4,
    price: 15,
  },
  // add more as needed
];

/* ---------- Therapists Component ---------- */
export default function Therapists({ openAuthModal, token, onBook }) {
  const [ref, inView] = useInView(0.12);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null); // therapist selected for modal
  const categories = [
    "All",
    "Counseling",
    "Therapy",
    "Workshops",
    "Support Groups",
  ];

  const lower = (s) => (s || "").toLowerCase();

  const filtered = therapistsData.filter((t) => {
    const matchesCategory =
      category === "All" || t.specialties.includes(category);
    const matchesSearch =
      lower(t.name).includes(lower(search)) ||
      lower(t.title).includes(lower(search)) ||
      lower(t.bio).includes(lower(search)) ||
      t.specialties.some((sp) => lower(sp).includes(lower(search)));
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    // close modal on Escape
    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleBook = (therapistId) => {
    if (!token) {
      openAuthModal?.("signin");
      return;
    }
    if (onBook) onBook(therapistId);
    else {
      // fallback: just alert (replace with actual booking flow)
      alert(
        "Booking flow not implemented. Received therapist id: " + therapistId
      );
    }
  };

  return (
    <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto" ref={ref}>
      {/* Header */}
      <div
        className={`text-center mb-10 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h1 className="text-4xl font-bold mb-3">
          Meet Our{" "}
          <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Therapists
          </span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Licensed professionals and facilitators available for counseling,
          evidence-based therapy, and community workshops. Use search and
          filters to find the right match.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full md:w-1/2">
          <input
            aria-label="Search therapists"
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 pl-10"
            placeholder="Search by name, specialty or focus..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                category === c
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-green-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length ? (
          filtered.map((t, idx) => (
            <article
              key={t.id}
              className={`bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-700 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${Math.min(300, idx * 80)}ms` }}
            >
              {/* content */}
              <div className="p-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {t.name}
                      </h3>
                      <p className="text-sm text-gray-500">{t.title}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">
                        {t.rating}★
                      </div>
                      <div className="text-xs text-gray-400">{t.years} yrs</div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-3 mb-4 line-clamp-3">
                    {t.bio}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    {t.specialties.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="text-xs bg-green-100 text-green-700 rounded-full px-2 py-0.5 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelected(t)}
                      className="px-4 py-2 rounded-full bg-white border border-green-200 text-green-700 text-sm font-semibold hover:shadow"
                      aria-label={`View ${t.name} details`}
                    >
                      View
                    </button>

                    <Link to={`/appointment/${t.id}`}>
                      <button className="px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white text-sm font-semibold hover:scale-105 transform transition">
                        Book
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No therapists found.
          </p>
        )}
      </div>

      {/* Modal: therapist details */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <div className="relative max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="w-1/3 min-h-[220px] h-full">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 w-2/3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {selected.name}
                    </h2>
                    <p className="text-sm text-gray-500">{selected.title}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="text-sm font-semibold text-green-600">
                        {selected.rating}★
                      </div>
                      <div className="text-xs text-gray-400">
                        {selected.years} years experience
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelected(null)}
                    className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
                    aria-label="Close details"
                  >
                    <X size={18} />
                  </button>
                </div>

                <p className="text-gray-600 mt-4">{selected.bio}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {selected.specialties.map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-green-100 text-green-700 rounded-full px-2 py-0.5 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Session Price</div>
                    <div className="text-lg font-semibold text-gray-800">
                      ${selected.price} USD
                    </div>
                  </div>

                  <div className="ml-auto flex items-center gap-2">
                    <button
                      onClick={() => {
                        // maybe go to full profile page
                        setSelected(null);
                        // navigate('/therapists/' + selected.id) // implement as needed
                      }}
                      className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 font-medium"
                    >
                      Full Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* small helper style for text truncation (line-clamp) if your Tailwind has plugin remove if not */}
      <style>{`
        /* if you don't use @tailwindcss/line-clamp plugin, fallback truncation */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
