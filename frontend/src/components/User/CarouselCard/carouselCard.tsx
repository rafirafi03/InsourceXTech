import { Card, CardHeader, CardBody, Image } from "@heroui/react";

export default function App() {
  return (
    <Card className="py-4 bg-blue-900 rounded-2xl transition-all duration-300 ease-in-out hover:scale-105">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <p className="text-tiny text-white uppercase font-bold">
          Wifi Solution
        </p>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://heroui.com/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
    </Card>
  );
}
