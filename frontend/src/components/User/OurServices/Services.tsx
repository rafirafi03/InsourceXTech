import { useGetServicesQuery } from "../../../store/slices/apiSlices";
import { IService } from "../../../types";
import Card from "../Card/Card";
import Loader from '../Loader/loader'

export default function App() {
  const { data: services, isLoading } = useGetServicesQuery(undefined);

  if(isLoading) {
    return <Loader/>
  }

  console.log("services:", services);

  return (
    <div id="services" className="scroll-mt-25">
      <div className="text-center m-16">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Services</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
      </div>

      <div className="pb-15 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services?.services?.map((service: IService) => (
            <Card key={service._id} title={service.title} image={service.image} content={service.content} />
          ))}
        </div>
      </div>
    </div>
  );
}
