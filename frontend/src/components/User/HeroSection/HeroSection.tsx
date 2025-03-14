const HeroSection = () => {
  return (
    <section className="relative overflow-hidden px-3 py-5">
      {/* Background Design Element */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full opacity-50"></div>
      {/* <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-50 rounded-full opacity-50"></div>    */}

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          {/* Content */}
          <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Transforming Business Through
              <span className="text-blue-400"> Innovative Technology</span>
            </h1>
            <p className="text-lg mb-10 font-sans">
              At Insoure X Tech, we deliver cutting-edge solutions that drive
              growth, efficiency, and digital transformation for businesses of
              all sizes.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-4xl hover:from-blue-600 hover:to-blue-400 transition-colors duration-300 font-medium shadow-md">
                {" "}
                Explore Services
              </button>
              <button className="px-8 py-3 border border-blue-300 rounded-4xl hover:bg-white hover:text-blue-500 transition-colors duration-300 font-medium">
                Learn More
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              {/* Abstract tech shape decorations */}
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-500 rounded-lg opacity-20 transform rotate-12"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-indigo-500 rounded-full opacity-20"></div>

              {/* Image container with shadow and border */}
              <div className="relative rounded-lg shadow-xl overflow-hidden border-4 border-white">
                <img
                  src="/homeImage.png"
                  alt="Insoure X Tech team working on digital solutions"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
