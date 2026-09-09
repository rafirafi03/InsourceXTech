import CustomCarousel from "../Carousel/carousel";
import { Reveal } from "../Motion/Reveal";

export default function Home() {
  return (
    <section id="solutions" className="section-block">
      <div className="page-shell">
        <Reveal variant="blur" className="section-head text-center">
          <p className="eyebrow">Portfolio</p>
          <h2 className="display-title">
            OUR <span className="accent-text">SOLUTIONS</span>
          </h2>
        </Reveal>
        <Reveal variant="up" delay={0.1} className="relative z-10 overflow-visible">
          <CustomCarousel />
        </Reveal>
      </div>
    </section>
  );
}
