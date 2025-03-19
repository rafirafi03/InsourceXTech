import { LightbulbIcon, CompassIcon } from 'lucide-react';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import Loader from '../Loader/loader'

const MissionVisionComponent = () => {

  const { data, isLoading } = useSelector((state: RootState) => state.about);

  const about = data?.aboutCompany

  if(isLoading) {
    return <Loader/>
  }

  return (
    <div id='mission' className="rounded-lg overflow-hidden mt-15">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-blue-900 rounded-lg py-6 px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Our Purpose</h2>
          <p className="text-slate-300 mt-2">Driving technology excellence in the GCC region</p>
        </div>
        
        {/* Content Container */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 cursor-pointer">
          {/* Vision Section */}
          <div className="bg-white/20 rounded-2xl shadow-sm p-6 flex flex-col h-full transition-all duration-300 ease-in-out hover:bg-blue-100 hover:scale-105">
          <div className="flex items-center mb-4">
              <div className="bg-blue-50 p-3 rounded-full">
                <LightbulbIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 ml-3">Our Vision</h3>
            </div>
            <p className="text-slate-700 font-medium leading-relaxed flex-grow">
              {about?.vision}
            </p>
          </div>
          
          {/* Mission Section */}
          <div className="bg-white/20 rounded-2xl shadow-sm p-6 flex flex-col h-full transition-all duration-300 ease-in-out hover:bg-blue-100 hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="bg-emerald-50 p-3 rounded-full">
                <CompassIcon className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 ml-3">Our Mission</h3>
            </div>
            <p className="text-slate-700 font-medium leading-relaxed flex-grow">
              {about?.mission}
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 pb-8 text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs mx-auto mb-6"></div>
          <p className="text-slate-500 text-sm md:text-base italic">Excellence in technology solutions</p>
        </div>
      </div>
    </div>
  );
};

export default MissionVisionComponent;