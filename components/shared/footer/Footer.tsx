import React from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Clapperboard } from "lucide-react";
import { footerLinks } from "@/constants/footer";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { brand, sections } = footerLinks;

  return (
    <footer className="bg-black text-zinc-400 py-12 px-6 md:px-16 border-t border-zinc-900">
      <div className="container mx-auto flex flex-col gap-12 lg:grid lg:grid-cols-5 lg:gap-12">
        {/* Brand Section: Full width on mobile, 1 col on LG */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 overflow-hidden rounded-lg">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={70}
                height={70}
                className="object-contain"
              />
            </div>
            {/* Show brand name on large, hide/style on mini if needed to match image */}
            <span className="text-white font-bold text-xl tracking-tight lg:block">
              {brand.name}
            </span>
          </div>
          <p className="text-sm md:text-base leading-relaxed max-w-xs text-zinc-500">
            {brand.description}
          </p>
          <div className="flex items-center gap-2 text-[#E50914] font-bold text-xs uppercase tracking-widest mt-2">
            <Clapperboard size={16} />
            {brand.badge}
          </div>

          {/* Social Icons - Clean SVGs */}
          <div className="flex items-center gap-4 mt-3 text-zinc-500">
            <Link
              href="#"
              className="hover:text-[#E50914] transition-colors"
              aria-label="Facebook"
            >
              <svg
                className="w-[18px] h-[18px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z" />
              </svg>
            </Link>
            <Link
              href="#"
              className="hover:text-[#E50914] transition-colors"
              aria-label="X / Twitter"
            >
              <svg
                className="w-[18px] h-[18px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            <Link
              href="#"
              className="hover:text-[#E50914] transition-colors"
              aria-label="Instagram"
            >
              <svg
                className="w-[18px] h-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>
            <Link
              href="#"
              className="hover:text-[#E50914] transition-colors"
              aria-label="YouTube"
            >
              <svg
                className="w-[18px] h-[18px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Link Sections: 3 Columns on mini device, 1 col each on LG */}
        <div className="grid grid-cols-3 gap-4 md:contents">
          {sections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-4 lg:col-span-1">
              <h3 className="text-white font-semibold text-base md:text-lg">
                {section.title}
              </h3>
              <nav className="flex flex-col gap-3 text-sm">
                {section.links.map((link, linkIdx) => (
                  <Link
                    key={linkIdx}
                    href={link.href}
                    prefetch={false}
                    className="hover:text-[#E50914] transition-colors text-zinc-500"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Connect Section: Full width on mobile, 1 col on LG */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <h3 className="text-white font-semibold text-lg">Connect With Us</h3>
          <div className="bg-[#0A0A0A] border border-zinc-900 p-5 rounded-xl">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block mb-4">
              Stay Updated
            </label>
            <div className="flex w-full items-center gap-0">
              <Input
                type="email"
                placeholder="Email"
                className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 rounded-r-none h-11 focus-visible:ring-1 focus-visible:ring-[#E50914]"
              />
              <Button
                type="submit"
                className="bg-[#E50914] hover:bg-[#b20710] text-white rounded-l-none h-11 px-3 shadow-none shrink-0"
              >
                <SendHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="container mx-auto mt-12 pt-8 border-t border-zinc-900 text-center text-[10px] md:text-xs text-zinc-600">
        © {new Date().getFullYear()} {brand.name}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
