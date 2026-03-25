import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { industries, products, servicePillars, siteConfig } from "@/lib/site-data";

export type AssistantMessageInput = {
  role: "user" | "assistant";
  content: string;
};

export type AssistantRecommendation = {
  title: string;
  href: string;
};

export type AssistantLeadInput = {
  name: string;
  email: string;
  company: string;
  service: string;
  notes?: string;
  sourcePage?: string;
};

export type StoredAssistantLead = AssistantLeadInput & {
  id: string;
  createdAt: string;
};

export const assistantKnowledge = {
  companyName: siteConfig.name,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
  services: servicePillars.map((service) => ({
    title: service.title,
    category: service.category,
    description: service.description,
    bullets: service.bullets,
  })),
  products: products.map((product) => ({
    title: product.title,
    description: product.description,
    points: product.points,
  })),
  industries: industries.map((industry) => ({
    title: industry.title,
    description: industry.description,
    needs: industry.needs,
  })),
  ctaActions: [
    {
      label: "Request a Quote",
      href: "/quote",
      useCase: "Recommend this when the visitor needs a custom project scope, tailored proposal, or product sourcing response.",
    },
    {
      label: "Talk to Our Team",
      href: "/contact",
      useCase: "Recommend this when the visitor needs direct support, clarification, or a conversation with the team.",
    },
  ],
} as const;

const serviceHrefByTitle = new Map(servicePillars.map((service) => [service.title, `/services#${service.slug}`]));

const recommendationRules: Array<{ keywords: string[]; services: string[] }> = [
  {
    keywords: ["school", "campus", "classroom", "education", "network", "wifi", "internet"],
    services: [
      "Networking & Infrastructure",
      "Structured Cabling & Network Infrastructure",
      "Wi-Fi Coverage Optimization",
    ],
  },
  {
    keywords: ["office security", "security", "cctv", "camera", "surveillance", "access control", "entry", "gate"],
    services: [
      "CCTV & Surveillance Systems",
      "Access Control Systems",
      "Network Security Solutions",
    ],
  },
  {
    keywords: ["website", "chatbot", "assistant", "ai", "automation", "workflow", "reporting"],
    services: [
      "AI & Intelligent Systems",
      "Web & Digital Solutions",
      "Cloud & Business Email Setup",
    ],
  },
  {
    keywords: ["domain", "hosting", "dns", "email", "workspace", "microsoft 365", "google workspace"],
    services: [
      "Domain Name & Hosting Services",
      "Cloud & Business Email Setup",
      "Web & Digital Solutions",
    ],
  },
  {
    keywords: ["support", "maintenance", "troubleshoot", "it support", "technical help", "issue"],
    services: ["Managed IT Support Services", "Networking & Infrastructure"],
  },
  {
    keywords: ["monitor", "sensor", "iot", "alerts", "environment", "visibility"],
    services: ["Smart Systems & IoT", "AI & Intelligent Systems"],
  },
  {
    keywords: ["pos", "shop", "retail", "restaurant", "barcode", "receipt"],
    services: ["POS & Business Systems Setup", "IT Hardware & Electronics Supply"],
  },
  {
    keywords: ["power", "backup", "uptime", "ups", "outage"],
    services: ["Power Backup & Network Uptime Solutions", "Networking & Infrastructure"],
  },
];

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function includesKeyword(message: string, keyword: string) {
  return message.includes(keyword.toLowerCase());
}

export function recommendServices(message: string): AssistantRecommendation[] {
  const normalized = clean(message).toLowerCase();
  if (!normalized) return [];

  const titles = new Set<string>();

  for (const rule of recommendationRules) {
    if (rule.keywords.some((keyword) => includesKeyword(normalized, keyword))) {
      rule.services.forEach((service) => titles.add(service));
    }
  }

  if (titles.size === 0 && /(network|internet|connectivity)/.test(normalized)) {
    titles.add("Networking & Infrastructure");
  }

  return Array.from(titles)
    .map((title) => {
      const href = serviceHrefByTitle.get(title);
      return href ? { title, href } : null;
    })
    .filter((service): service is AssistantRecommendation => Boolean(service))
    .slice(0, 4);
}

export function shouldCaptureLead(message: string) {
  const normalized = clean(message).toLowerCase();
  if (!normalized) return false;

  return /\b(need|looking for|interested|quote|proposal|price|pricing|cost|setup|set up|install|deploy|help us|for our|contact|talk to someone|can you help)\b/.test(
    normalized,
  );
}

export function buildAssistantSystemPrompt(recommendations: AssistantRecommendation[]) {
  const recommendationNote =
    recommendations.length > 0
      ? `Potentially relevant services for this visitor based on their need: ${recommendations
          .map((service) => service.title)
          .join(", ")}.`
      : "No recommendation hint is available yet. Suggest only relevant ITQUEST AFRICA services when clearly appropriate.";

  return [
    `You are the ${siteConfig.name} website assistant.`,
    "Be concise, professional, practical, and helpful.",
    "Stay within the scope of ITQUEST AFRICA services, products, industries served, and support actions.",
    "Do not invent pricing, timelines, or products that are not in the provided company knowledge.",
    'For custom project needs, recommend "Request a Quote".',
    'For direct support or clarification, recommend "Talk to Our Team".',
    "If a visitor expresses clear buying or project interest, invite them to share their name, email, company, and service of interest.",
    recommendationNote,
    "Company knowledge:",
    JSON.stringify(assistantKnowledge),
  ].join("\n");
}

export function validateAssistantMessages(input: unknown) {
  if (!Array.isArray(input)) return null;

  const messages = input
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const role = "role" in item ? item.role : undefined;
      const content = "content" in item ? item.content : undefined;

      if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
        return null;
      }

      const cleanContent = clean(content);
      if (!cleanContent) return null;

      return {
        role,
        content: cleanContent,
      } satisfies AssistantMessageInput;
    })
    .filter((message): message is AssistantMessageInput => Boolean(message))
    .slice(-10);

  return messages.length > 0 ? messages : null;
}

export function validateAssistantLead(input: AssistantLeadInput) {
  const data = {
    name: clean(input.name),
    email: clean(input.email).toLowerCase(),
    company: clean(input.company),
    service: clean(input.service),
    notes: clean(input.notes),
    sourcePage: clean(input.sourcePage),
  };

  const errors: Record<string, string> = {};

  if (data.name.length < 2) errors.name = "Enter a valid name.";
  if (!isEmail(data.email)) errors.email = "Enter a valid email address.";
  if (data.company.length < 2) errors.company = "Enter a company name.";
  if (data.service.length < 2) errors.service = "Select a service of interest.";

  if (Object.keys(errors).length > 0) {
    return { success: false as const, errors };
  }

  return {
    success: true as const,
    data,
  };
}

export async function storeAssistantLead(input: AssistantLeadInput) {
  const record: StoredAssistantLead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: clean(input.name),
    email: clean(input.email).toLowerCase(),
    company: clean(input.company),
    service: clean(input.service),
    notes: clean(input.notes),
    sourcePage: clean(input.sourcePage),
  };

  const filePath = process.env.ASSISTANT_LEADS_PATH || "/tmp/itquest-assistant-leads.jsonl";
  await mkdir(path.dirname(filePath), { recursive: true });
  await appendFile(filePath, `${JSON.stringify(record)}\n`, "utf8");

  console.info("[ITQUEST AFRICA] Assistant lead captured", {
    id: record.id,
    email: record.email,
    service: record.service,
    sourcePage: record.sourcePage || "unknown",
  });

  return record;
}

export function extractLastUserMessage(messages: AssistantMessageInput[]) {
  return [...messages].reverse().find((message) => message.role === "user")?.content ?? "";
}
