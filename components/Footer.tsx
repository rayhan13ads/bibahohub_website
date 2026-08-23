'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Facebook, Instagram, Twitter, Shield } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const LEGAL_HREFS = ['/privacy-policy', '/terms', '/delete-account', '/help-center'];

export default function Footer() {
  const { t } = useLanguage();

  const LINK_SECTIONS = [
    {
      heading: t.footer.quickLinks,
      items: t.footer.quickLinkItems.map((label) => ({ label, href: '#' })),
    },
    {
      heading: t.footer.legal,
      items: t.footer.legalLinkItems.map((label, i) => ({ label, href: LEGAL_HREFS[i] ?? '#' })),
    },
  ];

  return (
    <footer className="bg-[#1B223D] text-white pt-16 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-14 border-b border-white/10">

          {/* Brand column */}
          <div className="col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="Bibaho Hub" width={40} height={40} className="rounded-xl" />
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-bold text-white tracking-tight">বিবাহ হাব</span>
                <span className="text-[10px] font-medium text-gray-400 tracking-wide">Bibaho Hub</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
              {t.footer.tagline}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'Twitter' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#8949f2] flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <a
              href="#download-section"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#8949f2] hover:bg-[#6737b6] text-white font-bold text-sm rounded-full shadow transition-all active:scale-95"
            >
              <Heart size={14} fill="white" />
              {t.footer.downloadApp}
            </a>
          </div>

          {/* Link columns */}
          {LINK_SECTIONS.map(({ heading, items }) => (
            <div key={heading} className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{heading}</h4>
              <ul className="space-y-2.5 text-sm text-gray-300">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    {href.startsWith('/') ? (
                      <Link href={href} className="hover:text-[#c4a0f7] transition-colors">
                        {label}
                      </Link>
                    ) : (
                      <a href={href} className="hover:text-[#c4a0f7] transition-colors">{label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Subfooter */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-wrap items-center gap-3">
            <span>{t.footer.copyright}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Shield size={11} className="text-[#8949f2]" />
              <span className="text-[#8949f2] font-semibold">{t.footer.gdprNote}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <span>{t.footer.madeWith}</span>
              <Heart size={11} className="text-[#8949f2]" fill="currentColor" />
              <span>{t.footer.forConnections}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <span>Owned by</span>
              <a
                href="https://eratechltd.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-400 hover:text-[#c4a0f7] transition-colors"
              >
                Era Tech Ltd
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
