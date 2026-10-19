import { motion } from "framer-motion";
import { LightbulbIcon, CompassIcon } from "lucide-react";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import Loader from "../Loader/loader";
import { Reveal, Stagger, StaggerItem } from "../Motion/Reveal";

const MissionVisionComponent = () => {
  const { data, isLoading } = useSelector((state: RootState) => state.about);
  const about = data?.aboutCompany;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section id="mission" className="section-block">
      <div className="page-shell">
        <Reveal variant="blur" className="section-head max-w-2xl">
          <p className="eyebrow">Direction</p>
          <h2 className="display-title">
            VISION & <span className="accent-text">MISSION</span>
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          <StaggerItem>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="h-full rounded-[1.5rem] bg-[var(--color-muted)] p-6 sm:p-8"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-accent)]">
                <LightbulbIcon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-display text-3xl uppercase text-[var(--color-ink)]">
                Our Vision
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--color-text-muted)]">
                {about?.vision}
              </p>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="h-full rounded-[1.5rem] bg-[var(--color-panel)] p-6 text-white sm:p-8"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-accent)]">
                <CompassIcon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-display text-3xl uppercase">Our Mission</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-white/60">
                {about?.mission}
              </p>
            </motion.div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
};

export default MissionVisionComponent;
