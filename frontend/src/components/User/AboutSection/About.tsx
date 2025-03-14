export default function AboutUsSection() {
  return (
    <section className="my-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Image */}
          <div className="relative mx-auto md:mx-0 mt-10 mb-16 md:mb-24 max-w-full">
            {/* White shadow element - Positioned outside parent and rotated */}
            <div className="absolute right-30-bottom-2 bg-black w-full max-w-[450px] lg:max-w-[500px] h-full rounded-3xl transform -rotate-6 z-0 opacity-10"></div>

            {/* Image container */}
            <div className="relative h-[400px] w-full max-w-[450px] lg:max-w-[500px] rounded-3xl overflow-hidden shadow-xl z-10">
              <img
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop"
                alt="Insource X Technologies Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl text-blue-900 font-bold mb-2">About</h2>
              <h3 className="text-4xl font-bold text-blue-400 mb-6">
                Insource X Technologies
              </h3>
            </div>
            <p className="text-lg leading-relaxed">
              We are a leading technology partner that empowers businesses to
              thrive in the digital age. With a team of skilled professionals
              and a proven track record of success, we deliver innovative and
              results-driven solutions tailored to your unique needs.
            </p>
            <div className="pt-4">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-4xl hover:from-blue-600 hover:to-blue-400 transition-colors duration-300 font-medium shadow-md">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
