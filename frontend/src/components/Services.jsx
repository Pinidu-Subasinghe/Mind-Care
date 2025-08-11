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
const FloatingElement = ({ delay = 0, duration = 4000, className = "", children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const animate = () => {
      const time = Date.now() / duration + delay;
      const newX = Math.sin(time) * 15;
      const newY = Math.cos(time * 0.7) * 10;
      setPosition({ x: newX, y: newY });
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [delay, duration]);

  return (
    <div
      className={`absolute ${className} transition-transform duration-100 ease-out`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {children}
    </div>
  );
};

// Animated counter for stats
const AnimatedCounter = ({ end, duration = 2000, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, hasStarted]);

  return (
    <span
      className="inline-block"
      ref={(el) => {
        if (el && !hasStarted) {
          const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
              setHasStarted(true);
              observer.disconnect();
            }
          });
          observer.observe(el);
        }
      }}
    >
      {prefix}{count}{suffix}
    </span>
  );
};

export default function Services() {
  const services = [
    {
      title: "Mental Counseling",
      desc: "Personalized one-on-one sessions with experienced counselors to help you navigate challenges, manage stress, and achieve emotional balance.",
      img: "https://www.pngmart.com/files/21/Counseling-PNG-Picture.png",
      alt: "Mental Counseling Illustration",
      color: "from-green-400 to-emerald-500",
      hoverColor: "from-green-500 to-emerald-600",
    },
    {
      title: "Therapy Sessions",
      desc: "Evidence-based therapy programs tailored to your needs, whether you're working through anxiety, depression, trauma, or personal growth goals.",
      img: "https://www.picktime.com/webassets/2021/img/business/cover-img/counseling-cover.png",
      alt: "Therapy Sessions Illustration",
      color: "from-blue-400 to-cyan-500",
      hoverColor: "from-blue-500 to-cyan-600",
    },
    {
      title: "Support Groups",
      desc: "Safe, judgment-free spaces where you can share experiences, gain understanding, and connect with others who truly relate to your journey.",
      img: "https://cdni.iconscout.com/illustration/premium/thumb/women-social-support-group-3744084-3128037.png",
      alt: "Support Groups Illustration",
      color: "from-purple-400 to-pink-500",
      hoverColor: "from-purple-500 to-pink-600",
    },
    {
      title: "Case Management",
      desc: "Coordinated mental health and wellness planning to ensure you receive comprehensive, ongoing support for every aspect of your well-being.",
      img: "https://png.pngtree.com/png-vector/20221019/ourmid/pngtree-patient-waiting-medical-test-result-in-hospital-png-image_6327925.png",
      alt: "Case Management Illustration",
      color: "from-orange-400 to-red-500",
      hoverColor: "from-orange-500 to-red-600",
    },
  ];

  const [visible, setVisible] = useState(false);
  const [sectionRef, inView] = useInView(0.3);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (inView) {
      setVisible(true);
    }
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      className="relative max-w-7xl mx-auto px-6 py-16 overflow-hidden"
      style={{ marginTop: 0 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large floating shapes */}
        <FloatingElement delay={0} className="top-20 left-10 opacity-10">
          <div className="w-64 h-64 bg-gradient-to-r from-green-300 to-blue-300 rounded-full blur-3xl"></div>
        </FloatingElement>
        
        <FloatingElement delay={Math.PI} className="bottom-20 right-10 opacity-10">
          <div className="w-48 h-48 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-3xl"></div>
        </FloatingElement>

        {/* Small floating particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <FloatingElement 
            key={i} 
            delay={i * 0.5} 
            duration={3000 + i * 200}
            className={`top-${20 + i * 10}% left-${10 + i * 10}% opacity-20`}
          >
            <div className={`w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse`}></div>
          </FloatingElement>
        ))}
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Left side with enhanced animations */}
        <div 
          className={`w-full md:w-1/3 text-center md:text-left transform transition-all duration-1000 ${
            inView ? 'translate-x-0 opacity-100' : 'md:-translate-x-full translate-y-8 opacity-0'
          }`}
        >
          {/* Animated heading */}
          <div className="relative mb-6">
            <h2 className="text-5xl font-bold text-green-800 mb-4 font-sans relative">
              <span className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 bg-clip-text text-transparent">
                Our Services
              </span>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-8 w-8 h-8 animate-bounce" style={{ animationDelay: '0.5s' }}>
                <svg className="w-full h-full text-green-500 opacity-60" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              
              {/* Animated underline */}
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-600 to-transparent rounded-full transform scale-x-0 animate-[scaleX_1.5s_ease-in-out_0.5s_forwards] origin-left"></div>
            </h2>
          </div>

          {/* Enhanced description with staggered animation */}
          <div 
            className={`transform transition-all duration-1000 delay-300 ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              At <strong className="text-green-700 font-bold">Mind Care</strong>, we believe mental well-being is just as important as physical health. 
              Our services are designed to guide you through every stage of your journey — from immediate emotional support to long-term personal growth.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you need professional counseling, structured therapy, group connection, or coordinated care, we're here to provide compassionate, expert guidance every step of the way.
            </p>
          </div>

          {/* Animated stats */}
          <div 
            className={`flex justify-center md:justify-start gap-8 mt-8 transform transition-all duration-1000 delay-500 ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <div className="text-center group cursor-pointer">
              <div className="text-2xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-200">
                <AnimatedCounter end={4} suffix="+" />
              </div>
              <div className="text-sm text-gray-600">Services</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-2xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-200">
                <AnimatedCounter end={1500} suffix="+" />
              </div>
              <div className="text-sm text-gray-600">Clients Served</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-2xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-200">
                <AnimatedCounter end={24} suffix="/7" />
              </div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
          </div>
        </div>

        {/* Right side with enhanced card animations */}
        <div 
          className={`w-full md:w-2/3 transform transition-all duration-1000 delay-200 ${
            inView ? 'translate-x-0 opacity-100' : 'md:translate-x-full translate-y-8 opacity-0'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map(({ title, desc, img, alt, color, hoverColor }, i) => (
              <div
                key={i}
                style={{ transitionDelay: `${400 + i * 150}ms` }}
                className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transform transition-all
                  duration-700 ease-out hover:shadow-2xl cursor-pointer max-w-sm mx-auto
                  ${inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}
                  hover:scale-105 hover:-translate-y-2`}
              >
                {/* Gradient background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Animated border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${hoverColor} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl`}></div>
                <div className="absolute inset-[2px] bg-white rounded-2xl"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Image section with hover effects */}
                  <div className="relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 group-hover:from-green-100 group-hover:to-blue-100 transition-all duration-300`}></div>
                    <img
                      src={img}
                      alt={alt}
                      className="relative w-full h-40 object-contain p-6 transform group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Floating icon */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className={`w-8 h-8 bg-gradient-to-r ${color} rounded-full flex items-center justify-center shadow-lg`}>
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="p-6 flex flex-col flex-grow text-left">
                    <h4 className="text-xl font-bold text-green-800 mb-3 font-sans group-hover:text-green-700 transition-colors duration-300">
                      {title}
                    </h4>
                    <p className="text-gray-600 flex-grow text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {desc}
                    </p>
                    
                    {/* Animated learn more link */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className={`text-sm font-semibold bg-gradient-to-r ${color} bg-clip-text text-transparent flex items-center gap-1`}>
                        Learn More
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes scaleX {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}