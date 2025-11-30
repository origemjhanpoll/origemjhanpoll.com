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
    <section className="flex bg-[var(--color-card-bg)] text-[var(--color-text-primary)] rounded-3xl p-6 2xl:p-8">
      <div className="flex gap-2 items-center justify-center w-full">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            target={item.href}
            aria-label={item.label}
            className="flex p-4 hover:scale-150 active:scale-95 cursor-pointer transition-transform duration-300"
          >
            {item.icon}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Social;