'use client';

import React from 'react';
import { motion } from 'motion/react';
import { UserCircle, Search, MessageCircleHeart } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();

  const STEPS = [
    {
      number: '01',
      icon: UserCircle,
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      color: 'from-[#8949f2] to-[#6737b6]',
      accent: '#8949f2',
    },
    {
      number: '02',
      icon: Search,
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      color: 'from-[#4d62ad] to-[#3a4a82]',
      accent: '#4d62ad',
    },
    {
      number: '03',
      icon: MessageCircleHeart,
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      color: 'from-[#e0a458] to-[#c98f3d]',
      accent: '#e0a458',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3defe] text-[#8949f2] text-xs font-bold uppercase tracking-wider mb-5">
            {t.howItWorks.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B223D] tracking-tight leading-tight">
            {t.howItWorks.heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed">
            {t.howItWorks.subtitle}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Animated connector line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block absolute top-10 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px origin-left z-0"
            style={{
              background: 'linear-gradient(to right, #8949f2, #4d62ad, #e0a458)',
              opacity: 0.35,
            }}
          />

          {STEPS.map(({ number, icon: Icon, title, desc, color, accent }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, scale: 0.5, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 180, damping: 18, delay: i * 0.18 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Icon circle */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ scale: { type: 'spring', stiffness: 300, damping: 15 }, rotate: { type: 'tween', duration: 0.4, ease: 'easeInOut' } }}
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg mb-6`}
              >
                <Icon size={36} className="text-white" strokeWidth={1.5} />
              </motion.div>

              {/* Step number */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.18 + 0.25 }}
                className="absolute -top-3 -right-2 sm:right-auto sm:left-[calc(50%+32px)] w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white shadow-md"
                style={{ background: accent }}
              >
                {i + 1}
              </motion.div>

              <h3 className="text-xl font-bold text-[#1B223D] mb-3">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
