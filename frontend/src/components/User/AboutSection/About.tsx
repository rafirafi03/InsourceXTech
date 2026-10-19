import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useSelector } from "react-redux";
import Loader from "../Loader/loader";
import { RootState } from "../../../store/store";
import { scrollHelper } from "../../../utils/scrollHelper";
import { Reveal } from "../Motion/Reveal";
export default function AboutUsSection() {
  const { data, isLoading } = useSelector((state: RootState) => state.about);
  const aboutData = data?.aboutCompany;

  const handleScroll = (section: string) => {
    scrollHelper(section);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section id="about" className="section-block">
      <div className="page-shell">
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal variant="left" className="order-2 flex flex-col justify-center lg:order-1">
            <p className="eyebrow">About us</p>
            <h2 className="display-title">
              WHAT OUR
              <br />
              <span className="accent-text">ADVANTAGES?</span>
            </h2>
            {aboutData?.name && (
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-2xl">
                {aboutData.name}
              </h3>
            )}
            <p className="section-copy max-w-lg">{aboutData?.about}</p>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              onClick={() => handleScroll("contact")}
              className="btn-accent mt-6"
            >
              Learn more
              <ArrowUpRight size={18} />
            </motion.button>
          </Reveal>

          <Reveal
            variant="right"
            className="order-1 h-full min-h-[18rem] lg:order-2 sm:min-h-[22rem]"
          >
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full min-h-[18rem] overflow-hidden rounded-[1.75rem] bg-[var(--color-muted)] sm:min-h-[22rem] sm:rounded-[2rem]"
            >
              <img
                src="/Insourcebridgetech.png"
                alt="Insource Bridge Technologies Team"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
