import { IAboutFormData, IService } from "../types";

/** Client-preview fallbacks — used only when API returns no usable data. */

export const DUMMY_ABOUT: IAboutFormData = {
  name: "Insource Bridge Technologies",
  email: "info@insourcextech.com",
  phone: "+971 58 105 3524",
  location: "Dubai, United Arab Emirates",
  timing: "Sun – Thu, 9:00 AM – 6:00 PM",
  about:
    "We design and deliver modern IT solutions across the GCC — helping businesses modernize operations, strengthen security, and scale with confidence. From consulting to implementation, our team focuses on practical outcomes and long-term partnership.",
  vision:
    "To be the most trusted technology partner in the GCC, enabling organizations to innovate faster and operate with clarity.",
  mission:
    "Deliver reliable, scalable digital solutions that solve real business problems — with transparency, craftsmanship, and measurable impact.",
};

type WhyUsItem = { title: string; description: string };

export const DUMMY_WHY_US: WhyUsItem[] = [
  {
    title: "Proven Expertise",
    description:
      "Seasoned engineers and consultants with deep experience across cloud, software, and enterprise systems.",
  },
  {
    title: "Outcome Focused",
    description:
      "Every engagement is scoped around clear goals, timelines, and business results — not just deliverables.",
  },
  {
    title: "GCC Ready",
    description:
      "Local context, regional compliance awareness, and support models built for Middle East operations.",
  },
  {
    title: "Dedicated Partnership",
    description:
      "A collaborative approach with transparent communication from discovery through ongoing support.",
  },
];

const img = {
  a: "/Insourcebridgetech.png",
  b: "/hero-tech.png",
  c: "/camera_man.png",
};

export const DUMMY_SERVICES: IService[] = [
  {
    _id: "dummy-svc-1",
    title: "Cloud Solutions",
    image: img.a,
    content:
      "Migrate, optimize, and manage cloud infrastructure with secure, scalable architectures tailored to your growth.",
    subservices: [
      {
        title: "Cloud Migration",
        description: "Plan and execute seamless moves to AWS, Azure, or GCP.",
        image: img.b,
      },
      {
        title: "Managed Cloud",
        description: "Ongoing monitoring, cost control, and reliability operations.",
        image: img.c,
      },
    ],
  },
  {
    _id: "dummy-svc-2",
    title: "Custom Software",
    image: img.b,
    content:
      "Build web and mobile products that fit your workflows — from MVPs to enterprise platforms.",
    subservices: [
      {
        title: "Web Applications",
        description: "Responsive, high-performance apps for customers and teams.",
        image: img.a,
      },
    ],
  },
  {
    _id: "dummy-svc-3",
    title: "Cybersecurity",
    image: img.c,
    content:
      "Protect systems and data with assessments, hardening, and continuous security practices.",
    subservices: [],
  },
  {
    _id: "dummy-svc-4",
    title: "IT Consulting",
    image: img.a,
    content:
      "Strategic guidance on architecture, digital transformation, and technology roadmaps.",
    subservices: [],
  },
  {
    _id: "dummy-svc-5",
    title: "Managed Support",
    image: img.b,
    content:
      "Reliable helpdesk and infrastructure support so your teams can stay focused on the business.",
    subservices: [],
  },
  {
    _id: "dummy-svc-6",
    title: "Data & Analytics",
    image: img.c,
    content:
      "Turn operational data into clear dashboards and insights that drive better decisions.",
    subservices: [],
  },
];

export const DUMMY_SOLUTIONS: IService[] = [
  {
    _id: "dummy-sol-1",
    title: "Enterprise Resource Suite",
    image: img.a,
    content: "Integrated operations platform for finance, inventory, and reporting.",
    subservices: [],
  },
  {
    _id: "dummy-sol-2",
    title: "Smart Workplace Portal",
    image: img.b,
    content: "Employee self-service, approvals, and internal communications in one place.",
    subservices: [],
  },
  {
    _id: "dummy-sol-3",
    title: "Retail Omnichannel Hub",
    image: img.c,
    content: "Unify store, e-commerce, and inventory for a seamless customer journey.",
    subservices: [],
  },
  {
    _id: "dummy-sol-4",
    title: "Secure Access Gateway",
    image: img.a,
    content: "Identity-aware access and monitoring for hybrid teams and remote sites.",
    subservices: [],
  },
  {
    _id: "dummy-sol-5",
    title: "IoT Operations Dashboard",
    image: img.b,
    content: "Real-time visibility into devices, alerts, and field performance metrics.",
    subservices: [],
  },
  {
    _id: "dummy-sol-6",
    title: "Customer Experience Suite",
    image: img.c,
    content: "CRM, support workflows, and engagement tools built for regional teams.",
    subservices: [],
  },
];

export function pickList<T>(items: T[] | undefined | null, fallback: T[]): T[] {
  return Array.isArray(items) && items.length > 0 ? items : fallback;
}

export function pickAbout(
  about: IAboutFormData | undefined | null
): IAboutFormData {
  if (!about) return DUMMY_ABOUT;
  const hasContent = Boolean(
    about.about?.trim() ||
      about.name?.trim() ||
      about.vision?.trim() ||
      about.mission?.trim()
  );
  return hasContent ? about : DUMMY_ABOUT;
}

export function pickWhyUs(
  items: WhyUsItem[] | undefined | null
): WhyUsItem[] {
  const usable =
    Array.isArray(items) &&
    items.some((item) => Boolean(item?.title?.trim() || item?.description?.trim()));
  return usable ? items! : DUMMY_WHY_US;
}
