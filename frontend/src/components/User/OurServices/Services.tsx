import { useGetServicesQuery } from "../../../store/slices/apiSlices";
import { IService } from "../../../types";
import Card from "../Card/Card";
import Loader from "../Loader/loader";
import { Reveal, Stagger, StaggerItem } from "../Motion/Reveal";
import { USE_STATIC_CONTENT } from "../../../constants";
import { staticServices } from "../../../data/staticData";

export default function App() {
  const query = useGetServicesQuery(undefined, { skip: USE_STATIC_CONTENT });
  const services = USE_STATIC_CONTENT ? staticServices : query.data;
  const isLoading = USE_STATIC_CONTENT ? false : query.isLoading;
  const serviceList: IService[] = Array.isArray(services?.services)
    ? services.services
    : [];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section id="services" className="section-block">
      <div className="page-shell">
        <Reveal variant="blur" className="section-head max-w-2xl">
          <p className="eyebrow">What we deliver</p>
          <h2 className="display-title">
            OUR <span className="accent-text">SERVICES</span>
          </h2>
          <p className="section-copy">
            Explore the capabilities that power modern businesses.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {serviceList.map((service: IService, index: number) => (
            <StaggerItem key={service._id}>
              <Card
                title={service.title}
                image={service.image}
                content={service.content}
                subservices={service.subservices}
                index={index}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
