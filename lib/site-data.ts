import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  Bot,
  Blocks,
  Building2,
  Cable,
  Camera,
  CircuitBoard,
  CreditCard,
  Cpu,
  DoorClosed,
  Factory,
  Fingerprint,
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
  category: string;
  title: string;
  slug: string;
  description: string;
  bullets: string[];
  cta: string;
  icon: LucideIcon;
  featureSectionTitle?: string;
  featureSectionDescription?: string;
  featureCards?: FeatureItem[];
  useCasesTitle?: string;
  useCases?: string[];
  benefitsTitle?: string;
  benefits?: string[];
  ctaPanel?: {
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
};

export type IndustryItem = {
  title: string;
  description: string;
  needs: string[];
  icon: LucideIcon;
};

export type ProductItem = {
  slug: string;
  title: string;
  description: string;
  points: string[];
  icon: LucideIcon;
};

export type SearchItem = {
  title: string;
  description: string;
  href: string;
  type: "service" | "product" | "solution" | "page";
  keywords: string[];
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
    "Premium networking infrastructure, digital systems, AI-enabled business solutions, IT hardware supply, and IoT solutions for businesses, institutions, and modern residences in Zimbabwe.",
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
    category: "Infrastructure",
    title: "Networking & Infrastructure",
    slug: "networking-infrastructure",
    description:
      "Enterprise and SME connectivity solutions designed for dependable performance, structured deployment, and long-term operational confidence.",
    bullets: [
      "Network design and architecture",
      "Router, switch, and wireless deployment",
      "Office and branch connectivity planning",
      "Performance diagnostics and upgrades",
      "Fibre-linked connectivity support",
      "Scalable network expansion guidance",
    ],
    cta: "Plan Your Network Upgrade",
    icon: Network,
    featureSectionTitle: "Enterprise connectivity designed for stable performance and future growth",
    featureSectionDescription:
      "Professional networking services for organizations that need stronger reliability, better visibility, and infrastructure that can scale with demand.",
    featureCards: [
      {
        title: "Network Architecture Planning",
        description:
          "Design network layouts that support business continuity, cleaner deployment, and better long-term performance.",
        icon: Network,
      },
      {
        title: "Routing and Switching",
        description:
          "Configure routers and switches for structured traffic management, operational stability, and day-to-day reliability.",
        icon: Activity,
      },
      {
        title: "Wireless Connectivity",
        description:
          "Deploy wireless networking with coverage, user density, and performance expectations aligned to the actual environment.",
        icon: Wifi,
      },
      {
        title: "Fibre-Linked Connectivity",
        description:
          "Support backbone and inter-building connectivity requirements with infrastructure designed for stronger throughput and resilience.",
        icon: Cable,
      },
      {
        title: "Diagnostics and Optimization",
        description:
          "Identify network issues, performance bottlenecks, and operational weak points with structured troubleshooting and improvement planning.",
        icon: Radar,
      },
      {
        title: "Expansion-Ready Infrastructure",
        description:
          "Build networks with growth in mind so future users, devices, and services can be integrated more smoothly.",
        icon: ArrowRight,
      },
    ],
    useCasesTitle: "Where It's Used",
    useCases: [
      "Offices and corporate environments",
      "Schools and training centers",
      "Hospitals and clinics",
      "Hospitality and guest environments",
      "Commercial buildings",
      "Growing multi-site organizations",
    ],
    benefitsTitle: "Why Choose Our Networking Solutions",
    benefits: [
      "Stronger reliability for day-to-day operations",
      "Better performance across connected environments",
      "Scalable infrastructure for future growth",
      "Improved visibility into network health",
      "Professional deployment standards and planning",
    ],
    ctaPanel: {
      title: "Build Connectivity You Can Rely On",
      description:
        "Strengthen your operations with networking infrastructure designed for performance, stability, and long-term scalability.",
      primaryLabel: "Request a Quote",
      secondaryLabel: "Talk to Our Team",
    },
  },
  {
    category: "Infrastructure",
    title: "Structured Cabling & Network Infrastructure",
    slug: "structured-cabling-network-infrastructure",
    description:
      "Professional cabling and physical network infrastructure designed for reliable connectivity, organized deployment, and long-term operational performance.",
    bullets: [
      "Ethernet and structured network cabling",
      "Fibre backbone support",
      "Rack and patch panel setup",
      "Cable organization and labeling",
      "Office and facility infrastructure planning",
      "Expansion-ready installations",
    ],
    cta: "Discuss Cabling Infrastructure",
    icon: Cable,
    featureSectionTitle: "Physical network infrastructure built for clean deployment and dependable connectivity",
    featureSectionDescription:
      "Structured cabling services that create a stronger foundation for stable networks, easier maintenance, and future expansion.",
    featureCards: [
      {
        title: "Structured Ethernet Cabling",
        description:
          "Deploy organized ethernet cabling that supports cleaner infrastructure and more dependable connectivity across the site.",
        icon: Cable,
      },
      {
        title: "Fibre Backbone Support",
        description:
          "Support higher-capacity backbone requirements with fibre-linked infrastructure suited to modern operational environments.",
        icon: Network,
      },
      {
        title: "Rack and Patch Panel Setup",
        description:
          "Organize network terminations and rack layouts to improve serviceability, clarity, and professional presentation.",
        icon: LayoutTemplate,
      },
      {
        title: "Cable Labeling and Organization",
        description:
          "Improve maintenance readiness and reduce confusion through clear labeling, routing, and cable management practices.",
        icon: Blocks,
      },
      {
        title: "Facility Infrastructure Planning",
        description:
          "Plan cabling pathways and physical network layouts around offices, classrooms, clinics, and commercial spaces.",
        icon: Building2,
      },
      {
        title: "Expansion-Ready Installations",
        description:
          "Install infrastructure with future rooms, users, and device growth in mind to reduce disruption during later upgrades.",
        icon: ArrowRight,
      },
    ],
    useCasesTitle: "Where It's Used",
    useCases: [
      "Offices",
      "Schools",
      "Clinics",
      "Commercial buildings",
      "Retail spaces",
      "Multi-room facilities",
    ],
    benefitsTitle: "Why Choose Our Structured Cabling Solutions",
    benefits: [
      "Stronger network reliability",
      "Cleaner infrastructure deployment",
      "Easier expansion and maintenance",
      "Professional installation standards",
    ],
    ctaPanel: {
      title: "Build a Reliable Network Foundation",
      description:
        "Set up your environment with structured infrastructure designed for performance, organization, and long-term scalability.",
      primaryLabel: "Request a Quote",
      secondaryLabel: "Talk to Our Team",
    },
  },
  {
    category: "Security",
    title: "Network Security Solutions",
    slug: "network-security-solutions",
    description:
      "Security-focused network solutions that help protect infrastructure, manage access, and improve digital resilience.",
    bullets: [
      "Firewall setup and configuration",
      "VPN and secure remote access",
      "Network segmentation guidance",
      "Secure router and switch configuration",
      "Threat reduction best practices",
      "Security-focused infrastructure support",
    ],
    cta: "Discuss Network Security",
    icon: ShieldCheck,
    featureSectionTitle: "Network protection structured for access control, resilience, and safer operations",
    featureSectionDescription:
      "Security-minded infrastructure services that help organizations protect connected systems while maintaining practical usability.",
    featureCards: [
      {
        title: "Firewall Configuration",
        description:
          "Set up perimeter controls that better manage traffic, reduce unnecessary exposure, and strengthen network protection.",
        icon: ShieldCheck,
      },
      {
        title: "Secure Remote Access",
        description:
          "Support VPN and remote connectivity approaches that allow teams to work securely from outside the main office environment.",
        icon: MonitorSmartphone,
      },
      {
        title: "Network Segmentation Guidance",
        description:
          "Separate sensitive traffic, devices, and users into better-structured network segments for stronger control and reduced risk.",
        icon: Blocks,
      },
      {
        title: "Secure Routing and Switching",
        description:
          "Apply security-focused configuration practices to routers and switches for more reliable, controlled infrastructure behavior.",
        icon: Network,
      },
      {
        title: "Threat Reduction Practices",
        description:
          "Improve resilience through practical security measures that reduce avoidable weaknesses in connected environments.",
        icon: Radar,
      },
      {
        title: "Infrastructure Security Support",
        description:
          "Align security planning with the wider network so protection measures fit operational needs and long-term infrastructure goals.",
        icon: Activity,
      },
    ],
    useCasesTitle: "Where It's Used",
    useCases: [
      "Offices",
      "Institutions",
      "Clinics",
      "Multi-user business environments",
      "Remote teams",
    ],
    benefitsTitle: "Why Choose Our Network Security Solutions",
    benefits: [
      "Improved protection for connected systems",
      "Better control over access",
      "Safer remote connectivity",
      "More resilient infrastructure",
    ],
    ctaPanel: {
      title: "Protect Your Infrastructure with Confidence",
      description:
        "Strengthen your technology environment with modern network security solutions designed for today's operational needs.",
      primaryLabel: "Request a Quote",
      secondaryLabel: "Talk to Our Team",
    },
  },
  {
    category: "Security",
    title: "CCTV & Surveillance Systems",
    slug: "cctv-surveillance-systems",
    description:
      "Modern CCTV and surveillance solutions designed to improve visibility, strengthen security, and support reliable monitoring across business, institutional, and residential environments.",
    bullets: [
      "CCTV camera supply and installation",
      "Indoor and outdoor surveillance systems",
      "HD and IP-based camera solutions",
      "Remote viewing and monitoring setup",
      "Network video recorder (NVR/DVR) configuration",
      "Surveillance system maintenance and support",
      "Integration with access control and network infrastructure",
    ],
    cta: "Request a CCTV Quote",
    icon: Camera,
    featureSectionTitle: "Surveillance systems designed for visibility, control, and dependable coverage",
    featureSectionDescription:
      "Premium CCTV infrastructure aligned with modern networking, access control, and smart security environments.",
    featureCards: [
      {
        title: "Camera Supply and Installation",
        description:
          "Professional CCTV deployment with camera placement planned for clear coverage, operational reliability, and clean installation.",
        icon: Camera,
      },
      {
        title: "Indoor and Outdoor Coverage",
        description:
          "Surveillance systems designed for offices, perimeter zones, entry points, yards, and sensitive operational spaces.",
        icon: Radar,
      },
      {
        title: "HD and IP-Based Systems",
        description:
          "Modern high-definition and IP camera solutions that support stronger image quality, scalability, and network integration.",
        icon: Activity,
      },
      {
        title: "Remote Viewing and Monitoring",
        description:
          "Secure remote visibility across approved devices so stakeholders can monitor sites and events from wherever they are.",
        icon: MonitorSmartphone,
      },
      {
        title: "NVR and DVR Configuration",
        description:
          "Recorder setup structured for dependable storage, organized playback, and smoother day-to-day surveillance management.",
        icon: Cable,
      },
      {
        title: "Maintenance and Support",
        description:
          "Ongoing servicing, adjustments, and technical support to help surveillance systems remain dependable over time.",
        icon: ShieldCheck,
      },
      {
        title: "Integrated Security Infrastructure",
        description:
          "Connect surveillance with access control and network infrastructure for a more cohesive, technology-driven security environment.",
        icon: Network,
      },
    ],
    useCasesTitle: "Where It's Used",
    useCases: [
      "Offices and corporate facilities",
      "Schools and campuses",
      "Hospitals and clinics",
      "Retail and commercial spaces",
      "Warehouses and storage facilities",
      "Residential properties and gated premises",
    ],
    benefitsTitle: "Why Choose Our CCTV Solutions",
    benefits: [
      "Improved visibility and security coverage",
      "Real-time and recorded monitoring",
      "Reliable integration with network systems",
      "Scalable solutions for different environments",
      "Enhanced protection for people, assets, and operations",
    ],
    ctaPanel: {
      title: "Strengthen Your Security with Modern Surveillance",
      description:
        "Protect your environment with dependable CCTV and surveillance systems designed for visibility, control, and peace of mind.",
      primaryLabel: "Request a Quote",
      secondaryLabel: "Talk to Our Team",
    },
  },
  {
    category: "Security",
    title: "Access Control Systems",
    slug: "access-control-systems",
    description:
      "Modern access control solutions engineered to strengthen security, manage entry points, and give organizations full visibility over who can access their facilities.",
    bullets: [
      "Card-based and biometric access systems",
      "Smart door entry and exit control",
      "Office and facility access management",
      "Integration with existing network systems",
      "Centralized monitoring and control",
      "Scalable solutions for businesses, institutions, and residences",
    ],
    cta: "Request an Access Control Quote",
    icon: DoorClosed,
    featureSectionTitle: "Security systems built for controlled, connected environments",
    featureSectionDescription:
      "Premium access control designed to fit modern offices, institutions, commercial spaces, and intelligent properties.",
    featureCards: [
      {
        title: "Card-Based Credentials",
        description:
          "Reliable card and token-based entry systems for staff, approved visitors, and restricted operational areas.",
        icon: CreditCard,
      },
      {
        title: "Biometric Verification",
        description:
          "Fingerprint-enabled access for environments that need stronger identity assurance and better accountability.",
        icon: Fingerprint,
      },
      {
        title: "Smart Entry Control",
        description:
          "Manage doors, gates, and controlled exits with rules that match security requirements and site workflows.",
        icon: DoorClosed,
      },
      {
        title: "Facility Access Management",
        description:
          "Coordinate permissions across offices, departments, and multi-building sites from a structured access framework.",
        icon: Building2,
      },
      {
        title: "Network Integration",
        description:
          "Deploy access control as part of wider infrastructure so security systems work cleanly with existing networks.",
        icon: Network,
      },
      {
        title: "Centralized Monitoring",
        description:
          "Track events, permissions, and activity through a central control point designed for operational visibility.",
        icon: MonitorSmartphone,
      },
    ],
    useCasesTitle: "Where It's Used",
    useCases: [
      "Offices and corporate buildings",
      "Schools and universities",
      "Hospitals and clinics",
      "Retail and commercial spaces",
      "Residential properties and gated premises",
    ],
    benefitsTitle: "Why Choose Our Access Control Solutions",
    benefits: [
      "Improved security and controlled access",
      "Reduced risk of unauthorized entry",
      "Real-time monitoring and management",
      "Scalable for growing environments",
      "Integration with modern smart systems",
    ],
    ctaPanel: {
      title: "Secure Your Environment with Confidence",
      description:
        "Take control of your facility's access and security with modern, reliable systems designed for today's environments.",
      primaryLabel: "Request a Quote",
      secondaryLabel: "Talk to Our Team",
    },
  },
  {
    category: "Support",
    title: "Managed IT Support Services",
    slug: "managed-it-support-services",
    description:
      "Ongoing technical support and maintenance services designed to keep systems running efficiently and reduce operational disruption.",
    bullets: [
      "Routine support and troubleshooting",
      "Preventive maintenance",
      "Remote assistance",
      "System health checks",
      "User support guidance",
      "Ongoing service coordination",
    ],
    cta: "Discuss IT Support Services",
    icon: Users,
    featureSectionTitle: "Dependable support services built around continuity, response, and day-to-day stability",
    featureSectionDescription:
      "Ongoing IT support for organizations that need practical technical assistance, reduced downtime, and better service continuity.",
    featureCards: [
      {
        title: "Routine Support",
        description:
          "Respond to common technical issues, user needs, and day-to-day operational challenges with structured support coverage.",
        icon: Users,
      },
      {
        title: "Preventive Maintenance",
        description:
          "Reduce avoidable disruption through regular checks, maintenance activities, and proactive system attention.",
        icon: ShieldCheck,
      },
      {
        title: "Remote Assistance",
        description:
          "Provide efficient help for eligible issues without requiring every support interaction to happen on-site.",
        icon: MonitorSmartphone,
      },
      {
        title: "System Health Checks",
        description:
          "Review key systems and infrastructure conditions to spot weak points before they become larger operational problems.",
        icon: Activity,
      },
      {
        title: "User Support Guidance",
        description:
          "Help teams make better use of business technology through practical guidance, issue handling, and clearer support pathways.",
        icon: Building2,
      },
      {
        title: "Service Coordination",
        description:
          "Maintain an ongoing support relationship that helps keep IT responsibilities organized and responsive over time.",
        icon: ArrowRight,
      },
    ],
    useCasesTitle: "Where It's Used",
    useCases: [
      "Offices",
      "Schools",
      "Clinics",
      "Retail businesses",
      "Small and medium enterprises",
    ],
    benefitsTitle: "Why Choose Our Managed IT Support Solutions",
    benefits: [
      "Reduced downtime",
      "Ongoing technical support",
      "Better system continuity",
      "Practical support for growing organizations",
    ],
    ctaPanel: {
      title: "Keep Your Systems Running Smoothly",
      description:
        "Support your operations with dependable IT assistance, maintenance, and long-term service continuity.",
      primaryLabel: "Request a Quote",
      secondaryLabel: "Talk to Our Team",
    },
  },
  {
    category: "Digital",
    title: "Web & Digital Solutions",
    slug: "web-digital-solutions",
    description:
      "Elegant business websites, digital platforms, and modern web systems aligned to brand, growth, usability, and long-term credibility.",
    bullets: [
      "Professional websites and landing pages",
      "Company profile and corporate presence builds",
      "Custom business portals and digital systems",
      "Responsive user experience design",
      "Content structure and launch guidance",
      "Ongoing digital refinement support",
    ],
    cta: "Discuss a Digital Project",
    icon: Globe,
    featureSectionTitle: "Digital platforms shaped for credibility, usability, and business growth",
    featureSectionDescription:
      "Polished web and digital delivery designed to help organizations communicate clearly, present professionally, and operate more effectively online.",
    featureCards: [
      {
        title: "Business Websites",
        description:
          "Create modern websites that strengthen visibility, present services clearly, and support business communication goals.",
        icon: Globe,
      },
      {
        title: "Corporate Presence Builds",
        description:
          "Develop company profile and digital presence experiences suited to serious organizations and professional audiences.",
        icon: Building2,
      },
      {
        title: "Custom Portals and Systems",
        description:
          "Build web-based business systems and portals that support internal workflows, communication, or customer-facing needs.",
        icon: LayoutTemplate,
      },
      {
        title: "Responsive User Experience",
        description:
          "Design interfaces that remain usable and polished across desktop, tablet, and mobile environments.",
        icon: MonitorSmartphone,
      },
      {
        title: "Launch and Structure Guidance",
        description:
          "Support content organization, messaging structure, and practical launch decisions for stronger digital outcomes.",
        icon: ArrowRight,
      },
      {
        title: "Ongoing Refinement Support",
        description:
          "Improve and extend digital platforms over time as business needs, services, and communication priorities evolve.",
        icon: Activity,
      },
    ],
    useCasesTitle: "Where It's Used",
    useCases: [
      "Business websites",
      "Corporate identity projects",
      "Schools and institutions",
      "Service-based organizations",
      "Brand launch initiatives",
      "Digital presence upgrades",
    ],
    benefitsTitle: "Why Choose Our Web & Digital Solutions",
    benefits: [
      "Stronger digital credibility",
      "Improved user experience and usability",
      "Better communication of services and value",
      "Scalable digital foundations for growth",
      "Professional presentation aligned to your brand",
    ],
    ctaPanel: {
      title: "Build a Stronger Digital Presence",
      description:
        "Create a polished digital experience that reflects your brand, supports communication, and positions your organization for growth.",
      primaryLabel: "Request a Quote",
      secondaryLabel: "Talk to Our Team",
    },
  },
  {
    category: "Digital",
    title: "Domain Name & Hosting Services",
    slug: "domain-name-hosting-services",
    description:
      "Reliable domain and hosting support that helps businesses build and maintain a strong digital presence.",
    bullets: [
      "Domain registration support",
      "Domain renewal and management",
      "DNS guidance",
      "Website connection support",
      "Hosting setup guidance",
      "Domain and website bundles",
    ],
    cta: "Discuss Domain and Hosting",
    icon: Globe,
    featureSectionTitle: "Digital foundations built for brand identity, continuity, and smoother online setup",
    featureSectionDescription:
      "Domain and hosting support that helps organizations launch, manage, and maintain their online presence more confidently.",
    featureCards: [
      {
        title: "Domain Registration Support",
        description:
          "Secure domain names that align with business identity, communication goals, and future digital planning.",
        icon: Globe,
      },
      {
        title: "Renewal and Management",
        description:
          "Keep ownership and continuity organized through practical renewal and management support for active domains.",
        icon: ArrowRight,
      },
      {
        title: "DNS Guidance",
        description:
          "Help configure and manage DNS settings required for websites, email, and connected digital services.",
        icon: Network,
      },
      {
        title: "Website Connection Support",
        description:
          "Connect domains to websites and related services so the public-facing digital presence works as expected.",
        icon: LayoutTemplate,
      },
      {
        title: "Hosting Setup Guidance",
        description:
          "Support hosting decisions and setup requirements with practical guidance suited to the website or digital platform involved.",
        icon: MonitorSmartphone,
      },
      {
        title: "Bundled Digital Foundations",
        description:
          "Coordinate domain and hosting elements together for smoother business website launches and presence-building projects.",
        icon: Blocks,
      },
    ],
    useCasesTitle: "Where It's Used",
    useCases: [
      "Business websites",
      "Corporate identity setup",
      "Brand launch projects",
      "Digital presence initiatives",
    ],
    benefitsTitle: "Why Choose Our Domain & Hosting Solutions",
    benefits: [
      "Stronger online identity",
      "Easier domain management",
      "Reliable setup support",
      "Better digital continuity",
    ],
    ctaPanel: {
      title: "Launch Your Digital Presence with Confidence",
      description:
        "Secure and manage the right domain and hosting foundation for your brand, website, and business communication.",
      primaryLabel: "Request a Quote",
      secondaryLabel: "Talk to Our Team",
    },
  },
  {
    category: "Cloud",
    title: "Cloud & Business Email Setup",
    slug: "cloud-business-email-setup",
    description:
      "Professional cloud and business email setup services that help organizations communicate, collaborate, and operate more efficiently.",
    bullets: [
      "Business email setup",
      "Google Workspace or Microsoft 365 guidance",
      "Email domain connection support",
      "Cloud productivity setup",
      "Shared business tools configuration",
      "Professional communication systems",
    ],
    cta: "Discuss Cloud and Email Setup",
    icon: MonitorSmartphone,
    featureSectionTitle: "Cloud communication systems designed for modern collaboration and operational efficiency",
    featureSectionDescription:
      "Business-ready cloud and email support that helps organizations communicate professionally and work more effectively across teams.",
    featureCards: [
      {
        title: "Business Email Setup",
        description:
          "Configure professional email accounts that strengthen business communication and brand credibility.",
        icon: MonitorSmartphone,
      },
      {
        title: "Workspace Platform Guidance",
        description:
          "Support Google Workspace or Microsoft 365 setup decisions based on collaboration and operational requirements.",
        icon: LayoutTemplate,
      },
      {
        title: "Domain Email Connection",
        description:
          "Link email services correctly to domain infrastructure for cleaner professional communication.",
        icon: Globe,
      },
      {
        title: "Cloud Productivity Tools",
        description:
          "Set up core cloud tools that support file access, collaboration, and day-to-day business coordination.",
        icon: Users,
      },
      {
        title: "Shared Tool Configuration",
        description:
          "Prepare shared calendars, storage, and team-facing services that help departments work more smoothly together.",
        icon: Blocks,
      },
      {
        title: "Professional Communication Systems",
        description:
          "Build a more structured communication environment suited to growing organizations and formal business interactions.",
        icon: Building2,
      },
    ],
    useCasesTitle: "Where It's Used",
    useCases: [
      "Businesses",
      "Schools",
      "Teams and departments",
      "Growing organizations",
    ],
    benefitsTitle: "Why Choose Our Cloud & Email Solutions",
    benefits: [
      "Professional communication",
      "Better collaboration",
      "Easier access to cloud tools",
      "Scalable digital operations",
    ],
    ctaPanel: {
      title: "Set Up Professional Business Communication",
      description:
        "Equip your organization with modern email and cloud solutions built for communication, collaboration, and growth.",
      primaryLabel: "Request a Quote",
      secondaryLabel: "Talk to Our Team",
    },
  },
  {
    category: "Smart Technology",
    title: "AI & Intelligent Systems",
    slug: "ai-intelligent-systems",
    description:
      "ITQUEST AFRICA provides practical AI-driven solutions designed to improve efficiency, automate routine processes, enhance visibility, and support smarter decision-making across modern business and operational environments.",
    bullets: [
      "AI-powered website assistants",
      "Intelligent business support systems",
      "Automated inquiry and response workflows",
      "Smart monitoring and alert systems",
      "AI-enhanced reporting and insights",
      "Workflow automation support",
    ],
    cta: "Discuss AI Solutions",
    icon: Bot,
    featureSectionTitle: "Intelligent systems built for modern operations",
    featureSectionDescription:
      "Practical AI services aligned with digital platforms, support workflows, monitoring systems, and future-ready infrastructure decisions.",
    featureCards: [
      {
        title: "AI Website Assistants",
        description:
          "Deploy intelligent assistants that help website visitors find services, ask questions, and connect with the right support more efficiently.",
        icon: Bot,
      },
      {
        title: "Business Process Automation",
        description:
          "Automate repetitive tasks, response flows, and support processes to improve speed, consistency, and operational efficiency.",
        icon: Blocks,
      },
      {
        title: "Smart Monitoring & Alerts",
        description:
          "Use intelligent systems to monitor conditions, detect events, and support fast response through automated notifications and visibility tools.",
        icon: Radar,
      },
      {
        title: "AI Support Systems",
        description:
          "Create support tools that guide users, answer common questions, and streamline digital interactions for businesses and institutions.",
        icon: Users,
      },
      {
        title: "Insight & Reporting Tools",
        description:
          "Use AI-assisted summaries, reporting logic, and data-driven support tools to improve understanding and decision-making.",
        icon: MonitorSmartphone,
      },
      {
        title: "Future-Ready Intelligent Integration",
        description:
          "Lay the groundwork for AI-enhanced systems that can grow alongside networking, IoT, security, and digital infrastructure.",
        icon: Cpu,
      },
    ],
    useCasesTitle: "Where It's Used",
    useCases: [
      "Business websites",
      "Offices and teams",
      "Support environments",
      "Monitoring systems",
      "Client service workflows",
      "Smart operational environments",
    ],
    benefitsTitle: "Why Choose Our AI & Intelligent Systems Solutions",
    benefits: [
      "Practical automation with real business value",
      "Improved response speed and efficiency",
      "Better visibility across systems and interactions",
      "Scalable support for growing operations",
      "Strong alignment with digital and smart infrastructure",
    ],
    ctaPanel: {
      title: "Bring Intelligence Into Your Operations",
      description:
        "Explore practical AI solutions that help your business respond faster, work smarter, and build a more capable digital environment.",
      primaryLabel: "Request a Quote",
      secondaryLabel: "Talk to Our Team",
    },
  },
  {
    category: "Connectivity",
    title: "Wi-Fi Coverage Optimization",
    slug: "wifi-coverage-optimization",
    description:
      "Wireless network optimization services designed to improve signal strength, coverage consistency, and user experience across connected environments.",
    bullets: [
      "Wi-Fi coverage assessment",
      "Signal improvement planning",
      "Access point placement guidance",
      "Mesh and multi-point setup",
      "Coverage expansion support",
      "Performance-focused wireless optimization",
    ],
    cta: "Improve Wi-Fi Coverage",
    icon: Wifi,
    featureSectionTitle: "Wireless performance services built around your environment, density, and coverage reality",
    featureSectionDescription:
      "Wi-Fi optimization for organizations and residences that need stronger signal consistency, better user experience, and fewer blind spots.",
    featureCards: [
      {
        title: "Coverage Assessment",
        description:
          "Review the actual environment to understand weak zones, user experience issues, and signal limitations.",
        icon: Radar,
      },
      {
        title: "Signal Improvement Planning",
        description:
          "Define practical changes that improve wireless reach, consistency, and overall usability across the space.",
        icon: Activity,
      },
      {
        title: "Access Point Placement Guidance",
        description:
          "Position wireless equipment more strategically for stronger performance and cleaner coverage distribution.",
        icon: Wifi,
      },
      {
        title: "Mesh and Multi-Point Setup",
        description:
          "Support mesh and multi-node approaches for larger or more complex environments where single-point coverage is not enough.",
        icon: Network,
      },
      {
        title: "Coverage Expansion Support",
        description:
          "Extend usable connectivity into rooms, floors, and other areas where performance currently drops off.",
        icon: ArrowRight,
      },
      {
        title: "Wireless Optimization",
        description:
          "Improve the day-to-day experience for users through tuning and planning focused on real wireless behavior.",
        icon: MonitorSmartphone,
      },
    ],
    useCasesTitle: "Where It's Used",
    useCases: [
      "Offices",
      "Homes",
      "Lodges",
      "Schools",
      "Retail spaces",
      "Multi-room environments",
    ],
    benefitsTitle: "Why Choose Our Wi-Fi Solutions",
    benefits: [
      "Better wireless coverage",
      "Improved user experience",
      "Fewer dead zones",
      "Smarter wireless planning",
    ],
    ctaPanel: {
      title: "Improve Wireless Coverage and Performance",
      description:
        "Create a stronger, more reliable wireless experience with Wi-Fi solutions designed around your actual environment.",
      primaryLabel: "Request a Quote",
      secondaryLabel: "Talk to Our Team",
    },
  },
  {
    category: "Connectivity",
    title: "Power Backup & Network Uptime Solutions",
    slug: "power-backup-network-uptime-solutions",
    description:
      "Power continuity solutions designed to support uptime for networking equipment, systems, and essential operational technology.",
    bullets: [
      "UPS integration support",
      "Backup power planning for networking equipment",
      "Router and switch continuity support",
      "Power protection guidance",
      "Uptime-focused infrastructure recommendations",
      "Small-scale backup readiness solutions",
    ],
    cta: "Discuss Uptime Protection",
    icon: Zap,
    featureSectionTitle: "Continuity-focused support for essential connectivity and operational resilience",
    featureSectionDescription:
      "Practical backup and uptime planning for environments where network interruption can quickly disrupt operations.",
    featureCards: [
      {
        title: "UPS Integration Support",
        description:
          "Align UPS devices with networking and supporting equipment to help maintain continuity during short power interruptions.",
        icon: Zap,
      },
      {
        title: "Backup Planning for Network Equipment",
        description:
          "Identify priority devices and practical backup approaches for routers, switches, and critical connectivity points.",
        icon: Network,
      },
      {
        title: "Router and Switch Continuity",
        description:
          "Support essential network paths so key systems stay available for longer when power conditions become unstable.",
        icon: Activity,
      },
      {
        title: "Power Protection Guidance",
        description:
          "Improve resilience with protection recommendations that help reduce equipment risk from avoidable power issues.",
        icon: ShieldCheck,
      },
      {
        title: "Uptime-Focused Recommendations",
        description:
          "Plan for continuity with practical infrastructure choices centered around service availability and operational stability.",
        icon: ArrowRight,
      },
      {
        title: "Backup Readiness Support",
        description:
          "Prepare smaller environments with workable backup arrangements that improve readiness without unnecessary complexity.",
        icon: Building2,
      },
    ],
    useCasesTitle: "Where It's Used",
    useCases: [
      "Offices",
      "Clinics",
      "Network rooms",
      "Retail spaces",
      "Critical connectivity environments",
    ],
    benefitsTitle: "Why Choose Our Power Backup & Uptime Solutions",
    benefits: [
      "Better uptime protection",
      "Reduced service interruption",
      "Support for essential systems",
      "More dependable operations",
    ],
    ctaPanel: {
      title: "Support Uptime Where It Matters Most",
      description:
        "Reduce disruption and keep critical systems available with practical power backup and continuity solutions.",
      primaryLabel: "Request a Quote",
      secondaryLabel: "Talk to Our Team",
    },
  },
  {
    category: "Systems",
    title: "IT Hardware & Electronics Supply",
    slug: "it-hardware-electronics-supply",
    description:
      "Dependable sourcing for networking equipment, fibre components, electronics, and supporting technology products aligned to real operational needs.",
    bullets: [
      "Routers, switches, and access points",
      "Fibre cables, modules, and accessories",
      "Connectivity hardware and peripherals",
      "Power and support electronics",
      "Custom sourcing for operational needs",
      "Installation-aligned hardware recommendations",
    ],
    cta: "Request Product Sourcing",
    icon: CircuitBoard,
    featureSectionTitle: "Technology sourcing support built for compatibility, reliability, and deployment readiness",
    featureSectionDescription:
      "Practical hardware supply services that help organizations procure the right equipment for infrastructure, operations, and growth.",
    featureCards: [
      {
        title: "Network Hardware Supply",
        description:
          "Source routers, switches, and related networking equipment suited to the environment, scale, and connectivity goals involved.",
        icon: CircuitBoard,
      },
      {
        title: "Fibre and Connectivity Components",
        description:
          "Procure fibre accessories, modules, cables, and supporting items required for structured infrastructure work.",
        icon: Cable,
      },
      {
        title: "Peripherals and Accessories",
        description:
          "Support network and office technology environments with relevant accessories and operational support devices.",
        icon: MonitorSmartphone,
      },
      {
        title: "Power and Support Electronics",
        description:
          "Identify supporting electronics that improve readiness, connectivity, and the practical use of deployed systems.",
        icon: Zap,
      },
      {
        title: "Custom Sourcing",
        description:
          "Respond to specific procurement requirements with sourcing support built around actual business and infrastructure needs.",
        icon: Blocks,
      },
      {
        title: "Deployment-Aligned Recommendations",
        description:
          "Match equipment choices to installation requirements so procurement decisions support smoother project execution.",
        icon: ArrowRight,
      },
    ],
    useCasesTitle: "Where It's Used",
    useCases: [
      "Offices",
      "Schools",
      "Clinics",
      "Commercial sites",
      "Infrastructure upgrade projects",
      "Modern facilities",
    ],
    benefitsTitle: "Why Choose Our Hardware Supply Solutions",
    benefits: [
      "More suitable equipment selection",
      "Better alignment with project needs",
      "Reliable sourcing support",
      "Cleaner procurement for operational environments",
      "Practical guidance around compatibility and use",
    ],
    ctaPanel: {
      title: "Source the Right Technology with Confidence",
      description:
        "Procure dependable hardware and supporting electronics aligned to your environment, infrastructure needs, and operational priorities.",
      primaryLabel: "Request a Quote",
      secondaryLabel: "Talk to Our Team",
    },
  },
  {
    category: "Systems",
    title: "POS & Business Systems Setup",
    slug: "pos-business-systems-setup",
    description:
      "Technology setup services for business operations, including point-of-sale systems and supporting digital tools for commercial environments.",
    bullets: [
      "POS hardware setup support",
      "Device integration guidance",
      "Receipt printer and peripheral setup",
      "Basic system deployment assistance",
      "Business operations technology setup",
      "Commercial-ready support services",
    ],
    cta: "Discuss POS Setup",
    icon: Store,
    featureSectionTitle: "Commercial technology setup built for smoother transactions and operational readiness",
    featureSectionDescription:
      "Practical system deployment support for retail and business environments that need dependable setup and cleaner day-to-day operations.",
    featureCards: [
      {
        title: "POS Hardware Setup",
        description:
          "Prepare POS devices and core equipment for operational use in retail and transaction-focused environments.",
        icon: Store,
      },
      {
        title: "Device Integration Guidance",
        description:
          "Support the connection of related business devices so systems work together more cleanly within the commercial setup.",
        icon: Network,
      },
      {
        title: "Receipt and Peripheral Setup",
        description:
          "Configure receipt printers and supporting peripherals required for practical transaction handling.",
        icon: LayoutTemplate,
      },
      {
        title: "System Deployment Assistance",
        description:
          "Help implement the basic setup steps needed to get business systems into service more smoothly.",
        icon: ArrowRight,
      },
      {
        title: "Operations Technology Support",
        description:
          "Support digital tools used in day-to-day business operations so the commercial environment is better prepared for use.",
        icon: ShoppingBag,
      },
      {
        title: "Commercial-Ready Service Delivery",
        description:
          "Deliver setup support with the pace, practicality, and readiness expected in retail and service environments.",
        icon: Building2,
      },
    ],
    useCasesTitle: "Where It's Used",
    useCases: [
      "Shops",
      "Restaurants",
      "Retail stores",
      "Commercial counters",
      "Transaction environments",
    ],
    benefitsTitle: "Why Choose Our POS & Business Systems Solutions",
    benefits: [
      "Better operational readiness",
      "Improved transaction support",
      "Cleaner business system setup",
      "Practical technology deployment",
    ],
    ctaPanel: {
      title: "Equip Your Business for Efficient Operations",
      description:
        "Set up dependable business systems that support transactions, customer service, and day-to-day operational flow.",
      primaryLabel: "Request a Quote",
      secondaryLabel: "Talk to Our Team",
    },
  },
  {
    category: "Smart Technology",
    title: "Smart Systems & IoT",
    slug: "smart-systems-iot",
    description:
      "Practical connected systems for monitoring, visibility, automation readiness, and more intelligent environments.",
    bullets: [
      "Environmental monitoring and alerts",
      "Smart office and facility concepts",
      "Remote visibility dashboards",
      "Connected sensor deployment planning",
      "Alert-based monitoring workflows",
      "Modular intelligent infrastructure support",
    ],
    cta: "Explore Smart Systems",
    icon: Cpu,
    featureSectionTitle: "Connected systems designed for visibility, responsiveness, and operational insight",
    featureSectionDescription:
      "Smart technology solutions that help organizations monitor conditions, improve awareness, and prepare for more intelligent environments.",
    featureCards: [
      {
        title: "Environmental Monitoring",
        description:
          "Track temperature, humidity, power conditions, and related environmental factors across sensitive spaces.",
        icon: Activity,
      },
      {
        title: "Remote Visibility Dashboards",
        description:
          "Access live operational visibility through dashboards that support faster awareness and better decision-making.",
        icon: MonitorSmartphone,
      },
      {
        title: "Alert-Based Monitoring",
        description:
          "Receive timely alerts when monitored conditions change, helping teams respond before issues escalate.",
        icon: Radar,
      },
      {
        title: "Smart Office and Facility Concepts",
        description:
          "Plan connected systems that support more responsive environments across offices, facilities, and operational spaces.",
        icon: Building2,
      },
      {
        title: "Sensor Integration Planning",
        description:
          "Design around sensor-based visibility and connected monitoring use cases that fit the realities of the environment.",
        icon: Cpu,
      },
      {
        title: "Expansion-Ready Smart Infrastructure",
        description:
          "Adopt intelligent systems through a modular approach that creates room for future automation and smarter workflows.",
        icon: ArrowRight,
      },
    ],
    useCasesTitle: "Where It's Used",
    useCases: [
      "Server rooms",
      "Clinics and labs",
      "Cold storage and sensitive spaces",
      "Offices and facilities",
      "Retail and hospitality environments",
      "Modern residential projects",
    ],
    benefitsTitle: "Why Choose Our Smart Systems & IoT Solutions",
    benefits: [
      "Improved visibility into important conditions",
      "Faster response to operational issues",
      "More intelligent monitoring environments",
      "Scalable connected infrastructure planning",
      "Practical readiness for smarter operations",
    ],
    ctaPanel: {
      title: "Bring Smarter Visibility into Your Environment",
      description:
        "Adopt connected systems that improve monitoring, insight, and operational awareness across modern spaces.",
      primaryLabel: "Request a Quote",
      secondaryLabel: "Talk to Our Team",
    },
  },
];

export const serviceOptions = servicePillars.map((service) => service.title);

export const featuredServices = [
  "networking-infrastructure",
  "network-security-solutions",
  "cctv-surveillance-systems",
  "access-control-systems",
  "ai-intelligent-systems",
  "managed-it-support-services",
  "web-digital-solutions",
]
  .map((slug) => servicePillars.find((service) => service.slug === slug))
  .filter((service): service is ServiceItem => Boolean(service));

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
    slug: "routers",
    title: "Routers",
    description:
      "Business-ready routing options for branch offices, growing SMEs, institutions, and managed connectivity environments.",
    points: ["Office and branch deployment", "Reliable throughput", "Custom recommendations"],
    icon: Wifi,
  },
  {
    slug: "switches",
    title: "Switches",
    description:
      "Structured switching capability for enterprise floors, institutional networks, and performance-sensitive operations.",
    points: ["Managed and unmanaged options", "Scalable port capacity", "Deployment guidance"],
    icon: Network,
  },
  {
    slug: "wireless-wifi-solutions",
    title: "Wireless & Wi-Fi Solutions",
    description:
      "Wireless connectivity equipment for reliable coverage and improved network performance.",
    points: ["Access points and mesh systems", "Range extension solutions", "Wireless deployment support"],
    icon: Wifi,
  },
  {
    slug: "fibre-cables-accessories",
    title: "Fibre Cables & Accessories",
    description:
      "Core fibre-linked components and accessories for robust connectivity projects and future-ready installations.",
    points: ["Cables and patch solutions", "Installation accessories", "Project-aligned sourcing"],
    icon: Cable,
  },
  {
    slug: "structured-cabling-components",
    title: "Structured Cabling Components",
    description:
      "Essential cabling and physical infrastructure components for organized and scalable network deployment.",
    points: ["Ethernet and fibre systems", "Patch panels and connectors", "Installation and management accessories"],
    icon: Cable,
  },
  {
    slug: "networking-components",
    title: "Networking Components",
    description:
      "Connectivity hardware and supporting infrastructure for structured, dependable technology environments.",
    points: ["Modules and accessories", "Wireless support gear", "Operational essentials"],
    icon: CircuitBoard,
  },
  {
    slug: "network-security-devices",
    title: "Network Security Devices",
    description:
      "Security-focused networking hardware designed to protect infrastructure and manage secure access.",
    points: ["Firewalls and security gateways", "VPN-enabled devices", "Secure network routing systems"],
    icon: ShieldCheck,
  },
  {
    slug: "cctv-systems",
    title: "CCTV Systems",
    description:
      "Modern surveillance equipment designed for visibility, monitoring, and security across business and residential environments.",
    points: ["Indoor and outdoor camera systems", "NVR and DVR recording solutions", "Scalable surveillance deployments"],
    icon: Camera,
  },
  {
    slug: "access-control-hardware",
    title: "Access Control Hardware",
    description:
      "Secure entry systems and control hardware for managing facility access and improving operational security.",
    points: ["Biometric and card-based systems", "Smart locking and entry devices", "Facility access management tools"],
    icon: DoorClosed,
  },
  {
    slug: "power-backup-solutions",
    title: "Power Backup Solutions",
    description:
      "Power continuity systems designed to support uptime for networking and operational infrastructure.",
    points: ["UPS and backup systems", "Surge protection devices", "Power stability solutions"],
    icon: Zap,
  },
  {
    slug: "pos-business-devices",
    title: "POS & Business Devices",
    description:
      "Operational technology and devices used to support retail, commercial, and transaction environments.",
    points: ["POS terminals and systems", "Barcode scanners and printers", "Business operation devices"],
    icon: Store,
  },
  {
    slug: "hosting-domain-infrastructure",
    title: "Hosting & Domain Infrastructure",
    description:
      "Support components and configurations for domain, hosting, and digital infrastructure setup.",
    points: ["Domain support tools", "Hosting-ready configurations", "Connectivity and DNS support"],
    icon: Globe,
  },
  {
    slug: "selected-electronics",
    title: "Selected Electronics",
    description:
      "Practical supporting electronics for business operations, technical deployments, and specialized infrastructure needs.",
    points: ["Business support devices", "Operational accessories", "Available on request"],
    icon: Factory,
  },
  {
    slug: "smart-devices",
    title: "Smart Devices",
    description:
      "Connected hardware relevant to monitoring, automation readiness, and emerging intelligent systems projects.",
    points: ["Sensor-capable devices", "Smart monitoring components", "Custom sourcing support"],
    icon: MonitorSmartphone,
  },
];

const pageSearchItems: SearchItem[] = [
  {
    title: "Home",
    description: "Overview of ITQUEST AFRICA's premium infrastructure, systems, and technology capabilities.",
    href: "/",
    type: "page",
    keywords: ["homepage", "overview", "technology company", "itquest africa"],
  },
  {
    title: "About",
    description: "Company profile, positioning, and the operating philosophy behind ITQUEST AFRICA.",
    href: "/about",
    type: "page",
    keywords: ["company", "about us", "profile", "mission"],
  },
  {
    title: "Services",
    description: "Full service catalog covering infrastructure, security, support, digital, cloud, systems, and IoT.",
    href: "/services",
    type: "page",
    keywords: ["services", "technology services", "infrastructure", "security", "support"],
  },
  {
    title: "Solutions & Industries",
    description: "Sector-aware technology support for offices, schools, clinics, retail, hospitality, and residences.",
    href: "/solutions",
    type: "page",
    keywords: ["solutions", "industries", "education", "healthcare", "retail", "hospitality"],
  },
  {
    title: "IoT",
    description: "Smart monitoring and connected systems including the SmartSense offering.",
    href: "/iot",
    type: "page",
    keywords: ["iot", "smartsense", "monitoring", "sensors", "smart systems"],
  },
  {
    title: "Products",
    description: "Capability showcase of supply categories across networking, security, business systems, and smart devices.",
    href: "/products",
    type: "page",
    keywords: ["products", "catalog", "hardware", "equipment", "technology supply"],
  },
  {
    title: "Projects",
    description: "Selected project narratives and capability previews from ITQUEST AFRICA.",
    href: "/projects",
    type: "page",
    keywords: ["projects", "case studies", "work", "portfolio"],
  },
  {
    title: "Contact",
    description: "Get in touch with the team for consultations, enquiries, and tailored next steps.",
    href: "/contact",
    type: "page",
    keywords: ["contact", "enquiry", "talk to team", "sales"],
  },
  {
    title: "Request a Quote",
    description: "Share your requirements and request a tailored quote for infrastructure, products, or services.",
    href: "/quote",
    type: "page",
    keywords: ["quote", "proposal", "pricing", "request quote"],
  },
];

export const siteSearchItems: SearchItem[] = [
  ...pageSearchItems,
  ...servicePillars.map((service) => ({
    title: service.title,
    description: service.description,
    href: `/services#${service.slug}`,
    type: "service" as const,
    keywords: [
      service.category,
      service.title,
      ...service.bullets,
      ...(service.useCases ?? []),
      ...(service.benefits ?? []),
    ],
  })),
  ...products.map((product) => ({
    title: product.title,
    description: product.description,
    href: `/products#${product.slug}`,
    type: "product" as const,
    keywords: [product.title, ...product.points],
  })),
  ...industries.map((industry) => ({
    title: industry.title,
    description: industry.description,
    href: "/solutions",
    type: "solution" as const,
    keywords: [industry.title, ...industry.needs],
  })),
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
  services: featuredServices.map((service) => ({
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
  "structured cabling Zimbabwe",
  "network security Zimbabwe",
  "access control systems Zimbabwe",
  "CCTV systems Zimbabwe",
  "surveillance systems Zimbabwe",
  "AI solutions Zimbabwe",
  "intelligent systems Zimbabwe",
  "managed IT support Zimbabwe",
  "business email setup Zimbabwe",
  "POS systems setup Zimbabwe",
  "web development Zimbabwe",
  "IoT solutions Zimbabwe",
  "IT hardware supply Zimbabwe",
  "smart systems Africa",
];
