'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Check, X, Sparkles } from 'lucide-react';
import type { Plan } from '@/lib/api';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface PlanTheme {
  gradient: string;
  glow: string;
  badge: string;
  check: string;
  saveBadge: string;
  ring: string;
}

const PLAN_THEMES: Record<string, PlanTheme> = {
  discovery: {
    gradient:  'from-slate-500 via-slate-600 to-gray-700',
    glow:      '',
    badge:     'bg-white/20 text-white',
    check:     'text-emerald-400',
    saveBadge: 'bg-emerald-400/20 text-emerald-300',
    ring:      'border border-gray-200',
  },
  connect: {
    gradient:  'from-blue-500 via-blue-600 to-indigo-700',
    glow:      'shadow-lg shadow-blue-500/20',
    badge:     'bg-white/20 text-white',
    check:     'text-emerald-400',
    saveBadge: 'bg-emerald-400/20 text-emerald-300',
    ring:      'border border-blue-100',
  },
  premium: {
    gradient:  'from-[#8949f2] via-[#7040d4] to-[#5028b0]',
    glow:      'shadow-xl shadow-[#8949f2]/30',
    badge:     'bg-white text-[#8949f2]',
    check:     'text-emerald-400',
    saveBadge: 'bg-emerald-400/20 text-emerald-300',
    ring:      'border-2 border-[#8949f2]/40',
  },
  elite: {
    gradient:  'from-[#f0b86a] via-[#e0a040] to-[#b87820]',
    glow:      'shadow-lg shadow-amber-400/25',
    badge:     'bg-white/25 text-white',
    check:     'text-emerald-400',
    saveBadge: 'bg-emerald-400/20 text-emerald-300',
    ring:      'border border-amber-200',
  },
};

function getTheme(plan: Plan): PlanTheme {
  return PLAN_THEMES[plan.name] ?? PLAN_THEMES.connect;
}

type Currency = 'USD' | 'EUR' | 'GBP';

const CURRENCY_SYMBOL: Record<Currency, string> = { USD: '$', EUR: '€', GBP: '£' };
const CURRENCY_RATE: Record<Currency, number> = { USD: 1, EUR: 0.92, GBP: 0.79 };

function convertPrice(price: string, currency: Currency): string {
  return (parseFloat(price) * CURRENCY_RATE[currency]).toFixed(2);
}

function getPriceForDuration(plan: Plan, months: number): string | null {
  if (!plan.price_monthly) return null;
  const tier = plan.pricings.find((p) => p.duration_months === months);
  if (tier) return tier.price;
  return plan.price_monthly;
}

interface PricingClientProps {
  plans: Plan[];
}

export default function PricingClient({ plans }: PricingClientProps) {
  const { t } = useLanguage();
  const [months, setMonths] = useState(1);
  const [currency, setCurrency] = useState<Currency>('EUR');

  const availableMonths = useMemo(() => {
    const set = new Set<number>();
    set.add(1);
    plans.forEach((p) => p.pricings.forEach((tier) => set.add(tier.duration_months)));
    return Array.from(set).sort((a, b) => a - b);
  }, [plans]);

  const FEATURE_ROWS = [
    {
      label: t.pricing.connectionsPerMonth,
      getValue: (p: Plan) =>
        p.connection_requests_per_month === null
          ? t.pricing.unlimitedConnections
          : `${p.connection_requests_per_month} ${t.pricing.connections}`,
    },
    { label: t.pricing.messageYourMatches,  getValue: (p: Plan) => p.chat_enabled },
    { label: t.pricing.viewFullPhotos,       getValue: (p: Plan) => p.can_view_photos },
    { label: t.pricing.advancedSearch,       getValue: (p: Plan) => p.advanced_filters_enabled },
    { label: t.pricing.seeWhoViewed,         getValue: (p: Plan) => p.can_see_visitors },
    { label: t.pricing.voiceVideo,           getValue: (p: Plan) => p.can_use_voice_video },
    { label: t.pricing.verifiedBadge,        getValue: (p: Plan) => p.verified_badge_included },
    { label: t.pricing.boostProfile,         getValue: (p: Plan) => p.boost_enabled },
  ];

  const PLAN_SUMMARIES: Record<string, string> = {
    discovery: t.pricing.discoveryDesc,
    connect:   t.pricing.connectDesc,
    premium:   t.pricing.premiumDesc,
    elite:     t.pricing.eliteDesc,
  };

  const getDurationLabel = (m: number): string => {
    if (m === 1) return t.pricing.monthly;
    for (const plan of plans) {
      const tier = plan.pricings.find((p) => p.duration_months === m);
      if (tier?.discount_percent) return `${m} ${t.pricing.mo}  −${tier.discount_percent}%`;
    }
    return `${m} ${t.pricing.months}`;
  };

  return (
    <>
      {/* Currency selector */}
      <div className="flex justify-center gap-2 mb-6">
        {(['USD', 'EUR', 'GBP'] as Currency[]).map((c) => (
          <button
            key={c}
            onClick={() => setCurrency(c)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
              currency === c
                ? 'bg-[#1B223D] text-white shadow-sm'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-[#8949f2]/40 hover:text-[#8949f2]'
            }`}
          >
            {CURRENCY_SYMBOL[c]} {c}
          </button>
        ))}
      </div>

      {/* Billing duration toggle */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {availableMonths.map((m) => (
          <button
            key={m}
            onClick={() => setMonths(m)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              months === m
                ? 'bg-gradient-to-r from-[#8949f2] to-[#5028b0] text-white shadow-md shadow-[#8949f2]/30'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-[#8949f2]/40 hover:text-[#8949f2]'
            }`}
          >
            {getDurationLabel(m)}
          </button>
        ))}
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {plans.map((plan, i) => {
          const theme = getTheme(plan);
          const rawTotalPrice = getPriceForDuration(plan, months);
          const rawPricePerMonth =
            rawTotalPrice && months > 1
              ? (parseFloat(rawTotalPrice) / months).toFixed(2)
              : rawTotalPrice;
          const totalPrice = rawTotalPrice ? convertPrice(rawTotalPrice, currency) : null;
          const pricePerMonth = rawPricePerMonth ? convertPrice(rawPricePerMonth, currency) : null;
          const tier = plan.pricings.find((p) => p.duration_months === months);
          const discount = tier?.discount_percent ?? null;
          const sym = CURRENCY_SYMBOL[currency];

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={`relative rounded-2xl flex flex-col overflow-hidden ${theme.glow} ${theme.ring}`}
            >
              {/* Gradient header */}
              <div className={`bg-gradient-to-br ${theme.gradient} px-6 pt-8 pb-6 relative`}>
                {plan.name === 'premium' && (
                  <div className={`absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${theme.badge}`}>
                    <Sparkles size={10} />
                    {t.pricing.mostPopular}
                  </div>
                )}

                <p className="text-white/70 text-[11px] font-bold uppercase tracking-widest mb-2">
                  {plan.display_name}
                </p>

                <div className="flex items-end gap-1.5 mb-1">
                  {pricePerMonth ? (
                    <>
                      <span className="text-4xl font-black text-white leading-none">
                        {sym}{pricePerMonth}
                      </span>
                      <span className="text-white/60 text-sm pb-1">{t.pricing.perMonth}</span>
                    </>
                  ) : (
                    <span className="text-4xl font-black text-white leading-none">{t.pricing.free}</span>
                  )}
                </div>

                {months > 1 && totalPrice && (
                  <p className="text-white/55 text-[11px] mt-1">
                    {t.pricing.billedPrefix} {sym}{totalPrice} {t.pricing.billedEvery} {months} {t.pricing.billedMonths}
                  </p>
                )}

                {discount && (
                  <span className={`inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${theme.saveBadge}`}>
                    {t.pricing.save} {discount}%
                  </span>
                )}
              </div>

              {/* Features body */}
              <div className="bg-white flex flex-col flex-1 px-6 py-5">
                <ul className="space-y-3 flex-1">
                  {FEATURE_ROWS.map(({ label, getValue }) => {
                    const val = getValue(plan);
                    const included = val !== false;
                    return (
                      <li key={label} className="flex items-start gap-2.5 text-[13px]">
                        {included ? (
                          <Check size={15} className={`${theme.check} mt-0.5 shrink-0`} />
                        ) : (
                          <X size={15} className="text-gray-200 mt-0.5 shrink-0" />
                        )}
                        <span className={included ? 'text-gray-700' : 'text-gray-350'}>
                          {typeof val === 'string' ? val : label}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <p className="text-[11px] text-gray-400 leading-relaxed pt-4 mt-4 border-t border-gray-100">
                  {PLAN_SUMMARIES[plan.name] ?? `${t.pricing.everythingIn} ${plan.display_name}, ${t.pricing.andMore}`}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-center text-xs text-gray-400 mt-8">
        {t.pricing.trialNote}{' '}
        {t.pricing.pricesShownIn} {currency}. {t.pricing.vatNote}
      </p>
    </>
  );
}
