import "../../App.css";
import HeroSection from "../../components/User/HeroSection/HeroSection";
import Header from "../../components/User/Header/Header";
import AboutUs from "../../components/User/AboutSection/About";
import ContactComponent from "../../components/User/ContactSection/Contact";
import Services from "../../components/User/OurServices/Services";
import OurSoultions from "../../components/User/OurSolutions/solutions";
import MissionVisionComponent from "../../components/User/VisionAndMission/visionAndMission";
import WhyChooseUsComponent from "../../components/User/WhyChooseUsSection/WhyUs";
import Footer from "../../components/User/Footer/footer";
import WhatsAppButton from "../../components/User/Watsapp/WatsappWidget";
import SmoothScroll from "../../components/User/Motion/SmoothScroll";

function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen overflow-x-hidden bg-[var(--color-surface)]">
        <Header />
        <main className="pb-2">
          <HeroSection />
          <OurSoultions />
          <Services />
          <AboutUs />
          <MissionVisionComponent />
          <WhyChooseUsComponent />
          <ContactComponent />
          <Footer />
        </main>
        <WhatsAppButton />
      </div>
    </SmoothScroll>
  );
}

export default App;
