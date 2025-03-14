import { Monitor, Target, Globe, Users } from 'lucide-react';

const WhyChooseUsComponent = () => {
  const features = [
    {
      icon: <Monitor className="h-8 w-8 text-blue-600" />,
      title: "Value Added System Integrator",
      description: "Access to a wide range of infrastructure devices, including servers, storage, networking equipment, and end-point devices."
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Managed IT Services",
      description: "Comprehensive managed IT services, including network monitoring, security management, and on-site support."
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Smart Solution",
      description: "Expertise in implementing innovative smart solutions for businesses, including smart homes, smart offices, and smart education."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Staff Augmentation",
      description: "Access to top-tier talent, allowing you to scale your team as needed, reduce hiring costs, and focus on core business objectives."
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Why Choose Us?</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="relative flex flex-col items-center text-center">
              {/* Divider line except for the last item on desktop */}
              {index < features.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-gray-200"></div>
              )}
              
              <div className="rounded-full border-2 border-blue-100 bg-blue-50 p-4 mb-6">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-blue-800 mb-3">{feature.title}</h3>
              
              <p className="text-gray-600 leading-relaxed px-4">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsComponent;