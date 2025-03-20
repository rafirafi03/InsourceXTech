import { useSelector } from 'react-redux';
import Loader from '../Loader/loader'
import { RootState } from '../../../store/store';
import { scrollHelper } from '../../../utils/scrollHelper';

export default function AboutUsSection() {

  const { data, isLoading } = useSelector((state: RootState) => state.about);

  const aboutData = data?.aboutCompany;

  const handleScroll = (section: string)=> {
    scrollHelper(section)
  }
  
  if(isLoading) {
    return <Loader/>
  }

  return (
    <section id='about' className="my-16 scroll-mt-35">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Image */}
          <div className="relative mx-auto md:mx-0 mt-10 mb-16 md:mb-24 max-w-full">
            {/* White shadow element - Positioned outside parent and rotated */}
            <div className="absolute right-30-bottom-2 bg-black w-full max-w-[450px] lg:max-w-[500px] h-full rounded-3xl transform -rotate-6 z-0 opacity-10"></div>

            {/* Image container */}
            <div className="relative h-[400px] w-full max-w-[450px] lg:max-w-[500px] rounded-3xl overflow-hidden shadow-xl z-10">
              <img
                src="/Insourcextech.png"
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
                {aboutData?.name}
              </h3>
            </div>
            <p className="text-lg leading-relaxed">
              {aboutData?.about}
            </p>
            <div className="pt-4">
              <button onClick={()=> handleScroll('contact')} className="px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-4xl hover:from-blue-600 hover:to-blue-400 transition-all duration-300 font-medium shadow-md transform hover:scale-105 cursor-pointer">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
