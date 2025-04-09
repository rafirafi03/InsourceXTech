import { scrollHelper } from "../../../utils/scrollHelper";

const HeroSection = () => {
  const handleScroll = (section: string) => {
    scrollHelper(section);
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden !p-0">
      {/* Background Rounded Elements (Behind Text) */}
      <div
        className="absolute -z-10 top-2/5 bg-indigo-100 rounded-full opacity-50 transform -translate-x-1/2"
        style={{
          width: "24rem",
          height: "24rem",
          animation: "pulse1 6s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute -z-10 right-90 bottom-2/5 bg-blue-200 rounded-full opacity-50 transform translate-x-1/2"
        style={{
          width: "20rem",
          height: "20rem",
          animation: "pulse2 8s ease-in-out infinite alternate",
        }}
      />

      {/* Hero Content */}
      <div className="max-w-3xl container mx-auto !px-0">
        <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight relative">
          <span
            className="inline-block"
            style={{ animation: "fadeInUp 1.6s ease-out forwards" }}
          >
            Transforming Business Through
          </span>
          <br />
          <span
            className="text-blue-600 inline-block"
            style={{
              animation: "fadeInSlide 1.9s ease-out 0.5s forwards",
              opacity: 0,
              transform: "translateY(20px)",
            }}
          >
            Innovative Technology
          </span>
        </h1>
        <p className="text-lg md:text-xl text-black/50 mb-8 font-sans font-medium relative">
          At Insource X Tech, we deliver cutting-edge solutions that drive
          growth, efficiency, and digital transformation for businesses of all
          sizes.
        </p>
        <div className="flex flex-wrap justify-center gap-4 relative">
          <button
            onClick={() => handleScroll("services")}
            className="px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full hover:from-blue-600 hover:to-blue-400 transition-all duration-300 font-medium shadow-md cursor-pointer transform hover:scale-105"
          >
            Explore Services
          </button>

          <button
            onClick={() => handleScroll("about")}
            className="px-8 py-3 border border-blue-500 text-blue-600 rounded-full hover:bg-white hover:text-blue-700 transition-all duration-300 font-medium shadow-sm cursor-pointer transform hover:scale-105"
          >
            About Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
