import LabImage from "../assets/lab.png"; // adjust import accordingly

export default function About() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-10 gap-10">
      <img
        src={LabImage}
        alt="Mental Health Consultancy"
        className="max-h-[500px] w-auto max-w-full"
      />

      <div className="w-full md:w-1/2 text-center md:text-left">
        <p className="text-sm text-black font-semibold mb-2 uppercase tracking-wide">
          About Us
        </p>
        <h2 className="text-4xl font-bold text-black leading-tight mb-6">
          Discover the Faces <br /> Behind Our Mental <br /> Health Consultancy
        </h2>
        <p className="text-base text-gray-700 mb-8 leading-relaxed">
          At Mind Care, we believe mental well-being is the foundation of a
          healthy, fulfilling life. Our mission is to provide compassionate,
          confidential, and personalized mental health support to individuals
          from all walks of life. Through professional counseling,
          evidence-based therapy, and community-driven support, we empower you
          to navigate life’s challenges, build resilience, and achieve emotional
          balance. Our team of dedicated professionals is committed to creating
          a safe, non-judgmental space where you can openly express yourself,
          explore your thoughts and feelings, and work toward positive change.
          Whether you’re seeking guidance for stress, anxiety, depression, or
          personal growth, Mind Care is here to walk beside you—every step of
          the way.
        </p>
        <a
          href="/about"
          className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
        >
          See detail
        </a>
      </div>
    </div>
  );
}
