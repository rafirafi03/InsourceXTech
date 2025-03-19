import CustomCarousel from "../Carousel/carousel"

export default function Home() {
  return (
    <main id="solutions" className="min-h-screen flex items-center justify-center p-4 md:p-8 scroll-mt-5">
      <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Soultions</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <CustomCarousel />
      </div>
    </main>
  )
}