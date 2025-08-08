export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">
        About Mind Care
      </h1>

      {/* Website Description */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-green-700 mb-3">
          Who We Are
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Mind Care is a dedicated mental health platform that provides
          compassionate, confidential, and personalized mental wellness
          services. From counseling and therapy sessions to group support and
          coordinated care, our goal is to help individuals navigate challenges,
          build resilience, and achieve emotional balance. We believe mental
          well-being is essential for a fulfilling life and strive to make
          support accessible to everyone.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-green-700 mb-3">
          Our Mission & Vision
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to create a safe, non-judgmental environment where
          individuals feel empowered to share, heal, and grow. We envision a
          world where mental health is prioritized just as much as physical
          health — and where support is available to all, without stigma or
          barriers.
        </p>
      </section>

      {/* Developers Section */}
      <section>
        <h2 className="text-2xl font-semibold text-green-700 mb-3">
          Meet the Developers
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Mind Care was brought to life by a passionate team of developers,
          designers, and mental health advocates who believe in using technology
          for good. Our development team focuses on building user-friendly,
          secure, and reliable tools to connect people with the help they need.
        </p>

        {/* Developer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Developer"
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-green-800">John Doe</h3>
            <p className="text-sm text-gray-600">Frontend Developer</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              alt="Developer"
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-green-800">Jane Smith</h3>
            <p className="text-sm text-gray-600">Backend Developer</p>
          </div>
        </div>
      </section>
    </div>
  );
}
