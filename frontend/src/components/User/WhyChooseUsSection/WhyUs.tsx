import { Monitor, Target, Globe, Users } from 'lucide-react';
import { useGetWhyUsQuery } from '../../../store/slices/apiSlices';
import Loading from '../Loader/loader'

const WhyChooseUsComponent = () => {

  const {data, isLoading} = useGetWhyUsQuery(undefined);

  console.log("whyus data:", data)

  if(isLoading) {
    return <Loading/>
  }


  const features = [
    {
      icon: <Monitor className="h-8 w-8 text-blue-600" />,
      title: data?.whyUs[0]?.title,
      description: data?.whyUs[0]?.description
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: data?.whyUs[1]?.title,
      description: data?.whyUs[1]?.description
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: data?.whyUs[2]?.title,
      description: data?.whyUs[2]?.description
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: data?.whyUs[3]?.title,
      description: data?.whyUs[3]?.description
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Why Choose Us?</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 cursor-pointer">
          {features.map((feature, index) => (
            <div key={index} className="relative flex flex-col items-center text-center transition-all duration-300 hover:scale-105">
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