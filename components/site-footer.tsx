import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { Container } from "@/components/container";
import { footerLinks, siteConfig } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/60">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_repeat(3,minmax(0,1fr))]">
          <div className="max-w-sm">
            <BrandMark size="footer" />
            <p className="mt-5 text-sm leading-7 text-white/[0.65]">
              ITQUEST AFRICA provides premium infrastructure, security systems, digital services, hardware sourcing,
              support, and smart technology solutions for organizations building with confidence.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/60">
              <p>{siteConfig.location}</p>
              <p>{siteConfig.email}</p>
              <p>{siteConfig.phone}</p>
            </div>
          </div>
          <FooterColumn title="Navigation" links={footerLinks.pages} />
          <FooterColumn title="Services" links={footerLinks.services} />
          <FooterColumn title="Connect" links={footerLinks.social} />
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} ITQUEST AFRICA. All rights reserved.</p>
          <p>Engineering the Future of Connectivity</p>
        </div>
      </Container>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  links: { label: string; href: string }[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link href={link.href} className="text-sm text-white/[0.68] transition hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
