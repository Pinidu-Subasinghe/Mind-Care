import React from "react";

export default function Services() {
  const services = [
    {
      title: "Mental Counseling",
      desc: "Personalized sessions to support your mental health needs.",
      img: "mask-group17.svg",
    },
    {
      title: "Therapy Sessions",
      desc: "Professional therapy to help you cope and grow.",
      img: "mask-group18.svg",
    },
    {
      title: "Support Groups",
      desc: "Connect with others in a safe and supportive space.",
      img: "mask-group19.svg",
    },
    {
      title: "Case Management",
      desc: "Coordinated care to address all your health concerns.",
      img: "mask-group20.svg",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
      {services.map(({ title, desc, img }, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={img} alt={title} className="w-full h-48 object-cover" />
          <div className="p-6">
            <h4 className="text-xl font-semibold text-green-800 mb-2 font-sans">
              {title}
            </h4>
            <p className="text-gray-600">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
