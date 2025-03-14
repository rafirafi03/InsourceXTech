import MissionCard from "../Card/Card"

export default function App () {
  return (
    <div>
        <div className="text-center m-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>


        <div className="flex flex-wrap justify-center pb-15 gap-6 md:justify-start">
          <MissionCard />
          <MissionCard />
          <MissionCard />
          <MissionCard />
          <MissionCard content={"jsahdfjshdffwhfeowehfwdg wdhiowfwoifhefw fweohf weofh wofw gwo gf"} />
          <MissionCard />
        </div>
    </div>
  )
}
