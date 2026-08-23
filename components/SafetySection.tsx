'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Shield, ShieldCheck, Eye, AlertTriangle, RefreshCw, Lock, KeyRound, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function SafetySection() {
  const { t } = useLanguage();
  const targetText = t.safety.scrambleText;
  const [scrambleText, setScrambleText] = useState<string>(targetText);
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = '01#@$%&*^!~<>?/\\';

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const phoneY  = useTransform(scrollYProgress, [0, 1], ['50px',  '-40px']);
  const copyY   = useTransform(scrollYProgress, [0, 1], ['25px',  '-15px']);
  const bgGlowY = useTransform(scrollYProgress, [0, 1], ['0px',   '70px']);

  useEffect(() => {
    setScrambleText(targetText);
  }, [targetText]);

  const runScramble = () => {
    setIsScrambling(true);
    let iteration = 0;
    const interval = setInterval(() => {
      setScrambleText(() =>
        targetText
          .split('')
          .map((letter, index) => {
            if (index < iteration) return targetText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      if (iteration >= targetText.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      iteration += 1 / 2;
    }, 40);
  };

  useEffect(() => {
    const timer = setInterval(() => runScramble(), 6000);
    return () => clearInterval(timer);
  }, [targetText]);

  const TRUST_PILLARS = [
    { icon: Lock,          title: t.safety.p1Title, desc: t.safety.p1Desc },
    { icon: ShieldCheck,   title: t.safety.p2Title, desc: t.safety.p2Desc },
    { icon: AlertTriangle, title: t.safety.p3Title, desc: t.safety.p3Desc },
    { icon: KeyRound,      title: t.safety.p4Title, desc: t.safety.p4Desc },
    { icon: Globe,         title: t.safety.p5Title, desc: t.safety.p5Desc },
  ];

  return (
    <section ref={sectionRef} id="safety-section" className="relative py-20 sm:py-28 px-4 sm:px-8 bg-gradient-to-br from-[#1B223D] to-[#0D1220] text-white overflow-hidden">

      <motion.div
        style={{ y: bgGlowY }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8949f2]/18 rounded-full blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* Left: Phone mockup */}
        <motion.div style={{ y: phoneY }} className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[9/18] bg-black rounded-[48px] p-3.5 shadow-[0_0_80px_rgba(137,73,242,0.35)] ring-1 ring-[#8949f2]/30 border-[6px] border-[#232C50]">
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-[#1B223D]" />
            </div>

            <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-[#161D38] flex flex-col justify-between p-6 pt-14">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#8949f2_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="font-mono">Bibaho Hub AES-256</span>
                <span className="flex items-center gap-1 text-[#8949f2] font-semibold">
                  <ShieldCheck size={14} /> {t.safety.secure}
                </span>
              </div>

              <div
                className="my-auto flex flex-col items-center justify-center text-center space-y-5 cursor-pointer group"
                onClick={runScramble}
                title="Click to trigger"
              >
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-[#8949f2]/10 border border-[#8949f2]/30 flex items-center justify-center animate-pulse-glow">
                    <Shield size={44} className="text-[#8949f2]" strokeWidth={2} />
                  </div>
                  <div className="absolute -inset-3 rounded-full border border-[#8949f2]/20 border-dashed animate-spin [animation-duration:15s]" />
                </div>

                <div className="space-y-2 max-w-[240px]">
                  <div className="text-[11px] uppercase tracking-widest text-[#c4a0f7] font-mono flex items-center justify-center gap-1.5">
                    <span>{t.safety.encryptionStatus}</span>
                    <RefreshCw size={11} className={isScrambling ? 'animate-spin' : ''} />
                  </div>
                  <div className="font-mono text-base font-bold text-white bg-black/60 px-4 py-2 rounded-xl border border-[#8949f2]/30 tracking-wider">
                    ...{scrambleText}...
                  </div>
                </div>
              </div>

              <div className="bg-[#232C50]/80 backdrop-blur-md rounded-2xl p-3 border border-[#8949f2]/20 text-center space-y-1">
                <div className="text-xs font-bold text-[#c4a0f7] flex items-center justify-center gap-1.5">
                  <Eye size={12} />
                  <span>{t.safety.onlyYouCanSee}</span>
                </div>
                <div className="text-[10px] text-gray-400">
                  {t.safety.messagesNote}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Copy */}
        <motion.div style={{ y: copyY }} className="lg:col-span-6 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8949f2]/15 text-[#c4a0f7] text-xs font-bold uppercase tracking-wider border border-[#8949f2]/25">
            <Shield size={12} />
            {t.safety.badge}
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
            {t.safety.heading1}{' '}
            <span className="text-[#8949f2]">{t.safety.heading2}</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-lg">
            {t.safety.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRUST_PILLARS.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className={`flex items-start gap-4 p-4 rounded-2xl bg-[#232C50] border border-[#8949f2]/20 ${i === 4 ? 'sm:col-span-2' : ''}`}>
                <div className="w-10 h-10 rounded-xl bg-[#8949f2]/15 border border-[#8949f2]/25 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-[#c4a0f7]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-1">{title}</div>
                  <div className="text-xs text-gray-400 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
