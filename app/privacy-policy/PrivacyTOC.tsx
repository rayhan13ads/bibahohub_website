'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ArrowUp, List } from 'lucide-react';

const SECTIONS = [
  { id: 'section-1',  label: '1. Who We Are' },
  { id: 'section-2',  label: "2. Age Restriction" },
  { id: 'section-3',  label: '3. Data We Collect' },
  { id: 'section-4',  label: '4. Mobile App Permissions' },
  { id: 'section-5',  label: '5. Push Notifications' },
  { id: 'section-6',  label: '6. How We Use Your Data' },
  { id: 'section-7',  label: '7. Legal Basis (GDPR)' },
  { id: 'section-8',  label: '8. Third-Party Services' },
  { id: 'section-9',  label: '9. Data Safety Summary' },
  { id: 'section-10', label: '10. International Transfers' },
  { id: 'section-11', label: '11. Data Sharing' },
  { id: 'section-12', label: '12. Retention & Deletion' },
  { id: 'section-13', label: '13. Your Rights' },
  { id: 'section-14', label: '14. California (CCPA)' },
  { id: 'section-15', label: '15. App Tracking (iOS)' },
  { id: 'section-16', label: '16. Cookies (Web)' },
  { id: 'section-17', label: '17. Security' },
  { id: 'section-18', label: '18. Policy Changes' },
  { id: 'section-19', label: '19. Contact & Complaints' },
];

export default function PrivacyTOC() {
  const [activeId, setActiveId] = useState<string>('');
  const [showTop, setShowTop] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 400);

      // Find the last section that has scrolled past the top
      let current = '';
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveId(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const tocList = (
    <ul className="space-y-0.5 text-sm">
      {SECTIONS.map(({ id, label }) => (
        <li key={id}>
          <a
            href={`#${id}`}
            onClick={() => setTocOpen(false)}
            className={`block px-3 py-1.5 rounded-lg transition-colors leading-snug ${
              activeId === id
                ? 'bg-[#8949f2]/12 text-[#8949f2] font-semibold'
                : 'text-gray-500 hover:text-[#8949f2] hover:bg-[#8949f2]/5'
            }`}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop sticky sidebar */}
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-24 rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-3">Contents</p>
          {tocList}
        </div>
      </aside>

      {/* Mobile collapsible TOC */}
      <div className="lg:hidden w-full rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden">
        <button
          onClick={() => setTocOpen(!tocOpen)}
          className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-[#1B223D]"
        >
          <span className="flex items-center gap-2"><List size={15} /> Table of Contents</span>
          <ChevronDown size={15} className={`transition-transform duration-200 text-gray-400 ${tocOpen ? 'rotate-180' : ''}`} />
        </button>
        {tocOpen && <div className="px-3 pb-4">{tocList}</div>}
      </div>

      {/* Scroll-to-top FAB */}
      {showTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-6 z-50 w-11 h-11 rounded-full bg-[#8949f2] text-white shadow-lg hover:bg-[#6737b6] active:scale-95 transition-all flex items-center justify-center"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </>
  );
}
