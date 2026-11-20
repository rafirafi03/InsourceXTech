import { useRef } from "react";
import { useScroll } from "framer-motion";
import { useSelector } from "react-redux";
import Loader from "../Loader/loader";
import { RootState } from "../../../store/store";
import ScrollWords from "../Motion/ScrollWords";

export default function AboutUsSection() {
  const { data, isLoading } = useSelector((state: RootState) => state.about);
  const aboutData = data?.aboutCompany;

  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pinRef, offset: ["start start", "end end"] });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section id="about" className="relative bg-[var(--bg)]">
      {/* Pinned statement: words light up as you scroll */}
      <div ref={pinRef} className="relative h-[220vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
          <div className="glow-orb right-[-10rem] top-1/4 h-[28rem] w-[28rem] opacity-40" />
          <div className="shell relative">
            <div className="mb-8 sm:mb-12">
              <p className="eyebrow mb-5">About us</p>
              <h2 className="section-title">
                What our <span className="text-blue">advantages?</span>
              </h2>
            </div>

            {aboutData?.about && (
              <ScrollWords
                text={aboutData.about}
                progress={scrollYProgress}
                span={[0.05, 0.85]}
                className="max-w-6xl text-[clamp(1.35rem,3.4vw,3.1rem)] font-semibold leading-[1.22] tracking-[-0.01em]"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
