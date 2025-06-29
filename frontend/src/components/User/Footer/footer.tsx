import { Mail, PhoneCall, MapPin, Clock } from 'lucide-react';
import { RootState } from '../../../store/store';
import Loader from '../Loader/loader'
import { useSelector } from 'react-redux';

const Footer = () => {
  const currentYear = new Date().getFullYear();

    const { data, isLoading } = useSelector((state: RootState) => state.about);
  
    const about = data?.aboutCompany

    if(isLoading) {
      return <Loader/>
    }
  
  return (
    <footer className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Company info */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl text-blue-900 font-bold mb-2">{about?.name}</h3>
            <p className="text-sm text-blue-900">Leading IT Solutions in the GCC Region</p>
          </div>
          
          {/* Contact info */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg text-blue-900 font-semibold mb-3">Contact Us</h4>
            <div className="flex items-center mb-2">
              <PhoneCall className="h-4 w-4 mr-2 text-blue-900" />
              <span className="text-sm text-blue-900">{about?.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-blue-900" />
              <span className="text-sm text-blue-900">{about?.email}</span>
            </div>
          </div>
          
          {/* Location */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg text-blue-900 font-semibold mb-3">Location</h4>
            <div className="flex items-start mb-2">
              <MapPin className="h-4 w-4 mr-2 text-blue-900 mt-1" />
              <span className="text-sm text-blue-900">
                {about?.location}
              </span>
            </div>
          </div>
          
          {/* Working Hours */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg text-blue-900 font-semibold mb-3">Working Hours</h4>
            <div className="flex items-start">
              <Clock className="h-4 w-4 mr-2 text-blue-900 mt-1" />
              <div className="text-sm text-blue-900">
                {about?.timing}
              </div>
            </div>
          </div>
        </div>
        
        {/* Social links & Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-700 items-center">

          <p className="text-sm text-center text-slate-400">© {currentYear} {about?.name}. All rights reserved.</p>
          <p className="text-sm text-center text-slate-400">Developed by <a className='text-blue-500' href="https://www.instagram.com/ra_fi_03/">Ahamad Rafi</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;