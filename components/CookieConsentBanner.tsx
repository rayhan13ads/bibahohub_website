'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Shield } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const STORAGE_KEY = 'cookie-consent';

export default function CookieConsentBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const dismiss = (choice: 'all' | 'essential' | 'manage') => {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Icon + text */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#f3defe] flex items-center justify-center shrink-0 mt-0.5">
                <Shield size={17} className="text-[#8949f2]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#1B223D] mb-0.5">{t.cookie.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {t.cookie.body}{' '}
                  <a href="#" className="text-[#8949f2] underline underline-offset-2 hover:text-[#6737b6]">{t.cookie.cookiePolicy}</a>
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => dismiss('manage')}
                className="text-xs text-[#8949f2] font-semibold underline underline-offset-2 px-2 py-2 hover:text-[#6737b6] transition-colors"
              >
                {t.cookie.manage}
              </button>
              <button
                onClick={() => dismiss('essential')}
                className="px-4 py-2 rounded-full border border-gray-200 text-xs font-semibold text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                {t.cookie.reject}
              </button>
              <button
                onClick={() => dismiss('all')}
                className="px-5 py-2 rounded-full bg-[#8949f2] hover:bg-[#6737b6] text-white text-xs font-bold shadow-sm shadow-[#8949f2]/20 transition-all active:scale-95"
              >
                {t.cookie.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
