import { motion, Variants } from 'framer-motion';
import { LightbulbIcon, CompassIcon } from 'lucide-react';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import Loader from '../Loader/loader';

const MissionVisionComponent = () => {
  const { data, isLoading } = useSelector((state: RootState) => state.about);
  const about = data?.aboutCompany;

  if (isLoading) {
    return <Loader />;
  }

  // Define animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      id='mission'
      className="rounded-lg overflow-hidden mt-15"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="bg-blue-900 rounded-lg py-6 px-6 text-center"
          variants={itemVariants}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">Our Purpose</h2>
          <p className="text-slate-300 mt-2">Driving technology excellence in the GCC region</p>
        </motion.div>
        
        {/* Content Container */}
        <motion.div
          className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 cursor-pointer"
          variants={containerVariants}
        >
          {/* Vision Section */}
          <motion.div
            className="bg-white/20 rounded-2xl shadow-sm p-6 flex flex-col h-full transition-all duration-300 ease-in-out hover:bg-blue-100 hover:scale-105"
            variants={itemVariants}
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-50 p-3 rounded-full">
                <LightbulbIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 ml-3">Our Vision</h3>
            </div>
            <p className="text-slate-700 font-medium leading-relaxed flex-grow">
              {about?.vision}
            </p>
          </motion.div>
          
          {/* Mission Section */}
          <motion.div
            className="bg-white/20 rounded-2xl shadow-sm p-6 flex flex-col h-full transition-all duration-300 ease-in-out hover:bg-blue-100 hover:scale-105"
            variants={itemVariants}
          >
            <div className="flex items-center mb-4">
              <div className="bg-emerald-50 p-3 rounded-full">
                <CompassIcon className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 ml-3">Our Mission</h3>
            </div>
            <p className="text-slate-700 font-medium leading-relaxed flex-grow">
              {about?.mission}
            </p>
          </motion.div>
        </motion.div>
        
        {/* Footer */}
        <motion.div
          className="px-6 pb-8 text-center"
          variants={itemVariants}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs mx-auto mb-6"></div>
          <p className="text-slate-500 text-sm md:text-base italic">Excellence in technology solutions</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MissionVisionComponent;