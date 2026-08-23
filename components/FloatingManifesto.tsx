'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'motion/react';
import { Heart, Users, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { usePublicStats } from '@/hooks/use-public-stats';

function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

function RotatingWord({ words }: { words: readonly string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), 3200);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <span className="relative inline-block">
      <span className="sr-only">{words[index]}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="inline-block text-[#C98F3D]"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
      <span className="absolute left-0 -bottom-1.5 w-full h-[4px] bg-[#E0A458]/40 rounded-full" />
    </span>
  );
}

export default function FloatingManifesto() {
  const { t } = useLanguage();
  const { data: stats } = usePublicStats();

  const totalUsers    = stats?.total_users    ?? 50000;
  const totalMatches  = stats?.total_matches  ?? 12000;
  const countriesCount = stats?.countries_count ?? 30;

  const usersValue  = totalUsers  >= 1000 ? Math.floor(totalUsers  / 1000) : totalUsers;
  const usersSuffix = totalUsers  >= 1000 ? 'K+' : '+';
  const matchesValue  = totalMatches >= 1000 ? Math.floor(totalMatches / 1000) : totalMatches;
  const matchesSuffix = totalMatches >= 1000 ? 'K+' : '+';

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgDotY   = useTransform(scrollYProgress, [0, 1], ['0px',   '70px']);
  const glowY    = useTransform(scrollYProgress, [0, 1], ['-30px', '60px']);
  const radarLY  = useTransform(scrollYProgress, [0, 1], ['20px',  '-30px']);
  const radarRY  = useTransform(scrollYProgress, [0, 1], ['-20px', '30px']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['25px',  '-25px']);

  return (
    <section ref={sectionRef} id="manifesto-section" className="relative overflow-hidden">
      <div className="relative bg-white px-6 py-16 sm:px-14 sm:py-24 text-center">

        {/* Top accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#8949f2] via-[#e0a458] to-[#4d62ad]" />

        {/* Parallax: dot texture */}
        <motion.div
          style={{ y: bgDotY }}
          className="absolute inset-0 bg-[radial-gradient(#8949f2_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] pointer-events-none"
          aria-hidden
        />

        {/* Parallax: soft lavender glow */}
        <motion.div
          style={{ y: glowY }}
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#f3defe] rounded-full blur-3xl opacity-60 pointer-events-none"
          aria-hidden
        />

        {/* Parallax: radar rings left */}
        <motion.div
          style={{ y: radarLY }}
          className="absolute left-10 top-1/2 -translate-y-1/2 w-44 h-44 hidden md:block pointer-events-none"
          aria-hidden
        >
          <div className="absolute inset-0 rounded-full border border-[#8949f2]/20 animate-ping" style={{ animationDuration: '3.2s' }} />
          <div className="absolute inset-8 rounded-full border border-[#8949f2]/15 animate-ping" style={{ animationDuration: '3.2s', animationDelay: '1.6s' }} />
          <div className="absolute inset-16 rounded-full border border-[#e0a458]/25" />
        </motion.div>

        {/* Parallax: radar rings right */}
        <motion.div
          style={{ y: radarRY }}
          className="absolute right-10 top-1/2 -translate-y-1/2 w-44 h-44 hidden md:block pointer-events-none"
          aria-hidden
        >
          <div className="absolute inset-0 rounded-full border border-[#e0a458]/20 animate-ping" style={{ animationDuration: '3.2s', animationDelay: '0.8s' }} />
          <div className="absolute inset-8 rounded-full border border-[#e0a458]/15 animate-ping" style={{ animationDuration: '3.2s', animationDelay: '2.4s' }} />
          <div className="absolute inset-16 rounded-full border border-[#8949f2]/20" />
        </motion.div>

        {/* Parallax: main content drifts */}
        <motion.div style={{ y: contentY }} className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f3defe] border border-[#8949f2]/20 text-[#8949f2] text-xs font-semibold uppercase tracking-wider mb-7"
          >
            <Heart size={13} fill="currentColor" />
            <span>{t.manifesto.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-[#1B223D] leading-[1.15] tracking-tight"
          >
            {t.manifesto.headline}{' '}
            <RotatingWord words={t.manifesto.rotatingWords} />
            {t.manifesto.headlineSuffix}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto"
          >
            {t.manifesto.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#8949f2] tabular-nums">
                <CountUp value={usersValue} suffix={usersSuffix} />
              </div>
              <div className="mt-1.5 text-xs text-gray-400 flex items-center justify-center gap-1.5">
                <Users size={14} className="text-[#8949f2]/60" />
                {t.stats.activeMembers}
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#8949f2] tabular-nums">
                <CountUp value={matchesValue} suffix={matchesSuffix} />
              </div>
              <div className="mt-1.5 text-xs text-gray-400 flex items-center justify-center gap-1.5">
                <Heart size={14} className="text-[#8949f2]/60" />
                {t.stats.successfulMatches}
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#8949f2] tabular-nums">
                <CountUp value={countriesCount} suffix="+" />
              </div>
              <div className="mt-1.5 text-xs text-gray-400 flex items-center justify-center gap-1.5">
                <Globe size={14} className="text-[#8949f2]/60" />
                {t.stats.countries}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
