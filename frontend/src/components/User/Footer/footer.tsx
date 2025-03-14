import { Facebook, Twitter, Linkedin, Instagram, Mail, PhoneCall, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Company info */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl text-blue-900 font-bold mb-2">Insource X Technologies</h3>
            <p className="text-sm text-blue-900">Leading IT Solutions in the GCC Region</p>
          </div>
          
          {/* Contact info */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg text-blue-900 font-semibold mb-3">Contact Us</h4>
            <div className="flex items-center mb-2">
              <PhoneCall className="h-4 w-4 mr-2 text-blue-900" />
              <span className="text-sm text-blue-900">+123 456 7890</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-blue-900" />
              <span className="text-sm text-blue-900">contact@companyname.com</span>
            </div>
          </div>
          
          {/* Location */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg text-blue-900 font-semibold mb-3">Location</h4>
            <div className="flex items-start mb-2">
              <MapPin className="h-4 w-4 mr-2 text-blue-900 mt-1" />
              <span className="text-sm text-blue-900">
                123 Business Avenue, <br />
                Downtown District, <br />
                Dubai, UAE
              </span>
            </div>
          </div>
          
          {/* Working Hours */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg text-blue-900 font-semibold mb-3">Working Hours</h4>
            <div className="flex items-start">
              <Clock className="h-4 w-4 mr-2 text-blue-900 mt-1" />
              <div className="text-sm text-blue-900">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 1:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social links & Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-blue-900 hover:text-blue-700 transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-blue-900 hover:text-blue-700 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-blue-900 hover:text-blue-700 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-blue-900 hover:text-blue-700 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
          <p className="text-sm text-slate-400">© {currentYear} Insource X Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;