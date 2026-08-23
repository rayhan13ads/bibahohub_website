'use client';

import { Zap, RefreshCw } from 'lucide-react';
import { usePlans } from '@/hooks/use-plans';
import PricingClient from './PricingClient';
import { useLanguage } from '@/lib/i18n/LanguageContext';

function PricingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-2xl p-6 bg-white border border-gray-200 flex flex-col gap-4">
          <div className="h-4 w-20 bg-gray-200 rounded-full" />
          <div className="h-9 w-28 bg-gray-200 rounded-full" />
          <div className="space-y-2.5 mt-2">
            {Array.from({ length: 7 }).map((_, j) => (
              <div key={j} className="h-3 bg-gray-100 rounded-full" />
            ))}
          </div>
          <div className="h-10 w-full bg-gray-200 rounded-full mt-auto" />
        </div>
      ))}
    </div>
  );
}

function PricingUnavailable({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
        <RefreshCw size={24} className="text-gray-400" />
      </div>
      <p className="text-gray-500 text-sm max-w-xs">
        Pricing is temporarily unavailable. Please try again in a moment.
      </p>
      <button
        onClick={onRetry}
        className="px-5 py-2.5 rounded-full bg-[#8949f2] hover:bg-[#6737b6] text-white text-sm font-semibold transition-colors"
      >
        Retry
      </button>
    </div>
  );
}

export default function PricingSection() {
  const { data, isFetching, refetch } = usePlans();
  const { t } = useLanguage();

  const plans = data && data.length > 0 ? data : null;

  return (
    <section id="pricing-section" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#F6F8FC]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3defe] text-[#8949f2] text-xs font-bold uppercase tracking-wider mb-5">
            <Zap size={12} />
            {t.pricing.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B223D] tracking-tight mb-4">
            {t.pricing.heading}
          </h2>
          <p className="text-base text-gray-500">{t.pricing.subtitle}</p>
        </div>

        {isFetching
          ? <PricingSkeleton />
          : plans
            ? <PricingClient plans={plans} />
            : <PricingUnavailable onRetry={refetch} />
        }
      </div>
    </section>
  );
}
