import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

const CounselingImg =
  "https://www.pngmart.com/files/21/Counseling-PNG-Picture.png";
const TherapyImg =
  "https://www.picktime.com/webassets/2021/img/business/cover-img/counseling-cover.png";
const WorkshopImg =
  "https://cdni.iconscout.com/illustration/premium/thumb/business-workshop-2750495-2289785.png";
const SupportGroupImg =
  "https://cdni.iconscout.com/illustration/premium/thumb/women-social-support-group-3744084-3128037.png";

// Intersection Observer Hook
const useInView = (threshold = 0.1) => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
};

// Sample services data
const servicesData = [
  {
    id: 1,
    name: "Individual Counseling",
    category: "Counseling",
    description:
      "One-on-one sessions with licensed counselors for personal growth, stress management, and emotional support.",
    image: CounselingImg,
  },
  {
    id: 2,
    name: "Cognitive Behavioral Therapy",
    category: "Therapy",
    description:
      "Evidence-based therapy to help you identify and change negative thought patterns and behaviors.",
    image: TherapyImg,
  },
  {
    id: 3,
    name: "Mindfulness Workshop",
    category: "Workshops",
    description:
      "Group sessions to learn mindfulness techniques for relaxation, focus, and mental clarity.",
    image: WorkshopImg,
  },
  {
    id: 4,
    name: "Anxiety Support Group",
    category: "Support Groups",
    description:
      "Safe, non-judgmental group setting to share experiences and coping strategies for anxiety.",
    image: SupportGroupImg,
  },
];

export default function Services() {
  const [sectionRef, inView] = useInView(0.2);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Counseling",
    "Therapy",
    "Workshops",
    "Support Groups",
  ];

  const filteredServices = servicesData.filter((service) => {
    const matchesCategory =
      selectedCategory === "All" || service.category === selectedCategory;
    const matchesSearch = service.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto" ref={sectionRef}>
      {/* Page Header */}
      <div
        className={`text-center mb-12 transform transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h1 className="text-4xl font-bold mb-4">
          Our{" "}
          <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Services
          </span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our wide range of professional mental health services
          designed to help you live a happier, healthier life.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 pl-10"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-green-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.length > 0 ? (
          filteredServices.map((service, idx) => (
            <div
              key={service.id}
              className={`bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-700 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full ${
                inView
                  ? `opacity-100 translate-y-0 delay-[${idx * 100}ms]`
                  : "opacity-0 translate-y-6"
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="p-5 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {service.description}
                  </p>
                </div>
                <span className="inline-block px-4 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium self-start">
                  {service.category}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No services found.
          </p>
        )}
      </div>
    </div>
  );
}
