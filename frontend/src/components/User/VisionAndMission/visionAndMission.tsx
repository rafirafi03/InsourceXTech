import { motion } from "framer-motion";
import { LightbulbIcon, CompassIcon } from "lucide-react";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import Loader from "../Loader/loader";
import { Reveal, Stagger, StaggerItem } from "../Motion/Reveal";
import { pickAbout } from "../../../data/dummyContent";

const MissionVisionComponent = () => {
  const { data, isLoading } = useSelector((state: RootState) => state.about);
  const about = pickAbout(data?.aboutCompany);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section id="mission" className="section-block">
      <div className="page-shell">
        <Reveal variant="blur" className="section-head max-w-2xl">
          <p className="eyebrow">Our purpose</p>
          <h2 className="display-title">
            GO BIG WITH <span className="accent-text">PURPOSE</span>
          </h2>
          <p className="section-copy">
            Driving technology excellence in the GCC region
          </p>
        </Reveal>

        <Reveal variant="scale" className="mb-4 overflow-hidden rounded-[1.75rem] bg-[var(--color-muted)] sm:mb-5 sm:rounded-[2rem]">
          <div className="grid items-center gap-6 p-5 sm:p-7 md:grid-cols-2 md:gap-8 md:p-8">
            <div>
              <h3 className="font-display text-4xl uppercase leading-none text-[var(--color-ink)] sm:text-5xl">
                Built for the next chapter
              </h3>
              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[var(--color-text-muted)]">
                Vision and mission that keep every engagement focused on
                measurable outcomes.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem]"
            >
              <img
                src="/Insourcebridgetech.png"
                alt="Insource Bridge Technologies"
                className="aspect-[16/10] w-full object-cover"
              />
            </motion.div>
          </div>
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
