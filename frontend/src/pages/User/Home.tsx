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

function App() {
  return (
    <>
      <Header />
      <div className="pt-16">
        <HeroSection />
        <hr className="border-t border-black/20 w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto" />
        <OurSoultions />
        <hr className="border-t border-black/20 w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto" />
        <Services />
        <hr className="border-t border-black/20 w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto" />
        <AboutUs />
        <hr className="border-t border-black/20 w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto" />
        <MissionVisionComponent />
        <hr className="border-t border-black/20 w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto" />
        <WhyChooseUsComponent />
        <hr className="border-t border-black/20 w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto" />
        <ContactComponent />
        <hr className="border-t border-blue-900" />
        <Footer />
      </div>
      <WhatsAppButton/>
    </>
  );
}

export default App;
