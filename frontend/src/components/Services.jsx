import React, { useEffect, useState } from "react";

export default function Services() {
  const services = [
    {
      title: "Mental Counseling",
      desc: "Personalized sessions to support your mental health needs.",
      img: "https://www.pngmart.com/files/21/Counseling-PNG-Picture.png",
      alt: "Mental Counseling Illustration",
    },
    {
      title: "Therapy Sessions",
      desc: "Professional therapy to help you cope and grow.",
      img: "https://www.picktime.com/webassets/2021/img/business/cover-img/counseling-cover.png",
      alt: "Therapy Sessions Illustration",
    },
    {
      title: "Support Groups",
      desc: "Connect with others in a safe and supportive space.",
      img: "https://cdni.iconscout.com/illustration/premium/thumb/women-social-support-group-3744084-3128037.png",
      alt: "Support Groups Illustration",
    },
    {
      title: "Case Management",
      desc: "Coordinated care to address all your health concerns.",
      img: "https://png.pngtree.com/png-vector/20221019/ourmid/pngtree-patient-waiting-medical-test-result-in-hospital-png-image_6327925.png",
      alt: "Case Management Illustration",
    },
  ];

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="max-w-7xl mx-auto px-6 py-16"
      style={{ marginTop: 0 }} // block global 40px margin here
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Left side */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h2 className="text-4xl font-bold text-green-800 mb-4 font-sans">
            Our Services
          </h2>
          <p className="text-gray-700 text-lg">
            Explore the range of mental health services we offer to support your journey to wellness.
          </p>
        </div>

        {/* Right side */}
        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map(({ title, desc, img, alt }, i) => (
            <div
              key={i}
              style={{ transitionDelay: `${i * 70}ms` }}
              className={`bg-white rounded-lg shadow-md overflow-hidden flex flex-col transform transition
                duration-500 ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                hover:scale-105 hover:shadow-xl cursor-default max-w-sm mx-auto`}
            >
              <img
                src={img}
                alt={alt}
                className="w-full h-40 object-contain p-6 bg-green-50"
              />
              <div className="p-6 flex flex-col flex-grow text-left">
                <h4 className="text-lg font-semibold text-green-800 mb-2 font-sans">
                  {title}
                </h4>
                <p className="text-gray-600 flex-grow text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
