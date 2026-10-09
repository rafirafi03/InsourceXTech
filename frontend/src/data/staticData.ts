import { IAboutResponse, IService } from "../types";

export const staticAbout: IAboutResponse & {
  aboutCompany: { _id: string; __v: number };
} = {
  success: true,
  aboutCompany: {
    _id: "67d5c42da222b343eca90f57",
    name: "Insource Bridge Technologies",
    email: "info@insourcextech.com",
    phone: "+971 585883524",
    location:
      "Residence 1072, Block B - Offices Entrance, Office # C1-012 - Al Muteena, Dubai - United Arab Emirates",
    timing: "Mon to Sat - 9 AM to 5 PM",
    about:
      "We are a leading technology partner that empowers businesses to thrive in the digital age. With a team of skilled professionals and a proven track record of success, we deliver innovative and results-driven solutions tailored to your unique needs.",
    mission:
      " Our mission is to deliver exceptional technology solutions and services. We strive to continuously improve our products, services, and processes to ensure optimal client satisfaction. By building strong, long-term partnerships, we empower businesses to grow, improve efficiency, and gain a competitive advantage.",
    vision:
      "To be the leading provider of innovative IT solutions in the GCC region, allowing businesses to achieve their full potential through technology and upholding international standards of excellence.",
    __v: 0,
  },
};

type StaticService = IService & {
  createdAt: string;
  updatedAt: string;
  __v: number;
  subservices: (IService["subservices"][number] & { _id: string })[];
};

export const staticServices: { success: boolean; services: StaticService[] } = {
  success: true,
  services: [
    {
      _id: "689e10eb25db52c9230a8c13",
      title: "Network Solution & System Integration",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1755189483/insourcextech/1755189481035-How%20Does%20a%20Computer%20Network%20Work_%20A%20Beginner%C3%A2%C2%80%C2%99s%20Guide.jpeg.jpg",
      content:
        "We provide comprehensive network solutions to ensure seamless connectivity, security, and performance for businesses. Our system integration services help streamline IT infrastructure by integrating various technologies, enabling efficient communication and automation across your organization.",
      subservices: [],
      createdAt: "2025-08-14T16:38:03.681Z",
      updatedAt: "2025-08-14T16:38:03.681Z",
      __v: 0,
    },
    {
      _id: "689e14fc25db52c9230a8c1c",
      title: "Enterprise Mobility Solution",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1755190517/insourcextech/1755190515240-enterprise-mobility.jpg.jpg",
      content:
        "We provide cutting-edge Enterprise Mobility solutions that empower your workforce to stay connected, productive, and secure-anytime, anywhere. Our services enable seamless integration of mobile technologies into your business operations, ensuring flexibility without compromising data security. From mobile device management to custom enterprise apps, we deliver scalable, secure, and user-friendly mobility solutions designed to enhance collaboration, streamline workflows, and drive business efficiency.",
      subservices: [
        {
          _id: "689e14fc25db52c9230a8c1d",
          title: "Bulk SMS",
          description:
            "We deliver powerful Bulk SMS solutions to help businesses connect with their audience instantly and effectively. Our platform ensures fast, reliable, and secure message delivery, enabling you to send promotional offers, alerts, and important updates at scale. With features like personalized messaging, scheduling, and real-time analytics, we make communication simple and impactful. From marketing campaigns to transactional messages, our Bulk SMS service is designed to enhance engagement, boost conversions, and keep your customers informed anytime, anywhere.",
          image:
            "https://res.cloudinary.com/dn268vfpi/image/upload/v1755190519/insourcextech/1755190516548-bulk%20sms.png.png",
        },
        {
          _id: "689e14fc25db52c9230a8c1e",
          title: "Bulk Voice",
          description:
            "We provide robust Bulk Voice solutions that enable businesses to deliver clear, impactful voice messages to thousands of customers in just a few clicks. Our platform ensures fast, reliable, and secure delivery, making it ideal for promotions, alerts, reminders, and important notifications. With features like text-to-speech, personalized messaging, scheduling, and real-time reporting, we help you create effective campaigns that engage your audience and build stronger connections. Reach more customers effortlessly and make your communication truly voice-driven.",
          image:
            "https://res.cloudinary.com/dn268vfpi/image/upload/v1755190519/insourcextech/1755190518361-bulk-voice-call-service.jpeg.jpg",
        },
        {
          _id: "689e14fc25db52c9230a8c1f",
          title: "Bulk Email",
          description:
            "We offer advanced Bulk Email solutions designed to help businesses communicate effectively with their audience at scale. Our service ensures high deliverability, personalized messaging, and secure email campaigns that engage and convert. From promotional emails to transactional notifications, we provide a robust, user-friendly platform that streamlines your email marketing efforts while maintaining compliance and optimizing performance. Drive better engagement, build stronger connections, and achieve measurable results with our reliable Bulk Email solutions.",
          image:
            "https://res.cloudinary.com/dn268vfpi/image/upload/v1755190520/insourcextech/1755190518649-bulk-email-new.png.png",
        },
        {
          _id: "689e14fc25db52c9230a8c20",
          title: "Missed Call Alerts",
          description:
            "We offer smart Missed Call Alert solutions that provide businesses with an easy and cost-effective way to engage customers and capture leads. With a simple missed call, your customers can show interest, verify their number, or subscribe to your services-all without any cost to them. Our platform ensures real-time alerts, automated responses, and detailed analytics to help you track and manage interactions effectively. From lead generation to feedback collection, our Missed Call Alert service is designed to simplify engagement and enhance customer experience.",
          image:
            "https://res.cloudinary.com/dn268vfpi/image/upload/v1755190520/insourcextech/1755190518649-Missed-Call-Alert.webp.webp",
        },
      ],
      createdAt: "2025-08-14T16:55:24.396Z",
      updatedAt: "2025-08-14T16:55:24.396Z",
      __v: 0,
    },
    {
      _id: "689e161025db52c9230a8c2f",
      title: "IT INFRASTRUCTURE BUILD & MANAGE",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1755190799/insourcextech/1755190798440-Smart%20IT_%20Manage%20your%20IT%20infrastructure%20with%20ease%20and%20confidence.jpeg.jpg",
      content:
        "We design, deploy, and manage robust IT infrastructure tailored to your business needs. Our services ensure seamless integration of hardware, software, and networks, providing scalability, security, and high performance. From initial setup to ongoing maintenance, we help optimize your IT environment for efficiency and reliability.",
      subservices: [],
      createdAt: "2025-08-14T17:00:00.572Z",
      updatedAt: "2025-08-14T17:00:00.572Z",
      __v: 0,
    },
    {
      _id: "689e167625db52c9230a8c3a",
      title: "Staff Augmentation",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1755190902/insourcextech/1755190900373-How%20Do%20You%20Offer%20Staff%20Augmentation%20Services_.jpeg.jpg",
      content:
        "We provide skilled IT professionals to seamlessly integrate with your existing team, helping you scale your workforce based on project demands. Our staff augmentation services ensure access to experienced developers, engineers, and IT specialists, reducing hiring time and costs while maintaining productivity and efficiency.",
      subservices: [],
      createdAt: "2025-08-14T17:01:42.757Z",
      updatedAt: "2025-08-14T17:01:42.757Z",
      __v: 0,
    },
    {
      _id: "689e16ed25db52c9230a8c4b",
      title: "CLOUD INFRASTRUCTURE IMPLEMENTATION",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1755191021/insourcextech/1755191019219-The%20Role%20of%20Cloud%20Observability%20in%20Ensuring%20Security.jpeg.jpg",
      content:
        "We provide end-to-end cloud infrastructure implementation services to help businesses migrate, deploy, and optimize their IT operations in the cloud. Our solutions include cloud architecture design, migration, security, and ongoing management, ensuring scalability, high availability, and cost efficiency.",
      subservices: [],
      createdAt: "2025-08-14T17:03:41.506Z",
      updatedAt: "2025-08-14T17:03:41.506Z",
      __v: 0,
    },
    {
      _id: "689e262539f593fccab07802",
      title: "ENTERPRISE ARCHITECTURE CONSULTING",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1755194916/insourcextech/1755194915764-enterprise_architecture_consulting.jpeg.jpg",
      content:
        "We help businesses design and implement scalable, efficient, and future-ready IT architectures. Our enterprise architecture consulting services ensure seamless alignment between technology and business goals, optimizing workflows, enhancing security, and driving digital transformation. With our expertise, organizations can improve agility, reduce costs, and achieve long-term operational excellence.",
      subservices: [],
      createdAt: "2025-08-14T18:08:37.098Z",
      updatedAt: "2025-08-14T18:08:37.098Z",
      __v: 0,
    },
    {
      _id: "689e267e39f593fccab0780c",
      title: "SOFTWARE & WEB DEVELOPMENT",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1755195005/insourcextech/1755195004966-software_development.jpeg.jpg",
      content:
        "We deliver high-quality software and web development solutions tailored to your business needs. Our expertise spans modern technologies, ensuring secure, scalable, and user-friendly applications. From custom software to responsive web platforms, we focus on performance, seamless user experience, and innovation to drive business growth.",
      subservices: [],
      createdAt: "2025-08-14T18:10:06.286Z",
      updatedAt: "2025-08-14T18:10:06.286Z",
      __v: 0,
    },
    {
      _id: "689e26aa39f593fccab0780e",
      title: "CYBER SECURITY FRONT AND CENTER",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1755195050/insourcextech/1755195049639-DISATEK.jpeg.jpg",
      content:
        "We prioritize cybersecurity to safeguard your business from evolving threats. Our comprehensive security solutions include risk assessment, threat detection, data protection, and compliance management. By integrating cutting-edge security measures, we ensure your digital assets remain protected, resilient, and compliant with industry standards.",
      subservices: [],
      createdAt: "2025-08-14T18:10:50.997Z",
      updatedAt: "2025-08-14T18:10:50.997Z",
      __v: 0,
    },
    {
      _id: "689e26d539f593fccab07810",
      title: "BUSINESS ANALYTICS & INTELLIGENCE SOLUTIONS",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1755195093/insourcextech/1755195092798-buisiness_analytics.jpeg.jpg",
      content:
        "We empower businesses with data-driven insights to enhance decision-making and drive growth. Our analytics and intelligence solutions include data visualization, predictive analytics, and performance tracking. By leveraging advanced technologies and AI-driven models, we help you uncover trends, optimize operations, and stay ahead in a competitive market.",
      subservices: [],
      createdAt: "2025-08-14T18:11:33.852Z",
      updatedAt: "2025-08-14T18:11:33.852Z",
      __v: 0,
    },
    {
      _id: "689e26fa39f593fccab07812",
      title: "Home Automation",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1755195129/insourcextech/1755195129033-Home_automation.jpeg.jpg",
      content:
        "We provide innovative home automation solutions that enhance convenience, security, and energy efficiency. Our smart systems integrate lighting, security, climate control, and entertainment, allowing seamless control through mobile apps or voice commands. With cutting-edge IoT technology, we transform homes into intelligent, connected spaces for a smarter and more comfortable living experience.",
      subservices: [],
      createdAt: "2025-08-14T18:12:10.147Z",
      updatedAt: "2025-08-14T18:12:10.147Z",
      __v: 0,
    },
    {
      _id: "689e271439f593fccab07814",
      title: "Extra Low Voltage",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1755195155/insourcextech/1755195154563-elv_system.jpg.jpg",
      content:
        "We design, install, and maintain ELV systems to enhance security, communication, and automation in commercial and residential spaces. Our solutions include CCTV surveillance, access control, fire alarm systems, structured cabling, and smart building technologies, ensuring safety, efficiency, and seamless connectivity.",
      subservices: [],
      createdAt: "2025-08-14T18:12:36.123Z",
      updatedAt: "2025-08-14T18:12:36.123Z",
      __v: 0,
    },
  ],
};

type StaticSolution = Pick<IService, "_id" | "title" | "image"> & { __v: number };

export const staticSolutions: { success: boolean; solutions: StaticSolution[] } = {
  success: true,
  solutions: [
    {
      _id: "67d7dd3b20aa6ddfc11263ad",
      title: "Meeting Solution",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1742200122/insourcextech/1742200119010-meeting.jpg.jpg",
      __v: 0,
    },
    {
      _id: "67d7ddf520aa6ddfc11263af",
      title: "WiFi Solution",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1742200309/insourcextech/1742200304393-wifiOg.jpg.jpg",
      __v: 0,
    },
    {
      _id: "67d7de0b20aa6ddfc11263b1",
      title: "Telephonic Solution",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1742200330/insourcextech/1742200326684-telephone.jpg.jpg",
      __v: 0,
    },
    {
      _id: "67d7de2720aa6ddfc11263b3",
      title: "Structure Cabling",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1742200358/insourcextech/1742200354400-structure%20cabling.jpg.jpg",
      __v: 0,
    },
    {
      _id: "67d7de3b20aa6ddfc11263b5",
      title: "Microsoft Software Licensing",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1742200379/insourcextech/1742200377084-microsoft.jpg.jpg",
      __v: 0,
    },
    {
      _id: "67d7de4d20aa6ddfc11263b7",
      title: "Audio Visual Products",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1742200396/insourcextech/1742200392627-audiovisual.jpg.jpg",
      __v: 0,
    },
    {
      _id: "67d7de5f20aa6ddfc11263b9",
      title: "CCTV Solutions",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1742200415/insourcextech/1742200411426-cctv.jpg.jpg",
      __v: 0,
    },
    {
      _id: "67d7de7920aa6ddfc11263bb",
      title: "TIME ATTENDANCE & ACCESS CONTROL SYSTEM SOLUTION",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1742200440/insourcextech/1742200436044-attendanceMachine.png.png",
      __v: 0,
    },
    {
      _id: "67d7de8e20aa6ddfc11263bd",
      title: "Intercom Solution",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1742200461/insourcextech/1742200454254-intercom.jpg.jpg",
      __v: 0,
    },
    {
      _id: "67d7dea120aa6ddfc11263bf",
      title: "ANPR Solution",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1742200480/insourcextech/1742200474924-anprSolution.jpg.jpg",
      __v: 0,
    },
    {
      _id: "67d7debc20aa6ddfc11263c1",
      title: "TURNSTILE AND SPEED GATES SOLUTION",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1742200507/insourcextech/1742200502224-tunstile.jpg.jpg",
      __v: 0,
    },
    {
      _id: "67dc24d5ae758ba766b35096",
      title: "Automatic Gate Barrier Solution",
      image:
        "https://res.cloudinary.com/dn268vfpi/image/upload/v1742480595/insourcextech/1742480594167-automaticgatebarrier.jpg.jpg",
      __v: 0,
    },
  ],
};

export type StaticWhyUsItem = {
  _id: string;
  title: string;
  description: string;
  __v: number;
};

export const staticWhyUs: { success: boolean; whyUs: StaticWhyUsItem[] } = {
  success: true,
  whyUs: [
    {
      _id: "67d69b66fb497a674fa59369",
      title: "Value Added System Integrator",
      description:
        "Access to a wide range of infrastructure devices, including servers, storage, networking equipment, and end-point devices.",
      __v: 0,
    },
    {
      _id: "67d69b92fb497a674fa5936c",
      title: "Managed IT Services",
      description:
        "Comprehensive managed IT services, including network monitoring, security management, and on-site support.",
      __v: 0,
    },
    {
      _id: "67d69badfb497a674fa5936f",
      title: "Smart Solution",
      description:
        "Expertise in implementing innovative smart solutions for businesses, including smart homes, smart offices, and smart education.",
      __v: 0,
    },
    {
      _id: "67d69bcefb497a674fa59372",
      title: "Staff Augmentation",
      description:
        "Access to top-tier talent, allowing you to scale your team as needed, reduce hiring costs, and focus on core business objectives.",
      __v: 0,
    },
  ],
};
