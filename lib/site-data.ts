import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  Blocks,
  Building2,
  Cable,
  CircuitBoard,
  Cpu,
  Factory,
  Globe,
  GraduationCap,
  HeartPulse,
  Home,
  Hotel,
  LayoutTemplate,
  MonitorSmartphone,
  Network,
  Radar,
  ShieldCheck,
  ShoppingBag,
  Store,
  Target,
  Users,
  Wifi,
  Zap,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
};

export type LinkItem = {
  label: string;
  href: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ServiceItem = {
  title: string;
  slug: string;
  description: string;
  bullets: string[];
  cta: string;
  icon: LucideIcon;
};

export type IndustryItem = {
  title: string;
  description: string;
  needs: string[];
  icon: LucideIcon;
};

export type ProductItem = {
  title: string;
  description: string;
  points: string[];
  icon: LucideIcon;
};

export type CaseStudy = {
  title: string;
  sector: string;
  challenge: string;
  solution: string;
  impact: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const siteConfig = {
  name: "ITQUEST AFRICA",
  tagline: "Engineering the Future of Connectivity",
  supportingPhrase: "Smart Networking, Digital Systems & IoT Solutions",
  description:
    "Premium networking infrastructure, web and digital systems, IT hardware supply, and IoT solutions for businesses, institutions, and modern residences in Zimbabwe.",
  location: "Zimbabwe",
  email: "info@itquestafrica.co.zw",
  phone: "+263 00 000 0000",
  hours: "Mon - Fri | 08:00 - 17:00",
};

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/iot", label: "IoT" },
  { href: "/products", label: "Products" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export const trustSignals = [
  "Reliable Infrastructure",
  "Modern Digital Solutions",
  "Expert Support",
  "Future-Ready Systems",
];

export const trustStrip = [
  "Networking Infrastructure",
  "Web & Digital Systems",
  "IT Hardware Supply",
  "Smart IoT Solutions",
];

export const companyStats = [
  { value: "End-to-End", label: "Technology delivery from sourcing to support" },
  { value: "Zimbabwe-Focused", label: "Built for local realities with regional ambition" },
  { value: "Enterprise-Ready", label: "Professional execution for growing organizations" },
];

export const servicePillars: ServiceItem[] = [
  {
    title: "Networking & Infrastructure",
    slug: "networking-infrastructure",
    description:
      "Enterprise and SME connectivity designed for reliability, performance, and long-term operational confidence.",
    bullets: [
      "Network design and architecture",
      "Router, switch, and wireless setup",
      "Structured installations and diagnostics",
      "Fibre-linked connectivity support",
    ],
    cta: "Plan a Network Upgrade",
    icon: Network,
  },
  {
    title: "Web & Digital Solutions",
    slug: "web-digital-solutions",
    description:
      "Elegant business websites, digital platforms, and modern web systems aligned to brand, growth, and usability goals.",
    bullets: [
      "Professional websites and landing pages",
      "Company profile and corporate presence builds",
      "Custom business portals and digital systems",
      "Hosting guidance and responsive development",
    ],
    cta: "Discuss a Digital Project",
    icon: Globe,
  },
  {
    title: "IT Hardware & Electronics Supply",
    slug: "it-hardware-electronics-supply",
    description:
      "Dependable sourcing for networking equipment, fibre components, electronics, and supporting technology products.",
    bullets: [
      "Routers, switches, and access points",
      "Fibre cables, modules, and accessories",
      "Connectivity hardware and peripherals",
      "Custom sourcing for operational needs",
    ],
    cta: "Request Product Sourcing",
    icon: CircuitBoard,
  },
  {
    title: "Smart Systems & IoT",
    slug: "smart-systems-iot",
    description:
      "Practical connected systems for monitoring, visibility, automation readiness, and more intelligent environments.",
    bullets: [
      "Environmental monitoring and alerts",
      "Smart office and facility concepts",
      "Remote visibility dashboards",
      "Modular connected infrastructure planning",
    ],
    cta: "Explore Smart Systems",
    icon: Cpu,
  },
];

export const reasonsToChoose: FeatureItem[] = [
  {
    title: "Modern Engineering Mindset",
    description:
      "We approach every engagement with structured technical thinking, current standards, and a focus on systems that remain effective as needs evolve.",
    icon: Target,
  },
  {
    title: "Reliable Sourcing and Supply",
    description:
      "From network hardware to supporting electronics, we help clients procure dependable equipment suited to their environment and budget priorities.",
    icon: ShieldCheck,
  },
  {
    title: "Tailored Delivery",
    description:
      "We design around real operational requirements instead of forcing one-size-fits-all setups that limit performance or future growth.",
    icon: Blocks,
  },
  {
    title: "Business-Focused Execution",
    description:
      "Our work is shaped by continuity, uptime, usability, and long-term value, not just technical completion.",
    icon: Building2,
  },
  {
    title: "Scalable Systems for Growth",
    description:
      "Whether the environment is a single office, a distributed institution, or a smart residential project, solutions are planned with expansion in mind.",
    icon: ArrowRight,
  },
  {
    title: "Professional Support Culture",
    description:
      "Clients need responsive guidance, credible communication, and dependable follow-through. That standard is built into the brand.",
    icon: Users,
  },
];

export const industries: IndustryItem[] = [
  {
    title: "Businesses & Offices",
    description:
      "Reliable connectivity, professional digital platforms, and scalable infrastructure for day-to-day business performance.",
    needs: ["Secure networking", "Professional websites", "Operational support"],
    icon: Building2,
  },
  {
    title: "Schools & Training Centers",
    description:
      "Structured connectivity, device support environments, and digital systems that serve administration, learning, and communication.",
    needs: ["Campus networking", "Portals and websites", "Hardware sourcing"],
    icon: GraduationCap,
  },
  {
    title: "Healthcare & Clinics",
    description:
      "Stable networks, digital visibility, and environmental monitoring for sensitive equipment, pharmacy storage, and operational continuity.",
    needs: ["Critical connectivity", "Monitoring alerts", "Professional systems"],
    icon: HeartPulse,
  },
  {
    title: "Hospitality & Lodges",
    description:
      "Guest-facing connectivity, operational networks, and smart visibility tools that support service quality and smoother facilities management.",
    needs: ["Guest Wi-Fi", "Back-office systems", "Remote monitoring"],
    icon: Hotel,
  },
  {
    title: "Retail & Commercial Spaces",
    description:
      "Connectivity, hardware supply, and practical smart systems that keep locations efficient, visible, and commercially ready.",
    needs: ["POS connectivity", "Equipment sourcing", "Cold storage monitoring"],
    icon: Store,
  },
  {
    title: "Premium Residential Clients",
    description:
      "High-quality home networking, connected devices, and discreet smart systems for secure, modern, well-managed living spaces.",
    needs: ["Whole-home Wi-Fi", "Smart visibility", "Premium support"],
    icon: Home,
  },
];

export const smartSenseFeatures: FeatureItem[] = [
  {
    title: "Real-Time Monitoring",
    description:
      "Track temperature, humidity, power conditions, and environmental changes in mission-critical spaces without manual checking.",
    icon: Radar,
  },
  {
    title: "Instant Threshold Alerts",
    description:
      "Set parameters and receive prompt notifications when readings shift beyond safe operating conditions.",
    icon: Activity,
  },
  {
    title: "Remote Dashboard Visibility",
    description:
      "Give managers, technical teams, and decision-makers a clear view of monitored environments from anywhere.",
    icon: MonitorSmartphone,
  },
  {
    title: "Flexible Connectivity",
    description:
      "Deploy with GSM or Wi-Fi options depending on site realities, reliability needs, and infrastructure maturity.",
    icon: Wifi,
  },
  {
    title: "Modular Sensor Expansion",
    description:
      "Start with a focused monitoring objective and extend into broader visibility requirements over time.",
    icon: Cable,
  },
  {
    title: "Historical Reporting",
    description:
      "Capture trends, document exceptions, and support operational decision-making with accessible records over time.",
    icon: LayoutTemplate,
  },
];

export const smartSenseUseCases: IndustryItem[] = [
  {
    title: "Server Rooms",
    description:
      "Monitor heat, humidity, power anomalies, and access events around networking and computing infrastructure.",
    needs: ["Temperature tracking", "Equipment protection", "Alert escalation"],
    icon: Cpu,
  },
  {
    title: "Pharmacy & Clinical Storage",
    description:
      "Support better visibility for temperature-sensitive supplies with automated alerts and reporting.",
    needs: ["Temperature integrity", "Compliance support", "Remote checks"],
    icon: HeartPulse,
  },
  {
    title: "Retail Refrigeration",
    description:
      "Reduce spoilage risk and improve oversight for refrigeration units in commercial environments.",
    needs: ["Cold chain visibility", "Threshold alerts", "Branch oversight"],
    icon: ShoppingBag,
  },
  {
    title: "Equipment Rooms",
    description:
      "Protect routers, switches, and auxiliary infrastructure in offices, institutions, and multi-site operations.",
    needs: ["Environment tracking", "Power awareness", "Unauthorized access alerts"],
    icon: Network,
  },
];

export const futureIoTCategories: FeatureItem[] = [
  {
    title: "Smart Energy Monitoring",
    description:
      "Track consumption, identify inefficiencies, and create better visibility around site power usage and resilience.",
    icon: Zap,
  },
  {
    title: "Environmental Monitoring",
    description:
      "Extend monitoring to facilities, storage environments, and sensitive equipment areas where conditions matter.",
    icon: Radar,
  },
  {
    title: "Office Automation",
    description:
      "Enable intelligent controls and operational triggers that improve convenience, efficiency, and oversight.",
    icon: LayoutTemplate,
  },
  {
    title: "Equipment Condition Alerts",
    description:
      "Build simple alerting layers around critical devices and infrastructure that should never fail silently.",
    icon: Activity,
  },
  {
    title: "Remote Visibility Systems",
    description:
      "Create connected dashboards that help teams manage distributed sites with confidence and faster response times.",
    icon: MonitorSmartphone,
  },
];

export const products: ProductItem[] = [
  {
    title: "Routers",
    description:
      "Business-ready routing options for branch offices, growing SMEs, institutions, and managed connectivity environments.",
    points: ["Office and branch deployment", "Reliable throughput", "Custom recommendations"],
    icon: Wifi,
  },
  {
    title: "Switches",
    description:
      "Structured switching capability for enterprise floors, institutional networks, and performance-sensitive operations.",
    points: ["Managed and unmanaged options", "Scalable port capacity", "Deployment guidance"],
    icon: Network,
  },
  {
    title: "Fibre Cables & Accessories",
    description:
      "Core fibre-linked components and accessories for robust connectivity projects and future-ready installations.",
    points: ["Cables and patch solutions", "Installation accessories", "Project-aligned sourcing"],
    icon: Cable,
  },
  {
    title: "Networking Components",
    description:
      "Connectivity hardware and supporting infrastructure for structured, dependable technology environments.",
    points: ["Modules and accessories", "Wireless support gear", "Operational essentials"],
    icon: CircuitBoard,
  },
  {
    title: "Selected Electronics",
    description:
      "Practical supporting electronics for business operations, technical deployments, and specialized infrastructure needs.",
    points: ["Business support devices", "Operational accessories", "Available on request"],
    icon: Factory,
  },
  {
    title: "Smart Devices",
    description:
      "Connected hardware relevant to monitoring, automation readiness, and emerging intelligent systems projects.",
    points: ["Sensor-capable devices", "Smart monitoring components", "Custom sourcing support"],
    icon: MonitorSmartphone,
  },
];

export const caseStudies: CaseStudy[] = [
  {
    title: "Network Modernization for a Growing Office",
    sector: "Corporate Workspace",
    challenge:
      "An expanding office required more stable wireless coverage, cleaner network architecture, and better support for daily operations.",
    solution:
      "ITQUEST AFRICA redesigned the connectivity layout, refreshed core hardware recommendations, and structured the deployment for improved reliability and future capacity.",
    impact:
      "The client gained stronger day-to-day network performance, a more professional infrastructure baseline, and a path for growth without a disruptive redesign.",
  },
  {
    title: "Digital Presence Transformation for a Local Business",
    sector: "SME / Professional Services",
    challenge:
      "The business needed a more credible digital presence that matched its service quality and converted interest into enquiries.",
    solution:
      "A modern website and clearer digital presentation were developed to improve brand perception, user confidence, and inquiry flow.",
    impact:
      "The resulting platform positioned the company more professionally and created a stronger first impression for prospective customers and partners.",
  },
  {
    title: "Structured Connectivity Setup for an Institution",
    sector: "Education",
    challenge:
      "The institution needed a more organized, supportable connectivity environment that could serve administrators, staff, and connected learning functions.",
    solution:
      "ITQUEST AFRICA mapped the environment, planned the structure, and supplied a cleaner, more scalable connectivity approach.",
    impact:
      "The institution benefited from a more dependable network foundation and improved readiness for future digital initiatives.",
  },
  {
    title: "Smart Environmental Monitoring Concept Deployment",
    sector: "Critical Equipment Space",
    challenge:
      "Sensitive infrastructure areas required better visibility into environmental conditions and faster response to risk events.",
    solution:
      "The SmartSense concept was positioned to monitor temperature, humidity, power conditions, and access-related events through a connected alerting workflow.",
    impact:
      "The monitoring layer added a more proactive operating model, reducing blind spots around critical systems and improving response confidence.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "ITQUEST AFRICA approached our requirements with a level of structure and professionalism that immediately stood out. The result felt considered, not improvised.",
    name: "Tawanda M.",
    role: "Operations Lead",
    company: "Regional Services Firm",
  },
  {
    quote:
      "Their understanding of both technology and business presentation helped us move from a basic setup to something far more credible and future-ready.",
    name: "Rumbidzai C.",
    role: "Director",
    company: "Private Education Group",
  },
  {
    quote:
      "What impressed us most was the balance between technical clarity, practical sourcing advice, and communication that stayed professional from start to finish.",
    name: "Nigel D.",
    role: "Facilities Manager",
    company: "Hospitality Brand",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What type of clients does ITQUEST AFRICA work with?",
    answer:
      "We serve SMEs, corporates, schools, healthcare providers, hospitality businesses, retail environments, institutions, NGOs, and premium residential clients that need dependable technology delivery.",
  },
  {
    question: "Can you support both infrastructure projects and digital platforms?",
    answer:
      "Yes. The brand is positioned around unified technology delivery, covering connectivity, web and digital systems, hardware sourcing, and practical smart systems.",
  },
  {
    question: "Is SmartSense intended only for large enterprises?",
    answer:
      "No. SmartSense is designed to be modular, making it suitable for focused monitoring needs in growing businesses, clinics, storage spaces, and technical environments.",
  },
  {
    question: "Do you offer custom sourcing support for products?",
    answer:
      "Yes. In addition to catalog categories, we can guide product selection and source equipment aligned to the operational requirements of each project.",
  },
];

export const aboutValues: FeatureItem[] = [
  {
    title: "Excellence",
    description:
      "We aim for work that is technically sound, visually refined, and professionally delivered.",
    icon: ShieldCheck,
  },
  {
    title: "Integrity",
    description:
      "Trust is built through clarity, honesty, and a consistent standard of responsible delivery.",
    icon: Users,
  },
  {
    title: "Reliability",
    description:
      "Technology should improve confidence, not create uncertainty. That principle shapes every solution.",
    icon: Network,
  },
  {
    title: "Innovation",
    description:
      "We pursue practical progress through current tools, connected systems, and modern thinking grounded in business value.",
    icon: Cpu,
  },
  {
    title: "Partnership",
    description:
      "The best results come from understanding client objectives and building around long-term relationships.",
    icon: Building2,
  },
  {
    title: "Growth",
    description:
      "We design for the realities of today while creating room for clients to scale with confidence tomorrow.",
    icon: Globe,
  },
];

export const footerLinks = {
  pages: navItems,
  services: servicePillars.map((service) => ({
    label: service.title,
    href: "/services",
  })),
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
  ] satisfies LinkItem[],
};

export const seoKeywords = [
  "IT services Zimbabwe",
  "networking solutions Zimbabwe",
  "web development Zimbabwe",
  "IoT solutions Zimbabwe",
  "IT hardware supply Zimbabwe",
  "smart systems Africa",
];
