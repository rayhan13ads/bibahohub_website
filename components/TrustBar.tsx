'use client';

import React from 'react';
import { Shield, Lock, Globe, KeyRound, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function TrustBar() {
  const { t } = useLanguage();

  const TRUST_ITEMS = [
    { icon: Shield,      label: t.trustBar.sslSecured },
    { icon: Lock,        label: t.trustBar.gdprCompliant },
    { icon: Globe,       label: t.trustBar.euData },
    { icon: KeyRound,    label: t.trustBar.encryption },
    { icon: ShieldCheck, label: t.trustBar.moderation },
  ];

  return (
    <div className="py-4 px-4 sm:px-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto sm:justify-center scrollbar-hide">
          {TRUST_ITEMS.map(({ icon: Icon, label }, i) => (
            <React.Fragment key={label}>
              <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                <Icon size={13} className="text-[#8949f2]/60" />
                <span className="text-xs font-medium text-gray-400">{label}</span>
              </div>
              {i < TRUST_ITEMS.length - 1 && (
                <span className="hidden sm:block text-gray-200 shrink-0 select-none">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
