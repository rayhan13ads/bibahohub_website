'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Camera, Clock, Eye, LayoutGrid, Heart, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function StoriesSocialSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgGlowY = useTransform(scrollYProgress, [0, 1], ['0px',  '80px']);
  const headerY = useTransform(scrollYProgress, [0, 1], ['30px', '-20px']);
  const leftY   = useTransform(scrollYProgress, [0, 1], ['50px', '-20px']);
  const rightY  = useTransform(scrollYProgress, [0, 1], ['70px', '-10px']);

  const storyChips = [t.stories.chip24h, t.stories.chipViewer, t.stories.chipFilters];
  const socialChips = [t.stories.chipLike, t.stories.chipConnections, t.stories.chipMedia];

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#060D1A] overflow-hidden">

      <motion.div
        style={{ y: bgGlowY }}
        className="absolute inset-x-0 top-0 h-[500px] bg-[#8949f2]/15 blur-3xl pointer-events-none"
        aria-hidden
      />
      <motion.div
        style={{ y: bgGlowY }}
        className="absolute inset-x-0 bottom-0 h-64 bg-[#e0a458]/8 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8949f2]/20 text-[#c4a0f7] text-xs font-bold uppercase tracking-wider mb-5 border border-[#8949f2]/30">
            {t.stories.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            {t.stories.heading1}{' '}
            <span className="text-[#8949f2]">{t.stories.heading2}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400 leading-relaxed">
            {t.stories.subtitle}
          </p>
        </motion.div>

        {/* Two cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Stories card */}
          <motion.div
            style={{ y: leftY }}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl bg-[#0D1525] border border-[#8949f2]/40 p-8 flex flex-col gap-6"
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#8949f2]/25 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#8949f2]/20 border border-[#8949f2]/30 flex items-center justify-center mb-5">
                <Camera size={28} className="text-[#c4a0f7]" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{t.stories.storiesTitle}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                {t.stories.storiesDesc}
              </p>
            </div>

            {/* Feature chips */}
            <div className="relative z-10 flex flex-wrap gap-2">
              {storyChips.map((chip, i) => {
                const icons = [Clock, Eye, Camera];
                const Icon = icons[i];
                return (
                  <span key={chip} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8949f2]/15 border border-[#8949f2]/25 text-[#c4a0f7] text-xs font-semibold">
                    <Icon size={11} />
                    {chip}
                  </span>
                );
              })}
            </div>

            {/* Mini story preview */}
            <div className="relative z-10 flex gap-3 pt-2">
              {['#8949f2', '#e0a458', '#4d62ad'].map((color, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-14 h-14 rounded-full p-[2.5px]"
                    style={{ background: `conic-gradient(${color} 0%, ${color} 80%, #0D1525 80%)` }}
                  >
                    <div className="w-full h-full rounded-full bg-[#0D1525] flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8949f2]/40 to-[#4d62ad]/40 flex items-center justify-center">
                        <Camera size={14} className="text-white/60" />
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500">{t.stories.storyLabel} {i + 1}</span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-1.5 justify-center ml-1">
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#8949f2]/30 flex items-center justify-center">
                  <span className="text-[#8949f2] text-xl font-light">+</span>
                </div>
                <span className="text-[10px] text-gray-500">{t.stories.addLabel}</span>
              </div>
            </div>
          </motion.div>

          {/* Social Posts card */}
          <motion.div
            style={{ y: rightY }}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl bg-[#0D1525] border border-[#e0a458]/35 p-8 flex flex-col gap-6"
          >
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#e0a458]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#e0a458]/15 border border-[#e0a458]/25 flex items-center justify-center mb-5">
                <LayoutGrid size={28} className="text-[#e0a458]" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{t.stories.socialTitle}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                {t.stories.socialDesc}
              </p>
            </div>

            {/* Feature chips */}
            <div className="relative z-10 flex flex-wrap gap-2">
              {socialChips.map((chip, i) => {
                const icons = [Heart, Eye, LayoutGrid];
                const Icon = icons[i];
                return (
                  <span key={chip} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e0a458]/10 border border-[#e0a458]/20 text-[#e0a458] text-xs font-semibold">
                    <Icon size={11} />
                    {chip}
                  </span>
                );
              })}
            </div>

            {/* Mini post preview */}
            <div className="relative z-10 space-y-2.5 pt-2">
              {[
                { text: 'Excited for this new chapter...', likes: 24, comments: 8 },
                { text: 'Sharing a little about my family values 🌿', likes: 41, comments: 15 },
              ].map((post, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#060D1A]/80 rounded-2xl px-4 py-3 border border-white/5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8949f2]/50 to-[#4d62ad]/50 shrink-0" />
                  <p className="text-xs text-gray-300 flex-1 truncate">{post.text}</p>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="flex items-center gap-1 text-[10px] text-gray-500">
                      <Heart size={10} className="text-[#e0a458]" fill="#e0a458" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-gray-500">
                      <MessageSquare size={10} /> {post.comments}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
