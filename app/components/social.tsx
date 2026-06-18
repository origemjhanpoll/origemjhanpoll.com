import React from "react";

export interface SocialLinkItem {
  icon: React.ReactNode;
  href: string;
  label?: string;
}

export interface SocialLinksProps {
  icons: SocialLinkItem[];
}

const Social: React.FC<SocialLinksProps> = ({
  icons: items,
}) => {
  return (
    <section id='social-section' className="bg-[var(--color-card-bg)] text-[var(--color-text-primary)] rounded-3xl p-6 2xl:p-8">
      <div className="flex flex-wrap justify-center gap-6 lg:gap-8 2xl:gap-12">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            target={item.href}
            aria-label={item.label}
            className="flex hover:scale-125 active:scale-100 cursor-pointer transition-transform duration-300"
          >
            {item.icon}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Social;