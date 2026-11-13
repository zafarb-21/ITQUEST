import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { Container } from "@/components/container";
import { footerLinks, siteConfig, whatsappHref } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[1.15fr_repeat(3,minmax(0,1fr))]">
          <div className="col-span-2 max-w-sm lg:col-span-1">
            <BrandMark size="footer" />
            <p className="mt-5 text-sm leading-7 text-slate-600">
              ITQUEST AFRICA provides infrastructure, security systems, digital services, AI-ready business
              solutions, hardware sourcing, support, and smart technology for organizations building with confidence.
            </p>
            <div className="mt-6 space-y-2 text-sm text-slate-600">
              <p>{siteConfig.address}</p>
              <p>
                <a href={`mailto:${siteConfig.email}`} className="transition hover:text-ink">
                  {siteConfig.email}
                </a>
              </p>
              <p>
                <a href={whatsappHref()} target="_blank" rel="noopener" className="wa-dot transition hover:text-ink">
                  {siteConfig.phone} (WhatsApp)
                </a>
              </p>
            </div>
          </div>
          <FooterColumn title="Navigation" links={footerLinks.pages} />
          <FooterColumn title="Services" links={footerLinks.services} />
          <FooterColumn title="Reach us" links={footerLinks.social} />
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-ink/10 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} ITQUEST AFRICA (PVT) LTD. All rights reserved.</p>
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
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link href={link.href} className="text-sm text-slate-600 transition hover:text-ink">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
