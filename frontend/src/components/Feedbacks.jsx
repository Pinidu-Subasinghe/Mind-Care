import React, { useEffect, useState, useRef } from "react";

// Intersection Observer Hook for scroll animations
const useInView = (threshold = 0.1) => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
};

// Floating background element
const FloatingElement = ({ delay = 0, duration = 5000, className = "", children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0, rotation: 0 });

  useEffect(() => {
    const animate = () => {
      const time = Date.now() / duration + delay;
      const newX = Math.sin(time) * 20;
      const newY = Math.cos(time * 0.8) * 15;
      const rotation = Math.sin(time * 0.5) * 10;
      setPosition({ x: newX, y: newY, rotation });
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [delay, duration]);

  return (
    <div
      className={`absolute ${className} transition-transform duration-100 ease-out`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`,
      }}
    >
      {children}
    </div>
  );
};

// Star rating animation component
const AnimatedStars = ({ rating = 5, delay = 0 }) => {
  const [visibleStars, setVisibleStars] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleStars(prev => {
          if (prev >= rating) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 150);
    }, delay);

    return () => clearTimeout(timer);
  }, [rating, delay]);

  return (
    <div className="flex justify-center gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 transition-all duration-300 ${
            i < visibleStars 
              ? 'text-yellow-400 scale-100 opacity-100' 
              : 'text-gray-300 scale-75 opacity-50'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function Feedbacks() {
  const feedbacks = [
    {
      name: "Sarah Johnson",
      role: "Client",
      feedback:
        "Mind Care has been a game-changer for my mental well-being. The counselors are patient, understanding, and truly care about your progress.",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      color: "from-green-400 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
    },
    {
      name: "Michael Lee",
      role: "Client",
      feedback:
        "I've attended therapy sessions and support groups here, and I always leave feeling lighter and more empowered. Highly recommended!",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      color: "from-blue-400 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      name: "Emily Carter",
      role: "Client",
      feedback:
        "The team at Mind Care creates such a safe and welcoming environment. I finally feel heard and understood.",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
      color: "from-purple-400 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
    },
  ];

  const [sectionRef, inView] = useInView(0.3);

  return (
    <div ref={sectionRef} className="relative max-w-6xl mx-auto px-6 py-16 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large floating testimonial bubbles */}
        <FloatingElement delay={0} className="top-10 left-10 opacity-5">
          <div className="w-32 h-32 bg-gradient-to-r from-green-200 to-blue-200 rounded-full blur-2xl"></div>
        </FloatingElement>
        
        <FloatingElement delay={Math.PI} className="bottom-10 right-10 opacity-5">
          <div className="w-40 h-40 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-2xl"></div>
        </FloatingElement>

        {/* Quote mark decorations */}
        <FloatingElement delay={0.5} className="top-1/4 left-1/4 opacity-10">
          <div className="text-4xl text-green-300 font-serif">"</div>
        </FloatingElement>
        
        <FloatingElement delay={1} className="bottom-1/4 right-1/4 opacity-10">
          <div className="text-4xl text-blue-300 font-serif rotate-180">"</div>
        </FloatingElement>

        {/* Floating particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <FloatingElement 
            key={i} 
            delay={i * 0.8} 
            duration={4000 + i * 300}
            className={`${i % 2 === 0 ? 'top-' : 'bottom-'}${20 + i * 10}% ${i % 2 === 0 ? 'left-' : 'right-'}${10 + i * 15}% opacity-20`}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse"></div>
          </FloatingElement>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Animated heading */}
        <div 
          className={`text-center mb-16 transform transition-all duration-1000 ${
            inView ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}
        >
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 font-sans relative">
              <span className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 bg-clip-text text-transparent">
                What Our Clients Say
              </span>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 opacity-0 animate-[fadeInUp_1s_ease-in-out_1s_forwards]">
                <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              
              <div className="absolute -bottom-6 -right-6 opacity-0 animate-[fadeInUp_1s_ease-in-out_1.2s_forwards]">
                <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
              </div>
            </h2>
            
            {/* Subtitle */}
            <p 
              className={`text-gray-600 mt-4 text-lg transform transition-all duration-1000 delay-300 ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              Real experiences from real people who found hope and healing
            </p>
            
            {/* Animated underline */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-full scale-x-0 animate-[scaleX_1.2s_ease-in-out_0.8s_forwards]"></div>
          </div>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {feedbacks.map(({ name, role, feedback, img, color, bgGradient }, i) => (
            <div
              key={i}
              className={`group relative transform transition-all duration-700 ease-out ${
                inView 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-12 opacity-0 scale-95'
              } hover:scale-105 hover:-translate-y-2`}
              style={{ transitionDelay: `${300 + i * 200}ms` }}
            >
              {/* Card background with gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-2xl`}></div>
              
              {/* Main card */}
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center flex flex-col items-center border border-gray-100 group-hover:border-transparent">
                
                {/* Animated quote mark */}
                <div className="absolute top-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>

                {/* Profile image with animated border */}
                <div className="relative mb-6">
                  <div className={`absolute -inset-2 bg-gradient-to-r ${color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse`}></div>
                  <div className="absolute -inset-1 bg-white rounded-full"></div>
                  <img
                    src={img}
                    alt={name}
                    className="relative w-20 h-20 rounded-full object-cover transform group-hover:scale-110 transition-transform duration-300 ring-4 ring-white shadow-lg"
                  />
                  
                  {/* Online indicator */}
                  <div className={`absolute bottom-1 right-1 w-6 h-6 bg-gradient-to-r ${color} rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg`}>
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                {/* Star rating */}
                <AnimatedStars rating={5} delay={400 + i * 200} />

                {/* Name and role */}
                <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent group-hover:from-green-800 group-hover:to-green-700 transition-all duration-300`}>
                  {name}
                </h3>
                
                <p className={`text-sm font-medium mb-4 bg-gradient-to-r ${color} bg-clip-text text-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300`}>
                  {role}
                </p>

                {/* Feedback text */}
                <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300 italic">
                  "{feedback}"
                </p>

                {/* Animated bottom accent */}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-16 h-1 bg-gradient-to-r ${color} rounded-t-full transition-all duration-500`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-action section */}
        <div 
          className={`text-center mt-16 transform transition-all duration-1000 delay-1000 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of others who have found hope, healing, and happiness through our compassionate mental health services.
            </p>
            
            <button className="group bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              
              <span className="relative z-10 flex items-center gap-2">
                Get Started Today
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleX {
          0% { transform: translateX(-50%) scaleX(0); }
          100% { transform: translateX(-50%) scaleX(1); }
        }
      `}</style>
    </div>
  );
}