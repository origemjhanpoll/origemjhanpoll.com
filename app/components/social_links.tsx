import React from "react";
import { FaYoutube, FaInstagram, FaLinkedin, FaXTwitter, FaTiktok } from "react-icons/fa6";

export interface SocialLinkItem {
  icon: React.ReactNode;
  href: string;
  label?: string;
}

export interface SocialLinksProps {
  icons: SocialLinkItem[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  icons: items,
}) => {
  return (
    <section className="flex flex-1 bg-[var(--color-card-bg)] text-[var(--color-text-primary)] rounded-3xl p-4 font-sans">
      <div className="flex flex-wrap gap-4">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            aria-label={item.label}
            className="grow p-8 flex items-center justify-center bg-[var(--color-tag-bg)] hover:brightness-95 rounded-3xl transition"
          >
            {item.icon}
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialLinks;