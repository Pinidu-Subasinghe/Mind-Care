import React, { useState, useEffect, useRef } from "react";

// You would import your actual lab image like this:
// import LabImage from "../assets/lab.png";

// For demo purposes, using a placeholder
import LabImage from "../assets/lab.png";

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

// Floating particles component
const FloatingParticle = ({ delay = 0, duration = 4000, className = "" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0, rotation: 0 });

  useEffect(() => {
    const animate = () => {
      const time = Date.now() / duration + delay;
      const newX = Math.sin(time) * 30;
      const newY = Math.cos(time * 0.8) * 20;
      const rotation = time * 20;
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
      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-60 animate-pulse"></div>
    </div>
  );
};

// Animated counter component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) return;
    
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
  }, [end, duration, hasAnimated]);

  return (
    <span
      className="inline-block"
      onAnimationStart={() => setHasAnimated(true)}
    >
      {count}{suffix}
    </span>
  );
};

export default function About() {
  const [sectionRef, inView] = useInView(0.3);
  const [textAnimated, setTextAnimated] = useState(false);

  useEffect(() => {
    if (inView && !textAnimated) {
      setTextAnimated(true);
    }
  }, [inView, textAnimated]);

  return (
    <div
      ref={sectionRef}
      className="relative flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating background shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-green-200/20 to-blue-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating particles */}
        <FloatingParticle delay={0} className="top-1/4 left-1/4" />
        <FloatingParticle delay={Math.PI / 2} className="top-1/3 right-1/4" />
        <FloatingParticle delay={Math.PI} className="bottom-1/4 left-1/3" />
        <FloatingParticle delay={Math.PI * 1.5} className="bottom-1/3 right-1/3" />
      </div>

      {/* Image Section with Animations */}
      <div
        className={`relative transform transition-all duration-1000 ${
          inView ? 'translate-x-0 opacity-100 scale-100' : 'md:-translate-x-full translate-y-8 opacity-0 scale-95'
        }`}
      >
        {/* Image container with hover effects */}
        <div className="relative group">
          {/* Animated border gradient */}
          <div className="absolute -inset-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
          
          {/* Main image */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
            <img
              src={LabImage}
              alt="Mental Health Consultancy"
              className="max-h-[500px] w-auto max-w-full transform group-hover:scale-105 transition-transform duration-700 filter group-hover:brightness-110"
            />
            
            {/* Overlay effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Orbiting elements around image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[520px] h-[520px] animate-spin" style={{ animationDuration: '20s' }}>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Text Content with Staggered Animations */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        {/* "About Us" tag */}
        <p 
          className={`text-sm text-black font-semibold mb-2 uppercase tracking-wide transform transition-all duration-700 ${
            textAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <span className="relative">
            About Us
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-600 to-transparent rounded-full transform scale-x-0 animate-[scaleX_1s_ease-in-out_0.8s_forwards] origin-left"></div>
          </span>
        </p>

        {/* Main heading with animated text reveal */}
        <h2 
          className={`text-4xl font-bold text-black leading-tight mb-6 transform transition-all duration-700 ${
            textAnimated ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <span className="inline-block">
            Discover the{' '}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
              Faces
            </span>
          </span>
          <br />
          <span className="inline-block" style={{ animationDelay: '0.5s' }}>
            Behind Our{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mental
            </span>
          </span>
          <br />
          <span className="inline-block" style={{ animationDelay: '1s' }}>
            Health{' '}
            <span className="bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
              Consultancy
            </span>
          </span>
        </h2>

        {/* Description with typewriter effect simulation */}
        <div 
          className={`text-base text-gray-700 mb-8 leading-relaxed transform transition-all duration-700 ${
            textAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <p className="mb-4">
            At <span className="font-semibold text-green-600">Mind Care</span>, we believe mental well-being is the foundation of a
            healthy, fulfilling life. Our mission is to provide compassionate,
            confidential, and personalized mental health support to individuals
            from all walks of life.
          </p>
          <p className="mb-4">
            Through professional counseling, evidence-based therapy, and community-driven support, we empower you
            to navigate life's challenges, build resilience, and achieve emotional
            balance.
          </p>
          <p>
            Our team of dedicated professionals is committed to creating
            a safe, non-judgmental space where you can openly express yourself,
            explore your thoughts and feelings, and work toward positive change.
            Whether you're seeking guidance for stress, anxiety, depression, or
            personal growth, <span className="font-semibold text-green-600">Mind Care</span> is here to walk beside you—every step of
            the way.
          </p>
        </div>

        {/* Animated stats row */}
        <div 
          className={`flex justify-center md:justify-start gap-8 mb-8 transform transition-all duration-700 ${
            textAnimated ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="text-center group cursor-pointer">
            <div className="text-2xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-200">
              {textAnimated && <AnimatedCounter end={1000} suffix="+" />}
            </div>
            <div className="text-sm text-gray-600">Clients Helped</div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-2xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-200">
              {textAnimated && <AnimatedCounter end={15} suffix="+" />}
            </div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-2xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-200">
              {textAnimated && <AnimatedCounter end={98} suffix="%" />}
            </div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>

        {/* Animated CTA button */}
        <div
          className={`transform transition-all duration-700 ${
            textAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <a
            href="/about"
            className="group relative inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-full font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
          >
            {/* Animated background shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            
            <span className="relative z-10 flex items-center gap-2">
              See Detail
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* Custom keyframes */}
      <style jsx>{`
        @keyframes scaleX {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}