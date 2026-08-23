'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { usePublicStats } from '@/hooks/use-public-stats';

export default function AppDownloadSection() {
  const { t } = useLanguage();
  const { data: stats } = usePublicStats();

  return (
    <section id="download-section" className="py-20 sm:py-28 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#8949f2] via-[#6737b6] to-[#4d62ad] px-6 py-16 sm:px-14 sm:py-20">

          {/* Decorative glows */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#e0a458]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.04] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-7"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-bold uppercase tracking-wider">
                <Heart size={13} fill="white" />
                {t.download.badge}
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                {t.download.heading}
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-md">
                {t.download.subtitle}
              </p>

              {/* Rating — only shown when API provides real data */}
              {stats?.app_rating && (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-[#e0a458]" fill="#e0a458" />
                    ))}
                  </div>
                  <span className="text-white/90 text-sm font-semibold">
                    {stats.app_rating}
                    {stats.review_count ? ` · ${stats.review_count.toLocaleString()}+ ${t.download.reviews}` : '★'}
                  </span>
                </div>
              )}

              {/* Payment methods */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-white/60 text-xs font-medium">{t.download.securePayments}</span>
                {['Stripe', 'PayPal', 'iDEAL', 'SEPA'].map((method) => (
                  <span key={method} className="px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white text-xs font-bold backdrop-blur-sm">
                    {method}
                  </span>
                ))}
              </div>

              {/* Store badges */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#"
                  className="flex items-center gap-3 px-5 py-3.5 bg-black rounded-2xl hover:bg-gray-900 transition-colors shadow-lg"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-white text-left">
                    <div className="text-[10px] opacity-70">{t.download.downloadOn}</div>
                    <div className="text-sm font-bold -mt-0.5">{t.download.appStore}</div>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 px-5 py-3.5 bg-black rounded-2xl hover:bg-gray-900 transition-colors shadow-lg"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                    <path d="M3.18 23.76c.3.17.64.21.99.09l13.12-7.32-2.87-2.89-11.24 10.12zM.55 1.62C.2 1.97 0 2.53 0 3.27v17.46c0 .74.2 1.3.55 1.65l.09.08 9.77-9.77v-.23L.64 1.54l-.09.08zM20.37 10.66l-2.77-1.55-3.14 3.14 3.14 3.14 2.8-1.56c.8-.45.8-1.18-.03-1.17zM3.18.24L16.3 7.56l-2.87 2.87L2.19.31c.28-.13.64-.16.99-.07z"/>
                  </svg>
                  <div className="text-white text-left">
                    <div className="text-[10px] opacity-70">{t.download.getItOn}</div>
                    <div className="text-sm font-bold -mt-0.5">{t.download.googlePlay}</div>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Right: Phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-[220px] sm:w-[260px]">
                <div className="absolute inset-0 bg-white/20 rounded-[48px] blur-2xl scale-90 translate-y-4" />

                <div className="relative bg-black rounded-[44px] p-3 shadow-2xl border-[5px] border-white/15">
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-10" />
                  <div className="relative w-full aspect-[9/19.5] rounded-[34px] overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1604881991720-f91add269bed?w=400&h=800&fit=crop&crop=center"
                      alt="Bibaho Hub App"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#8949f2]/60 via-transparent to-[#1B223D]/80 flex flex-col justify-between p-4 pt-10">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl overflow-hidden border border-white/20 shadow-md">
                          <Image src="/logo.png" alt="Bibaho Hub" width={32} height={32} className="object-cover w-full h-full" />
                        </div>
                        <div className="flex flex-col leading-none">
                          <span className="text-white text-[11px] font-bold tracking-tight">বিবাহ হাব</span>
                          <span className="text-white/60 text-[9px] font-medium">Bibaho Hub</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-white text-sm font-bold">{t.download.yourDailyMatches}</div>
                        <div className="flex gap-1.5">
                          {['photo-1531746020798-e6953c6e8e04', 'photo-1507003211169-0a1dd7228f2d', 'photo-1494790108377-be9c29b29330'].map((id) => (
                            <div key={id} className="relative w-14 h-16 rounded-xl overflow-hidden border-2 border-white/30">
                              <Image
                                src={`https://images.unsplash.com/${id}?w=80&h=100&fit=crop&crop=face`}
                                alt="Match"
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
