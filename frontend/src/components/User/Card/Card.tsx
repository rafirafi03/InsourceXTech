import { Target } from "lucide-react";

interface pageProps {
  content?: string
}

const MissionCard = ({ content }: pageProps) => {
  return (
    <section className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)]">
      <div className="max-w-md mx-auto bg-blue-50 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-blue-100 h-full">
        <div className="h-full">
          {/* Left side - Mission statement */}
          <div className="md:w-full p-7 md:p-7 flex flex-col h-full">
            <div className="flex items-center mb-5">
              <Target className="text-blue-600 mr-3" size={28} />
              <h2 className="text-xl font-bold text-blue-500">Our Mission</h2>
            </div>

            <h3 className="text-xl font-bold text-black mb-6">
              Empowering Businesses Through Digital Innovation
            </h3>

            <p className="text-black/50 mb-3 leading-relaxed flex-grow">
              {content
                ? content
                : "At Insoure X Technologies, we are dedicated to transforming how businesses operate in the digital world."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionCard;