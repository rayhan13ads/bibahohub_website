'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Star, CheckCircle, Heart, ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { usePublicStats } from '@/hooks/use-public-stats';

const PROFILES = [
  { name: 'Priya S.', age: 26, location: 'London, UK',     img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=150&fit=crop&crop=faces', verified: true  },
  { name: 'Arif R.', age: 29, location: 'Amsterdam, NL',   img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=150&fit=crop&crop=faces', verified: true  },
  { name: 'Nadia K.',age: 25, location: 'Paris, FR',       img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=150&fit=crop&crop=faces', verified: false },
];

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

export default function Hero() {
  const { t } = useLanguage();
  const { data: stats } = usePublicStats();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const headline1Words = t.hero.headline1.split(' ');
  const headline2Words = t.hero.headline2.split(' ');

  return (
    <section className="relative px-4 sm:px-8 pt-4 pb-8 max-w-7xl mx-auto">
      <div className="relative w-full rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl bg-[#1B223D]">

        {/* Ambient glows */}
        <div className="absolute -top-32 -right-24 w-[600px] h-[600px] bg-[#8949f2]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-24 w-[500px] h-[500px] bg-[#4d62ad]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-0 w-[380px] h-[380px] bg-[#e0a458]/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#8949f2_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.06] pointer-events-none" />

        {/* Top accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#8949f2] via-[#e0a458] to-[#4d62ad] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6 py-10 sm:px-12 sm:py-12 lg:px-16 lg:py-12">

          {/* ── Left: staggered animated copy ── */}
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-xl">

            {/* Badge */}
            <motion.div variants={item}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8949f2]/20 border border-[#8949f2]/40 text-[#c4a0f7] text-xs font-bold uppercase tracking-wider">
                <Heart size={13} fill="currentColor" />
                {t.hero.badge}
              </div>
            </motion.div>

            {/* Headline — word-by-word animation */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[4.2rem] font-bold text-white tracking-tight leading-[1.06]">
              <span className="inline-flex flex-wrap gap-x-[0.28em]">
                {headline1Words.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 28, rotateX: -15 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease }}
                    className="inline-block"
                    style={{ transformOrigin: 'bottom center' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>{' '}
              <span className="relative inline-block text-[#e0a458]">
                <span className="inline-flex flex-wrap gap-x-[0.28em]">
                  {headline2Words.map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 28, rotateX: -15 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.07, ease }}
                      className="inline-block"
                      style={{ transformOrigin: 'bottom center' }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
                {/* Underline grows from left */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.75, ease }}
                  className="absolute left-0 -bottom-1.5 w-full h-[5px] rounded-full bg-gradient-to-r from-[#e0a458]/70 via-[#e0a458]/40 to-transparent origin-left"
                />
              </span>
            </h1>

            {/* Bengali subtitle */}
            <motion.p variants={item} className="text-sm font-semibold text-[#c4a0f7]/80 tracking-widest">
              বিবাহ হাব — আপনার আদর্শ সঙ্গী খুঁজুন
            </motion.p>

            {/* Body */}
            <motion.p variants={item} className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-md">
              {t.hero.body}
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#download-section"
                className="flex items-center gap-2.5 px-6 py-3.5 bg-white hover:bg-gray-50 text-[#1B223D] text-sm font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span>{t.hero.appStore}</span>
              </a>

              <a
                href="#download-section"
                className="flex items-center gap-2.5 px-6 py-3.5 bg-[#8949f2] hover:bg-[#6737b6] text-white text-sm font-bold rounded-full shadow-lg shadow-[#8949f2]/30 hover:shadow-[#8949f2]/50 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
                  <path d="M3.18 23.76c.3.17.64.21.99.09l13.12-7.32-2.87-2.89-11.24 10.12zM.55 1.62C.2 1.97 0 2.53 0 3.27v17.46c0 .74.2 1.3.55 1.65l.09.08 9.77-9.77v-.23L.64 1.54l-.09.08zM20.37 10.66l-2.77-1.55-3.14 3.14 3.14 3.14 2.8-1.56c.8-.45.8-1.18-.03-1.17zM3.18.24L16.3 7.56l-2.87 2.87L2.19.31c.28-.13.64-.16.99-.07z"/>
                </svg>
                <span>{t.hero.googlePlay}</span>
              </a>

              <a
                href="#how-it-works"
                className="group inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-semibold transition-colors"
              >
                <span>{t.hero.seeHowItWorks}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Trust indicators — pill style */}
            <motion.div variants={item} className="flex flex-wrap gap-2 pt-1">
              {[
                stats?.app_rating ? {
                  icon: <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-[#e0a458]" fill="#e0a458" />)}</div>,
                  label: `${stats.app_rating}★ ${t.hero.ratingLabel}`,
                } : null,
                { icon: <ShieldCheck size={11} className="text-[#8949f2]" />,  label: t.hero.verifiedProfiles },
                { icon: <CheckCircle size={11} className="text-[#16A34A]" />,  label: t.hero.freeToJoin      },
                { icon: <ShieldCheck size={11} className="text-[#4d62ad]" />,  label: t.hero.gdprCompliant   },
              ].filter((x): x is { icon: React.JSX.Element; label: string } => x !== null).map(({ icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-[11px] text-gray-300 font-medium backdrop-blur-sm">
                  {icon}
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: profile card visual with 3D tilt ── */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease }}
            className="relative flex justify-center lg:justify-end items-center"
          >
            {/* 3D tilt wrapper */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
            >
              {/* Profile card stack */}
              <div className="relative w-[300px] sm:w-[340px] lg:w-[380px]">

                <div className="absolute top-8 left-8 right-0 h-[420px] sm:h-[460px] bg-[#1a2340] rounded-3xl border border-[#8949f2]/10 opacity-35" />
                <div className="absolute top-4 left-4 right-0 h-[428px] sm:h-[468px] bg-[#232C50] rounded-3xl border border-[#8949f2]/20 shadow-xl opacity-65" />

                {/* Main card */}
                <div className="relative bg-[#232C50] rounded-3xl border border-[#8949f2]/30 shadow-2xl overflow-hidden">

                  {/* Photo */}
                  <div className="relative h-[300px] sm:h-[340px] w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=600&fit=crop&crop=faces"
                      alt="Priya S."
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#232C50] via-[#232C50]/30 to-transparent" />

                    {/* Verified badge */}
                    <div className="absolute top-3 right-3 bg-[#16A34A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <ShieldCheck size={10} />
                      {t.hero.verified}
                    </div>

                    {/* Online indicator */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                      <span className="text-[10px] text-white font-medium">{t.hero.onlineNow}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold text-base leading-tight">Priya S., 26</div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin size={10} className="text-gray-500" />
                          <span className="text-gray-400 text-xs">London, UK</span>
                        </div>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-[#8949f2] hover:bg-[#6737b6] flex items-center justify-center shadow-md shadow-[#8949f2]/30 transition-colors">
                        <Heart size={17} className="text-white" />
                      </button>
                    </div>

                    <div className="flex gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 bg-[#8949f2]/20 text-[#c4a0f7] rounded-full text-[10px] font-medium">Graduate</span>
                      <span className="px-2 py-0.5 bg-[#e0a458]/20 text-[#e0a458] rounded-full text-[10px] font-medium">Premium</span>
                      <span className="px-2 py-0.5 bg-[#16A34A]/15 text-[#4ADE80] rounded-full text-[10px] font-medium">Muslim</span>
                    </div>

                    {/* Compatibility bar */}
                    <div className="pt-0.5">
                      <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1.5">
                        <span>{t.hero.compatibilityLabel}</span>
                        <span className="text-[#8949f2] font-bold">94%</span>
                      </div>
                      <div className="h-1.5 bg-[#1B223D] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '94%' }}
                          transition={{ delay: 1.1, duration: 0.9, ease }}
                          className="h-full bg-gradient-to-r from-[#8949f2] to-[#e0a458] rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Match notification */}
                <motion.div
                  initial={{ opacity: 0, y: -14, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0,   scale: 1    }}
                  transition={{ delay: 0.85, duration: 0.5, ease }}
                  className="absolute -top-6 right-0 z-20 bg-[#1B223D]/90 backdrop-blur-md border border-[#8949f2]/35 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 animate-float-slow"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#8949f2]/20 border border-[#8949f2]/30 flex items-center justify-center">
                    <Heart size={15} className="text-[#c4a0f7]" fill="currentColor" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white/90">{t.hero.newMatch}</div>
                    <div className="text-[10px] text-gray-400">98% {t.hero.compatibility}</div>
                  </div>
                  <span className="ml-1 px-2.5 py-1 bg-[#8949f2] text-white rounded-full text-[10px] font-bold">{t.hero.view}</span>
                </motion.div>

                {/* Active now — only shown when API provides real count */}
                {stats?.active_users && (
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0  }}
                    transition={{ delay: 1.05, duration: 0.45, ease }}
                    className="absolute -left-3 top-[28%] z-20 bg-[#0D1220]/90 backdrop-blur-md border border-[#16A34A]/25 px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-float-delayed"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-60" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ADE80]" />
                    </span>
                    <span className="text-[11px] font-semibold text-[#4ADE80]">
                      {stats.active_users.toLocaleString()} {t.hero.activeNowLabel}
                    </span>
                  </motion.div>
                )}

                {/* Members count — only shown when API provides real count */}
                {stats && (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0  }}
                    transition={{ delay: 1.0, duration: 0.45, ease }}
                    className="absolute -bottom-6 left-0 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-[#8949f2]/15 px-3 py-2 rounded-2xl shadow-xl animate-float-slow"
                  >
                    <div className="flex -space-x-2">
                      {PROFILES.map((p) => (
                        <div key={p.name} className="relative w-7 h-7 rounded-full border-2 border-white overflow-hidden">
                          <Image src={p.img} alt={p.name} fill className="object-cover" unoptimized />
                        </div>
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-[#1B223D]">
                      {stats.total_users >= 1000
                        ? `${Math.floor(stats.total_users / 1000)}K+`
                        : `${stats.total_users}+`}{' '}
                      {t.stats.activeMembers}
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
