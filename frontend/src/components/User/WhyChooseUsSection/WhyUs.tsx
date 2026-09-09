import { motion } from "framer-motion";
import { Monitor, Target, Globe, Users } from "lucide-react";
import { useGetWhyUsQuery } from "../../../store/slices/apiSlices";
import Loading from "../Loader/loader";
import { Reveal, Stagger, StaggerItem } from "../Motion/Reveal";
import { easeOutExpo } from "../../../utils/motion";

const WhyChooseUsComponent = () => {
  const { data, isLoading } = useGetWhyUsQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  const features = [
    {
      icon: <Monitor className="h-6 w-6 text-white" />,
      title: data?.whyUs[0]?.title,
      description: data?.whyUs[0]?.description,
    },
    {
      icon: <Target className="h-6 w-6 text-white" />,
      title: data?.whyUs[1]?.title,
      description: data?.whyUs[1]?.description,
    },
    {
      icon: <Globe className="h-6 w-6 text-white" />,
      title: data?.whyUs[2]?.title,
      description: data?.whyUs[2]?.description,
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: data?.whyUs[3]?.title,
      description: data?.whyUs[3]?.description,
    },
  ];

  return (
    <section className="section-block">
      <div className="page-shell">
        <Reveal variant="blur" className="section-head text-center">
          <p className="eyebrow">Why us</p>
          <h2 className="display-title">
            WHY <span className="accent-text">CHOOSE US?</span>
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="flex h-full flex-col rounded-[1.5rem] bg-[var(--color-muted)] p-6 sm:p-7"
              >
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)]"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="font-display text-2xl uppercase leading-tight text-[var(--color-ink)]">
                  {feature.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-[var(--color-text-muted)]">
                  {feature.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default WhyChooseUsComponent;
