'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Star, Heart } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { Testimonial } from '@/lib/api';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const { t } = useLanguage();

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials-section" className="py-20 sm:py-28 px-4 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3defe] text-[#8949f2] text-xs font-bold uppercase tracking-wider mb-5">
            <Heart size={12} fill="currentColor" />
            {t.testimonials.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B223D] tracking-tight">
            {t.testimonials.heading1}{' '}
            <span className="text-[#8949f2]">{t.testimonials.heading2}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:grid md:grid-cols-3 md:overflow-visible md:snap-none md:pb-0 md:mx-0 md:px-0">
          {testimonials.map(({ quote, bride_name, groom_name, bride_img_url, groom_img_url, location, married_date, rating }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#8949f2]/20 transition-all flex flex-col min-w-[300px] snap-start shrink-0 md:min-w-0 md:shrink"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(Math.min(rating, 5))].map((_, j) => (
                  <Star key={j} size={14} className="text-[#e0a458]" fill="#e0a458" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-6 italic">
                &ldquo;{quote}&rdquo;
              </p>

              {/* Couple */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {bride_img_url && (
                    <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden ring-2 ring-[#8949f2]/20">
                      <Image src={bride_img_url} alt={bride_name} fill className="object-cover" unoptimized />
                    </div>
                  )}
                  {groom_img_url && (
                    <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden ring-2 ring-[#e0a458]/30">
                      <Image src={groom_img_url} alt={groom_name} fill className="object-cover" unoptimized />
                    </div>
                  )}
                </div>
                <div className="flex items-center w-5 h-5 -ml-1">
                  <Heart size={14} className="text-[#8949f2]" fill="currentColor" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1B223D]">{bride_name} & {groom_name}</div>
                  <div className="text-xs text-gray-400">{location} · {married_date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
