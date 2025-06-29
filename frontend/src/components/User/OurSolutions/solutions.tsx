import CustomCarousel from "../Carousel/carousel"

export default function Home() {
  return (
    <main id="solutions" className="flex items-center justify-center !py-8 md:p-10 scroll-mt-5">
      <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Solutions</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <CustomCarousel />
      </div>
    </main>
  )
}