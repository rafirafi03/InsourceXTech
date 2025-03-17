import MissionCard from "../Card/Card";

export default function App() {
  return (
    <div>
      <div className="text-center m-16">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Services</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
      </div>

      <div className="pb-15 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <MissionCard />
          <MissionCard />
          <MissionCard />
          <MissionCard />
          <MissionCard />
          <MissionCard />
          <MissionCard />
          <MissionCard />
          <MissionCard />
          <MissionCard />
        </div>
      </div>
    </div>
  );
}
