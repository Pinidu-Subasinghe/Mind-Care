import React, { useState, useEffect } from "react";
import Cardiologist from "../assets/Cardiologist.png";

const socialLinks = [
  {
    name: "WhatsApp",
    href: "https://www.whatsapp.com/",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="h-10 w-10 text-green-600 hover:text-green-700 transition-all duration-300 hover:scale-110"
      >
        <path
          fillRule="evenodd"
          d="M 24.503906 7.503906 C 22.246094 5.246094 19.246094 4 16.050781 4 C 9.464844 4 4.101563 9.359375 4.101563 15.945313 C 4.097656 18.050781 4.648438 20.105469 5.695313 21.917969 L 4 28.109375 L 10.335938 26.445313 C 12.078125 27.398438 14.046875 27.898438 16.046875 27.902344 L 16.050781 27.902344 C 22.636719 27.902344 27.996094 22.542969 28 15.953125 C 28 12.761719 26.757813 9.761719 24.503906 7.503906 Z M 16.050781 25.882813 L 16.046875 25.882813 C 14.265625 25.882813 12.515625 25.402344 10.992188 24.5 L 10.628906 24.285156 L 6.867188 25.269531 L 7.871094 21.605469 L 7.636719 21.230469 C 6.640625 19.648438 6.117188 17.820313 6.117188 15.945313 C 6.117188 10.472656 10.574219 6.019531 16.054688 6.019531 C 18.707031 6.019531 21.199219 7.054688 23.074219 8.929688 C 24.949219 10.808594 25.980469 13.300781 25.980469 15.953125 C 25.980469 21.429688 21.523438 25.882813 16.050781 25.882813 Z M 21.496094 18.445313 C 21.199219 18.296875 19.730469 17.574219 19.457031 17.476563 C 19.183594 17.375 18.984375 17.328125 18.785156 17.625 C 18.585938 17.925781 18.015625 18.597656 17.839844 18.796875 C 17.667969 18.992188 17.492188 19.019531 17.195313 18.871094 C 16.894531 18.722656 15.933594 18.40625 14.792969 17.386719 C 13.90625 16.597656 13.304688 15.617188 13.132813 15.320313 C 12.957031 15.019531 13.113281 14.859375 13.261719 14.710938 C 13.398438 14.578125 13.5625 14.363281 13.710938 14.1875 C 13.859375 14.015625 13.910156 13.890625 14.011719 13.691406 C 14.109375 13.492188 14.058594 13.316406 13.984375 13.167969 C 13.910156 13.019531 13.3125 11.546875 13.0625 10.949219 C 12.820313 10.367188 12.574219 10.449219 12.390625 10.4375 C 12.21875 10.429688 12.019531 10.429688 11.820313 10.429688 C 11.621094 10.429688 11.296875 10.503906 11.023438 10.804688 C 10.75 11.101563 9.980469 11.824219 9.980469 13.292969 C 9.980469 14.761719 11.050781 16.183594 11.199219 16.382813 C 11.347656 16.578125 13.304688 19.59375 16.300781 20.886719 C 17.011719 21.195313 17.566406 21.378906 18 21.515625 C 18.714844 21.742188 19.367188 21.710938 19.882813 21.636719 C 20.457031 21.550781 21.648438 20.914063 21.898438 20.214844 C 22.144531 19.519531 22.144531 18.921875 22.070313 18.796875 C 21.996094 18.671875 21.796875 18.597656 21.496094 18.445313 Z"
        />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="h-10 w-10 text-green-600 hover:text-green-700 transition-all duration-300 hover:scale-110"
      >
        <path d="M 16 4 C 9.3844276 4 4 9.3844276 4 16 C 4 22.615572 9.3844276 28 16 28 C 22.615572 28 28 22.615572 28 16 C 28 9.3844276 22.615572 4 16 4 z M 16 6 C 21.534692 6 26 10.465308 26 16 C 26 21.027386 22.311682 25.161277 17.488281 25.878906 L 17.488281 18.916016 L 20.335938 18.916016 L 20.783203 16.023438 L 17.488281 16.023438 L 17.488281 14.443359 C 17.488281 13.242359 17.882859 12.175781 19.005859 12.175781 L 20.810547 12.175781 L 20.810547 9.6523438 C 20.493547 9.6093438 19.822688 9.515625 18.554688 9.515625 C 15.906688 9.515625 14.355469 10.913609 14.355469 14.099609 L 14.355469 16.023438 L 11.632812 16.023438 L 11.632812 18.916016 L 14.355469 18.916016 L 14.355469 25.853516 C 9.6088556 25.070647 6 20.973047 6 16 C 6 10.465308 10.465308 6 16 6 z"></path>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="h-10 w-10 text-green-600 hover:text-green-700 transition-all duration-300 hover:scale-110"
      >
        <path d="M 11.46875 5 C 7.917969 5 5 7.914063 5 11.46875 L 5 20.53125 C 5 24.082031 7.914063 27 11.46875 27 L 20.53125 27 C 24.082031 27 27 24.085938 27 20.53125 L 27 11.46875 C 27 7.917969 24.085938 5 20.53125 5 Z M 11.46875 7 L 20.53125 7 C 23.003906 7 25 8.996094 25 11.46875 L 25 20.53125 C 25 23.003906 23.003906 25 20.53125 25 L 11.46875 25 C 8.996094 25 7 23.003906 7 20.53125 L 7 11.46875 C 7 8.996094 8.996094 7 11.46875 7 Z M 21.90625 9.1875 C 21.402344 9.1875 21 9.589844 21 10.09375 C 21 10.597656 21.402344 11 21.90625 11 C 22.410156 11 22.8125 10.597656 22.8125 10.09375 C 22.8125 9.589844 22.410156 9.1875 21.90625 9.1875 Z M 16 10 C 12.699219 10 10 12.699219 10 16 C 10 19.300781 12.699219 22 16 22 C 19.300781 22 22 19.300781 22 16 C 22 12.699219 19.300781 10 16 10 Z"></path>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        fill="currentColor"
        className="h-10 w-10 text-green-600 hover:text-green-700 transition-all duration-300 hover:scale-110"
      >
        <path d="M 15 4 C 10.814 4 5.3808594 5.0488281 5.3808594 5.0488281 L 5.3671875 5.0644531 C 3.4606632 5.3693645 2 7.0076245 2 9 L 2 15 L 2 15.001953 L 2 21 L 2 21.001953 A 4 4 0 0 0 5.3769531 24.945312 L 5.3808594 24.951172 C 5.3808594 24.951172 10.814 26.001953 15 26.001953 C 19.186 26.001953 24.619141 24.951172 24.619141 24.951172 L 24.621094 24.949219 A 4 4 0 0 0 28 21.001953 L 28 21 L 28 15.001953 L 28 15 L 28 9 A 4 4 0 0 0 24.623047 5.0546875 L 24.619141 5.0488281 C 24.619141 5.0488281 19.186 4 15 4 z M 12 10.398438 L 20 15 L 12 19.601562 L 12 10.398438 z"></path>
      </svg>
    ),
  },
];

// Floating shapes animation component
const FloatingShape = ({ delay = 0, duration = 3000, children, className = "" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const animate = () => {
      const newX = Math.sin(Date.now() / duration + delay) * 20;
      const newY = Math.cos(Date.now() / duration + delay) * 15;
      setPosition({ x: newX, y: newY });
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [delay, duration]);

  return (
    <div
      className={`absolute ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Animated background elements */}
      <FloatingShape delay={0} className="top-20 left-10 opacity-20">
        <div className="w-32 h-32 bg-gradient-to-r from-green-200 to-green-300 rounded-full blur-xl"></div>
      </FloatingShape>
      
      <FloatingShape delay={Math.PI / 2} className="top-40 right-20 opacity-15">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full blur-xl"></div>
      </FloatingShape>
      
      <FloatingShape delay={Math.PI} className="bottom-32 left-20 opacity-20">
        <div className="w-28 h-28 bg-gradient-to-r from-purple-200 to-pink-300 rounded-full blur-xl"></div>
      </FloatingShape>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 mt-6 px-4 max-w-7xl mx-auto">
        {/* Left side text content */}
        <div 
          className={`md:w-1/2 flex flex-col justify-center gap-6 transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
        >
          {/* Animated heading with gradient text */}
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight font-sans text-gray-900 relative">
            <span className="inline-block animate-pulse">Healthy Minds,</span>
            <br />
            <span className="inline-block">Happy Lives</span>
            <br />
            <span className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 bg-clip-text text-transparent animate-pulse">
              Mental Health
            </span>
            <br />
            <span className="text-3xl md:text-4xl text-gray-700">Consultancy</span>
            
            {/* Decorative animated underline */}
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-600 to-transparent rounded-full transform scale-x-0 animate-[scaleX_1.5s_ease-in-out_0.5s_forwards] origin-left"></div>
          </h1>

          {/* Animated paragraph */}
          <p 
            className={`text-gray-600 text-lg max-w-md leading-relaxed transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            Empowering mental wellness through professional guidance, compassionate care, and innovative therapeutic approaches for a healthier, happier you.
          </p>

          {/* Button and Stats Row */}
          <div 
            className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {/* Animated CTA button with pulse effect */}
            <button 
              className="group bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full px-8 py-4 font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden"
            >
              {/* Animated background shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>

            {/* Animated stats badges */}
            <div className="flex gap-6">
              <div className="text-center group cursor-pointer">
                <div className="text-2xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-200">500+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-2xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-200">10+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-2xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-200">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Animated social icons */}
          <div className="flex gap-4 mt-6">
            {socialLinks.map(({ name, href, svg }, index) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className={`transform transition-all duration-500 hover:rotate-12 hover:scale-110 hover:shadow-lg rounded-full p-2 hover:bg-white ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${700 + index * 100}ms` }}
              >
                <div className="transform transition-transform duration-300 hover:rotate-6">
                  {svg}
                </div>
              </a>
            ))}
          </div>


        </div>

        {/* Right side image with animations */}
        <div 
          className={`md:w-1/2 flex justify-center relative transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
          }`}
        >
          {/* Animated background circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-80 bg-gradient-to-r from-green-200/30 to-blue-200/30 rounded-full animate-pulse"></div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full animate-ping"></div>
          </div>

          {/* Main cardiologist image with floating animation */}
          <div className="relative z-10 transform hover:rotate-1 transition-transform duration-500 animate-float">
            <img
              src={Cardiologist}
              alt="Mental health illustration"
              className="max-w-full h-auto drop-shadow-2xl"
            />
          </div>
            
            {/* Floating plus signs */}
            <FloatingShape delay={0} className="top-4 right-8">
              <div className="w-6 h-6 text-green-400 animate-spin">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                </svg>
              </div>
            </FloatingShape>
            
            <FloatingShape delay={Math.PI} className="bottom-8 left-4">
              <div className="w-4 h-4 text-blue-400 animate-bounce">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L19 7L17.74 13.09L24 12L17.74 10.91L19 17L13.09 15.74L12 22L10.91 15.74L5 17L6.26 10.91L0 12L6.26 13.09L5 7L10.91 8.26L12 2Z"/>
                </svg>
              </div>
            </FloatingShape>
          </div>

          {/* Orbiting elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-80 animate-spin" style={{ animationDuration: '20s' }}>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-5 h-5 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes scaleX {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}