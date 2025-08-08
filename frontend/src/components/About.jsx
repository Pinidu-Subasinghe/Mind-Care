import React from "react";
import LabImage from "../assets/lab.png"; // Replace with the actual image path

export default function About() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between">
      <img
        src={LabImage}
        alt="Mental Health Consultancy"
        className="max-h-[500px] w-auto max-w-full"
      />

      <div className="w-full md:w-1/2 mt-10 md:mt-0 md:pl-10 text-center md:text-left">
        <p className="text-sm text-black font-semibold mb-2 uppercase tracking-wide">
          About Us
        </p>
        <h2 className="text-4xl font-bold text-black leading-tight mb-6">
          Discover the Faces <br /> Behind Our Mental <br /> Health Consultancy
        </h2>
        <p className="text-base text-gray-700 mb-8 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Convallis est urna adipiscing
          fringilla nulla diam lorem non mauris. Ultrices aliquet at quam
          adipiscing feugiat interdum mattis. Placerat donec risus diam sed et.
          A in ullamcorper ipsum justo vestibulum sit cursus. A risus donec eget
          enim.
        </p>
        <a
          href="#"
          className="inline-block bg-[#E3774D] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#D36139] transition-colors"
        >
          See detail
        </a>
      </div>
    </section>
  );
}
