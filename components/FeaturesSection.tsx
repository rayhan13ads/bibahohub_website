'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Lock, Clapperboard, Filter, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  badge: { label: string; color: string } | null;
  iconBg: string;
  iconColor: string;
}

function FeatureCard({ icon: Icon, title, desc, badge, iconBg, iconColor, delay }: Feature & { delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpotlight(s => ({ ...s, visible: false }));
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
      }}
      className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#8949f2]/20 overflow-hidden cursor-default"
    >
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: spotlight.visible ? 1 : 0,
          background: `radial-gradient(200px circle at ${spotlight.x}px ${spotlight.y}px, rgba(137,73,242,0.07), transparent 80%)`,
        }}
      />

      <div className="flex items-start gap-4 mb-4 relative">
        <motion.div
          whileHover={{ rotate: [0, -10, 8, 0], scale: 1.12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 12, duration: 0.5 }}
          className={`w-12 h-12 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}
        >
          <Icon size={24} />
        </motion.div>
        {badge && (
          <span className={`mt-1 ml-auto px-2.5 py-0.5 rounded-full text-[10px] font-bold ${badge.color}`}>
            {badge.label}
          </span>
        )}
      </div>
      <h3 className="text-base font-bold text-[#1B223D] mb-2 relative">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed relative">{desc}</p>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const { t } = useLanguage();

  const FEATURES: Feature[] = [
    {
      icon: Sparkles,
      title: t.features.f1Title,
      desc: t.features.f1Desc,
      badge: null,
      iconBg: 'bg-[#f3defe]',
      iconColor: 'text-[#8949f2]',
    },
    {
      icon: ShieldCheck,
      title: t.features.f2Title,
      desc: t.features.f2Desc,
      badge: { label: t.features.badgeTrust, color: 'bg-[#16A34A]/10 text-[#16A34A]' },
      iconBg: 'bg-[#16A34A]/10',
      iconColor: 'text-[#16A34A]',
    },
    {
      icon: Lock,
      title: t.features.f3Title,
      desc: t.features.f3Desc,
      badge: null,
      iconBg: 'bg-[#4d62ad]/10',
      iconColor: 'text-[#4d62ad]',
    },
    {
      icon: Clapperboard,
      title: t.features.f4Title,
      desc: t.features.f4Desc,
      badge: { label: t.features.badgeNew, color: 'bg-[#e0a458]/15 text-[#c98f3d]' },
      iconBg: 'bg-[#e0a458]/15',
      iconColor: 'text-[#e0a458]',
    },
    {
      icon: Filter,
      title: t.features.f5Title,
      desc: t.features.f5Desc,
      badge: null,
      iconBg: 'bg-[#8949f2]/10',
      iconColor: 'text-[#8949f2]',
    },
    {
      icon: TrendingUp,
      title: t.features.f6Title,
      desc: t.features.f6Desc,
      badge: { label: t.features.badgeElite, color: 'bg-[#8949f2]/10 text-[#8949f2]' },
      iconBg: 'bg-[#f3defe]',
      iconColor: 'text-[#8949f2]',
    },
  ];

  return (
    <section id="features-section" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#F6F8FC]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3defe] text-[#8949f2] text-xs font-bold uppercase tracking-wider mb-5">
            {t.features.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B223D] tracking-tight">
            {t.features.heading1}{' '}
            <span className="text-[#8949f2]">{t.features.heading2}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed">
            {t.features.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
