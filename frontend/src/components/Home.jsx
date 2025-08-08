import React from "react";
import homeIllustration from "../assets/Cardiologist.png";

const socialIcons = [
  { alt: "Logo1", src: "/logoipsum1.svg" },
  { alt: "Logo2", src: "/logoipsum2.svg" },
  { alt: "Logo3", src: "/logoipsum3.svg" },
  { alt: "Logo4", src: "/logoipsum4.svg" },
];

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-10 gap-10">
      {/* Left side text content */}
      <div className="md:w-1/2 flex flex-col justify-center gap-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight font-sans text-gray-900">
          Healthy Minds, Happy Lives{" "}
          <span className="text-[#EC744A]">Mental Health</span> Consultancy
        </h1>
        <p className="text-gray-700 max-w-md">
          Lorem ipsum dolor sit amet consectetur. Convallis est urna adipiscing
          fringilla nulla diam lorem non mauris. Ultrices aliquet at quam.
        </p>
        <button className="bg-[#EC744A] text-white rounded-full px-6 py-3 w-max font-semibold hover:bg-orange-600 transition">
          Get started
        </button>

        {/* Social icons row */}
        <div className="flex gap-6 mt-6">
          {socialIcons.map(({ alt, src }, i) => (
            <img
              key={i}
              src={src}
              alt={alt}
              className="h-8 w-auto grayscale hover:grayscale-0 cursor-pointer transition"
            />
          ))}
        </div>
      </div>

      {/* Right side image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src={homeIllustration}
          alt="Mental health illustration"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
}
