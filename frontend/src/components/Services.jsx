import React, { useEffect, useState } from "react";

export default function Services() {
  const services = [
    {
      title: "Mental Counseling",
      desc: "Personalized one-on-one sessions with experienced counselors to help you navigate challenges, manage stress, and achieve emotional balance.",
      img: "https://www.pngmart.com/files/21/Counseling-PNG-Picture.png",
      alt: "Mental Counseling Illustration",
    },
    {
      title: "Therapy Sessions",
      desc: "Evidence-based therapy programs tailored to your needs, whether you’re working through anxiety, depression, trauma, or personal growth goals.",
      img: "https://www.picktime.com/webassets/2021/img/business/cover-img/counseling-cover.png",
      alt: "Therapy Sessions Illustration",
    },
    {
      title: "Support Groups",
      desc: "Safe, judgment-free spaces where you can share experiences, gain understanding, and connect with others who truly relate to your journey.",
      img: "https://cdni.iconscout.com/illustration/premium/thumb/women-social-support-group-3744084-3128037.png",
      alt: "Support Groups Illustration",
    },
    {
      title: "Case Management",
      desc: "Coordinated mental health and wellness planning to ensure you receive comprehensive, ongoing support for every aspect of your well-being.",
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
      style={{ marginTop: 0 }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Left side */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h2 className="text-4xl font-bold text-green-800 mb-4 font-sans">
            Our Services
          </h2>
          <p className="text-gray-700 text-lg">
            At <strong>Mind Care</strong>, we believe mental well-being is just as important as physical health. 
            Our services are designed to guide you through every stage of your journey — from immediate emotional support to long-term personal growth. 
            Whether you need professional counseling, structured therapy, group connection, or coordinated care, we’re here to provide compassionate, expert guidance every step of the way.
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
