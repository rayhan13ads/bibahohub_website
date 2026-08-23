'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { Users, Heart, Globe, Star } from 'lucide-react';
import type { PublicStats } from '@/lib/api';
import { useLanguage } from '@/lib/i18n/LanguageContext';

function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
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

interface StatsBarProps {
  stats?: PublicStats | null;
}

export default function StatsBar({ stats }: StatsBarProps) {
  const { t } = useLanguage();

  if (!stats) return null;

  const ratingWhole = stats.app_rating ? Math.floor(stats.app_rating) : null;
  const ratingDecimal = stats.app_rating
    ? (stats.app_rating - Math.floor(stats.app_rating)).toFixed(1).slice(1)
    : null;

  const STATS = [
    { icon: Users, label: t.stats.activeMembers,     value: stats.total_users,    suffix: '+',                                    color: 'text-[#8949f2]', bg: 'bg-[#f3defe]'      },
    { icon: Heart, label: t.stats.successfulMatches,  value: stats.total_matches,  suffix: '+',                                    color: 'text-[#e0a458]', bg: 'bg-[#e0a458]/15'   },
    { icon: Globe, label: t.stats.countries,          value: stats.countries_count, suffix: '+',                                   color: 'text-[#4d62ad]', bg: 'bg-[#4d62ad]/10'   },
    ...(ratingWhole !== null ? [{ icon: Star, label: t.stats.appRating, value: ratingWhole, suffix: `${ratingDecimal}★`, color: 'text-[#16A34A]', bg: 'bg-[#16A34A]/10' }] : []),
  ];

  return (
    <section className="py-12 px-4 sm:px-8 bg-[#F6F8FC] border-y border-gray-100">
      <div className={`max-w-7xl mx-auto grid grid-cols-2 ${STATS.length === 4 ? 'lg:grid-cols-4' : 'sm:grid-cols-3'} gap-6 sm:gap-8`}>
        {STATS.map(({ icon: Icon, label, value, suffix, color, bg }) => (
          <div key={label} className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
            <div className={`w-11 h-11 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0`}>
              <Icon size={22} />
            </div>
            <div>
              <div className={`text-2xl sm:text-3xl font-bold tabular-nums ${color}`}>
                <CountUp value={value} suffix={suffix} />
              </div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
