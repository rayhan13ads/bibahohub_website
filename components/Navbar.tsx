'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Menu, X, Sparkles, Shield, Filter, Video, Star, Download, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { LangCode } from '@/lib/i18n/translations';

const LANGUAGES: { code: LangCode; label: string }[] = [
  { code: 'EN', label: 'English' },
  { code: 'FR', label: 'Français' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'NL', label: 'Nederlands' },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.14, ease: 'easeIn' as const } },
};

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (featuresRef.current && !featuresRef.current.contains(e.target as Node)) {
        setFeaturesOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_12px_rgba(137,73,242,0.08)]'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">

        {/* Brand Logo — animated entrance */}
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
        >
          <Image src="/logo.png" alt="Bibaho Hub" width={56} height={56} className="rounded-xl" />
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-bold text-[#8949f2] tracking-tight">বিবাহ হাব</span>
            <span className="text-[10px] font-medium text-[#4d62ad]/70 tracking-wide">Bibaho Hub</span>
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#1B223D]">
          {/* Features dropdown */}
          <div
            ref={featuresRef}
            className="relative"
            onMouseEnter={() => setFeaturesOpen(true)}
            onMouseLeave={() => setFeaturesOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 py-2 hover:text-[#8949f2] transition-colors focus:outline-none"
              onClick={() => setFeaturesOpen(!featuresOpen)}
            >
              <span>{t.nav.features}</span>
              <ChevronDown size={15} className={`transition-transform duration-200 ${featuresOpen ? 'rotate-180 text-[#8949f2]' : 'text-gray-400'}`} />
            </button>

            <AnimatePresence>
              {featuresOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl shadow-xl border border-[#8949f2]/10 p-2.5 space-y-1 z-50"
                >
                  {[
                    { icon: Sparkles, href: '/#how-it-works',      title: t.nav.smartMatching,      desc: t.nav.smartMatchingDesc },
                    { icon: Shield,   href: '/#safety-section',    title: t.nav.verifiedProfiles,   desc: t.nav.verifiedProfilesDesc },
                    { icon: Filter,   href: '/#features-section',  title: t.nav.advancedFilters,    desc: t.nav.advancedFiltersDesc },
                    { icon: Video,    href: '/#features-section',  title: t.nav.voiceVideo,         desc: t.nav.voiceVideoDesc },
                    { icon: Star,     href: '/#pricing-section',   title: t.nav.subscriptionPlans,  desc: t.nav.subscriptionPlansDesc },
                  ].map(({ icon: Icon, href, title, desc }) => (
                    <a
                      key={title}
                      href={href}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#8949f2]/5 transition-colors text-sm text-[#1B223D]"
                      onClick={() => setFeaturesOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#f3defe] text-[#8949f2] flex items-center justify-center shrink-0">
                        <Icon size={16} />
                      </div>
                      <div>
                        <div className="font-semibold">{title}</div>
                        <div className="text-xs text-gray-500">{desc}</div>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="/#how-it-works" className="hover:text-[#8949f2] transition-colors">{t.nav.howItWorks}</a>
          <a href="/#pricing-section" className="hover:text-[#8949f2] transition-colors">{t.nav.plans}</a>
          <a href="/#testimonials-section" className="hover:text-[#8949f2] transition-colors">{t.nav.successStories}</a>
          <a href="/#safety-section" className="hover:text-[#8949f2] transition-colors">{t.nav.safety}</a>
        </nav>

        {/* Right: language selector + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language selector */}
          <div
            ref={langRef}
            className="relative"
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-gray-500 hover:text-[#8949f2] hover:bg-[#8949f2]/5 transition-all focus:outline-none"
            >
              <Globe size={15} />
              <span>{lang}</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${langOpen ? 'rotate-180 text-[#8949f2]' : 'text-gray-400'}`} />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full right-0 mt-1 w-36 bg-white rounded-2xl shadow-xl border border-[#8949f2]/10 p-2 space-y-0.5 z-50"
                >
                  {LANGUAGES.map(({ code, label }) => (
                    <button
                      key={code}
                      onClick={() => { setLang(code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-colors text-left ${
                        lang === code
                          ? 'bg-[#8949f2]/10 text-[#8949f2] font-semibold'
                          : 'text-[#1B223D] hover:bg-[#8949f2]/5'
                      }`}
                    >
                      <span className="font-mono text-xs text-gray-400 w-6">{code}</span>
                      <span>{label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="/#download-section"
            className="px-6 py-2.5 rounded-full bg-[#8949f2] hover:bg-[#6737b6] text-white font-semibold text-sm shadow-md hover:shadow-[#8949f2]/30 hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
          >
            <span>{t.nav.downloadApp}</span>
            <Download size={15} />
          </a>
        </div>

        {/* Download CTA for sm–lg (no language selector) */}
        <div className="hidden sm:flex lg:hidden items-center gap-3">
          <a
            href="/#download-section"
            className="px-6 py-2.5 rounded-full bg-[#8949f2] hover:bg-[#6737b6] text-white font-semibold text-sm shadow-md hover:shadow-[#8949f2]/30 hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
          >
            <span>{t.nav.downloadApp}</span>
            <Download size={15} />
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href="/#download-section"
            className="p-2.5 rounded-full bg-[#8949f2] text-white shadow-sm"
          >
            <Download size={18} />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-[#8949f2] rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-gray-100 px-6 py-5 space-y-4 shadow-lg"
          >
            <div className="space-y-3 text-base font-medium text-[#1B223D]">
              {([
                ['/#features-section',    t.nav.features],
                ['/#how-it-works',        t.nav.howItWorks],
                ['/#pricing-section',     t.nav.plans],
                ['/#testimonials-section',t.nav.successStories],
                ['/#safety-section',      t.nav.safety],
              ] as [string, string][]).map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-[#8949f2] transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Language picker in mobile drawer */}
            <div className="pt-1 border-t border-gray-50">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Language</p>
              <div className="flex gap-2 flex-wrap">
                {LANGUAGES.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      lang === code
                        ? 'bg-[#8949f2] text-white border-[#8949f2]'
                        : 'border-gray-200 text-gray-500 hover:border-[#8949f2]/40'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <a
                href="/#download-section"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-[#8949f2] text-white font-semibold text-sm text-center flex items-center justify-center gap-2 shadow"
              >
                <span>{t.nav.downloadApp}</span>
                <Download size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
