import React, { useState, useEffect, useRef } from "react";

// Enhanced Intersection Observer Hook
const useInView = (threshold = 0.1, rootMargin = "0px") => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
};

// Floating orbs with physics
const FloatingOrb = ({ size = 'w-4 h-4', color = 'from-emerald-400 to-cyan-400', delay = 0, className = '' }) => {
  const [position, setPosition] = useState({ x: 0, y: 0, opacity: 0.6 });

  useEffect(() => {
    const animate = () => {
      const time = Date.now() / 3000 + delay;
      const x = Math.sin(time) * 30 + Math.cos(time * 0.5) * 15;
      const y = Math.cos(time * 0.8) * 25 + Math.sin(time * 1.2) * 10;
      const opacity = 0.4 + Math.sin(time * 2) * 0.3;
      
      setPosition({ x, y, opacity });
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [delay]);

  return (
    <div
      className={`absolute ${className} ${size} pointer-events-none`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: position.opacity,
      }}
    >
      <div className={`w-full h-full bg-gradient-to-r ${color} rounded-full blur-sm shadow-lg`}>
        <div className="w-full h-full rounded-full bg-white opacity-30 animate-ping"></div>
      </div>
    </div>
  );
};

// Text reveal animation
const TextReveal = ({ children, delay = 0, direction = 'up' }) => {
  const [ref, inView] = useInView(0.1);
  
  const directionClasses = {
    up: inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
    down: inView ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0',
    left: inView ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0',
    right: inView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0',
  };

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-1000 ease-out ${directionClasses[direction]}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Animated section wrapper
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const [ref, inView] = useInView(0.1);
  
  return (
    <div
      ref={ref}
      className={`transform transition-all duration-1000 ease-out ${
        inView ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Developer card with hover effects
const DeveloperCard = ({ name, role, image, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatedSection delay={delay}>
      <div
        className="group relative bg-transparent backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-center border border-white/20 overflow-hidden transform hover:scale-105 hover:-translate-y-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-cyan-400/20 to-violet-400/20 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
        
        {/* Floating particles around card */}
        <div className="absolute inset-0 pointer-events-none">
          <FloatingOrb size="w-2 h-2" className="top-4 left-4" delay={0} />
          <FloatingOrb size="w-3 h-3" className="top-4 right-4" delay={Math.PI/2} color="from-violet-400 to-pink-400" />
          <FloatingOrb size="w-2 h-2" className="bottom-4 left-4" delay={Math.PI} color="from-cyan-400 to-blue-400" />
          <FloatingOrb size="w-2 h-2" className="bottom-4 right-4" delay={Math.PI*1.5} color="from-pink-400 to-emerald-400" />
        </div>

        {/* Profile image with advanced effects */}
        <div className="relative z-10 mb-6">
          <div className="relative inline-block">
            {/* Animated ring */}
            <div className={`absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 transition-all duration-700 ${isHovered ? 'animate-spin opacity-60' : 'opacity-30'}`} style={{ animationDuration: '3s' }}></div>
            <div className={`absolute -inset-1 rounded-full bg-gradient-to-r from-violet-400 via-pink-400 to-emerald-400 transition-all duration-500 ${isHovered ? 'opacity-40 blur-sm' : 'opacity-0'}`}></div>
            
            {/* Main image */}
            <img
              src={image}
              alt={`${name} - ${role}`}
              className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg transform transition-all duration-500 group-hover:scale-110"
            />
            
            {/* Pulsing dot indicator */}
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
          </div>
        </div>

        {/* Name with gradient text */}
        <h3 className="relative z-10 text-xl font-bold mb-2 bg-gradient-to-r from-emerald-600 via-cyan-600 to-violet-600 bg-clip-text text-transparent">
          {name}
        </h3>
        
        {/* Role with animated underline */}
        <p className="relative z-10 text-gray-600 font-medium">
          {role}
          <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`}></div>
        </p>

        {/* Skill tags */}
        <div className="relative z-10 mt-4 flex flex-wrap justify-center gap-2">
          {role.includes('Frontend') && (
            <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-emerald-100 to-cyan-100 text-emerald-700 rounded-full border border-emerald-200">
              React
            </span>
          )}
          {role.includes('Backend') && (
            <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-violet-100 to-pink-100 text-violet-700 rounded-full border border-violet-200">
              Node.js
            </span>
          )}
          <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 rounded-full border border-cyan-200">
            Mental Health
          </span>
        </div>

        {/* Shine effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transform -skew-x-12 transition-all duration-1000 ${isHovered ? 'translate-x-full opacity-20' : '-translate-x-full'}`}></div>
      </div>
    </AnimatedSection>
  );
};

// Animated statistics
const StatCounter = ({ value, label, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.1);

  useEffect(() => {
    if (!inView) return;
    
    const target = parseInt(value.replace(/\D/g, ''));
    const duration = 2000;
    let startTime;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    setTimeout(() => requestAnimationFrame(animate), delay);
  }, [inView, value, delay]);

  return (
    <div
      ref={ref}
      className={`text-center transform transition-all duration-1000 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
        {count}{value.includes('+') ? '+' : ''}{value.includes('%') ? '%' : ''}
      </div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
    </div>
  );
};

export default function AboutPage() {
  const [titleRef, titleInView] = useInView(0.1);
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Advanced background animation */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Morphing background shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-200/30 to-cyan-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-violet-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse transform -translate-x-1/2 -translate-y-1/2" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        
        {/* Floating orbs */}
        <FloatingOrb size="w-3 h-3" className="top-1/4 left-1/5" delay={0} />
        <FloatingOrb size="w-2 h-2" className="top-1/3 right-1/4" delay={Math.PI/3} color="from-violet-400 to-pink-400" />
        <FloatingOrb size="w-4 h-4" className="bottom-1/4 left-1/3" delay={Math.PI*2/3} color="from-cyan-400 to-blue-400" />
        <FloatingOrb size="w-2 h-2" className="bottom-1/3 right-1/3" delay={Math.PI} color="from-pink-400 to-emerald-400" />
        <FloatingOrb size="w-3 h-3" className="top-1/2 left-1/6" delay={Math.PI*4/3} />
        <FloatingOrb size="w-2 h-2" className="bottom-1/2 right-1/5" delay={Math.PI*5/3} color="from-emerald-400 to-cyan-400" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Enhanced Page Title */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 transform transition-all duration-1200 ${
            titleInView ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
          }`}
        >
          <div className="inline-block relative">
            <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-cyan-600 to-violet-600 bg-clip-text text-transparent leading-tight">
              About Mind Care
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-violet-400/20 rounded-2xl blur-xl opacity-60 animate-pulse"></div>
          </div>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed">
            Transforming lives through compassionate mental health support and innovative digital wellness solutions
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 p-8 bg-transparent backdrop-blur-sm rounded-3xl shadow-lg border border-white/20">
          <StatCounter value="1000+" label="Lives Changed" delay={200} />
          <StatCounter value="15+" label="Years Experience" delay={400} />
          <StatCounter value="98%" label="Success Rate" delay={600} />
          <StatCounter value="24/7" label="Support Available" delay={800} />
        </div>

        {/* Who We Are Section */}
        <AnimatedSection className="mb-16" delay={200}>
          <div className="bg-transparent backdrop-blur-sm rounded-3xl shadow-xl p-10 border border-white/20 relative overflow-hidden">
            {/* Section background effects */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-cyan-400/20 to-transparent rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <TextReveal delay={100}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-emerald-600 to-cyan-600 rounded-full"></div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-cyan-700 bg-clip-text text-transparent">
                    Who We Are
                  </h2>
                </div>
              </TextReveal>
              
              <TextReveal delay={300}>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Mind Care is a dedicated mental health platform that provides compassionate, confidential, and personalized mental wellness services. From counseling and therapy sessions to group support and coordinated care, our goal is to help individuals navigate challenges, build resilience, and achieve emotional balance. We believe mental well-being is essential for a fulfilling life and strive to make support accessible to everyone.
                </p>
              </TextReveal>
            </div>
          </div>
        </AnimatedSection>

        {/* Mission & Vision Section */}
        <AnimatedSection className="mb-16" delay={400}>
          <div className="bg-transparent backdrop-blur-sm rounded-3xl shadow-xl p-10 border border-white/20 relative overflow-hidden">
            {/* Section background effects */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-violet-400/20 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-44 h-44 bg-gradient-to-tr from-pink-400/20 to-transparent rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <TextReveal delay={100}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-violet-600 to-pink-600 rounded-full"></div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-pink-700 bg-clip-text text-transparent">
                    Our Mission & Vision
                  </h2>
                </div>
              </TextReveal>
              
              <TextReveal delay={300}>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Our mission is to create a safe, non-judgmental environment where individuals feel empowered to share, heal, and grow. We envision a world where mental health is prioritized just as much as physical health — and where support is available to all, without stigma or barriers.
                </p>
              </TextReveal>

              <TextReveal delay={500}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-6 bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl border border-emerald-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-emerald-700 mb-2">Our Mission</h3>
                    <p className="text-gray-600">Empowering healing through compassionate, accessible mental health support for all.</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-violet-50 to-pink-50 rounded-2xl border border-violet-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-violet-700 mb-2">Our Vision</h3>
                    <p className="text-gray-600">A world where mental health is prioritized equally with physical health, free from stigma.</p>
                  </div>
                </div>
              </TextReveal>
            </div>
          </div>
        </AnimatedSection>

        {/* Developers Section */}
        <div className="mb-16">
          <TextReveal delay={100}>
            <div className="text-center mb-12">
              <div className="inline-block relative">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-violet-600 bg-clip-text text-transparent mb-4">
                  Meet the Developers
                </h2>
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 to-violet-400/20 rounded-lg blur-lg"></div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Mind Care was brought to life by a passionate team of developers, designers, and mental health advocates who believe in using technology for good. Our development team focuses on building user-friendly, secure, and reliable tools to connect people with the help they need.
              </p>
            </div>
          </TextReveal>

          {/* Developer Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <DeveloperCard
              name="John Doe"
              role="Frontend Developer"
              image="https://randomuser.me/api/portraits/men/32.jpg"
              delay={200}
            />
            <DeveloperCard
              name="Jane Smith"
              role="Backend Developer"
              image="https://randomuser.me/api/portraits/women/65.jpg"
              delay={400}
            />
          </div>
        </div>

        {/* Call to Action Section */}
        <AnimatedSection className="text-center" delay={600}>
          <div className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-violet-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-violet-400/20"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands who have found support, healing, and hope through Mind Care's comprehensive mental health platform.
              </p>
              
              <button className="group bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                <span className="flex items-center gap-3">
                  Get Started Today
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}