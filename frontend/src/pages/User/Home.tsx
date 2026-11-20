import HeroSection from "../../components/User/HeroSection/HeroSection";
import Header from "../../components/User/Header/Header";
import AboutUs from "../../components/User/AboutSection/About";
import CompanyDetails from "../../components/User/AboutSection/CompanyDetails";
import ContactComponent from "../../components/User/ContactSection/Contact";
import Services from "../../components/User/OurServices/Services";
import OurSolutions from "../../components/User/OurSolutions/solutions";
import MissionVisionComponent from "../../components/User/VisionAndMission/visionAndMission";
import WhyChooseUsComponent from "../../components/User/WhyChooseUsSection/WhyUs";
import Footer from "../../components/User/Footer/footer";
import WhatsAppButton from "../../components/User/Watsapp/WatsappWidget";
import SmoothScroll from "../../components/User/Motion/SmoothScroll";
import ArrowCursor from "../../components/User/Motion/ArrowCursor";
import Marquee from "../../components/User/Motion/Marquee";
import CurvedLoop from "../../components/User/Motion/CurvedLoop";
import ParticleSection from "../../components/User/ParticleSection/ParticleSection";
import { useMediaQuery, useServices, useWhyUs } from "../../Hooks/useSiteContent";

function Home() {
  const { whyUs } = useWhyUs();
  const { services } = useServices();
  const isNarrow = useMediaQuery("(max-width: 767px)");

  const whyUsTitles = whyUs.map((item) => item.title);
  const serviceTitles = services.map((item) => item.title);

  return (
    <SmoothScroll>
      <ArrowCursor />
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <Header />
        <main>
          <HeroSection />
          {/* Gently curved, draggable loop of the Why Us titles */}
          <div className="relative z-10 overflow-hidden bg-[var(--bg)] py-6 sm:py-10">
            <CurvedLoop
              marqueeText={whyUsTitles.join("  ✦  ")}
              className="font-display"
              shape="arc"
              curveAmount={isNarrow ? 60 : 90}
              fontSize={isNarrow ? 84 : 52}
              speed={1.4}
              color="#f5f7fb"
              separator="✦"
              edgeFade={0.35}
              scrollBoost={0.4}
            />
          </div>
          <AboutUs />
          <OurSolutions />
          <Marquee items={serviceTitles} speed={90} reverse />
          <Services />
          <ParticleSection />
          <MissionVisionComponent />
          <WhyChooseUsComponent />
          <CompanyDetails />
          <ContactComponent />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </SmoothScroll>
  );
}

export default Home;
