'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, Send, CheckCircle, Copy, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { submitSupportTicket } from '@/lib/api';

const CATEGORY_VALUES = ['ACCOUNT', 'SUBSCRIPTION', 'TECHNICAL', 'PAYMENT', 'PRIVACY', 'OTHER'];

const STATUS_COLORS: Record<string, string> = {
  OPEN: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  IN_PROGRESS: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  RESOLVED: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  CLOSED: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
};

function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((item, i) => (
        <div key={i} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-6 py-4 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-white font-semibold text-sm pr-4">{item.q}</span>
            <ChevronDown
              size={18}
              className={`text-[#8949f2] shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function SubmitForm() {
  const { t } = useLanguage();
  const hc = t.helpCenter;
  const [form, setForm] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    subject: '',
    description: '',
    category: 'OTHER',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await submitSupportTicket({
        user_name: form.user_name,
        user_email: form.user_email,
        user_phone: form.user_phone || undefined,
        subject: form.subject,
        description: form.description,
        category: form.category,
      });
      setToken(res.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit ticket');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (token) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl bg-emerald-500/10 border border-emerald-500/30 p-8 text-center space-y-5"
      >
        <CheckCircle size={48} className="text-emerald-400 mx-auto" />
        <h3 className="text-white text-xl font-bold">{hc.successTitle}</h3>
        <p className="text-gray-400 text-sm">{hc.successMsg}</p>
        <div className="flex items-center justify-center gap-3 bg-white/5 rounded-2xl px-6 py-4">
          <span className="font-mono text-[#c4a0f7] text-2xl font-bold tracking-widest">{token}</span>
          <button onClick={handleCopy} className="text-gray-400 hover:text-[#8949f2] transition-colors">
            {copied ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} />}
          </button>
        </div>
        <p className="text-gray-500 text-xs">{hc.successNote}</p>
        <Link
          href="/help-center/track"
          className="inline-flex items-center gap-2 text-[#8949f2] hover:text-[#c4a0f7] text-sm font-semibold transition-colors"
        >
          {hc.trackHeading} <ArrowRight size={14} />
        </Link>
      </motion.div>
    );
  }

  const inputClass = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#8949f2] focus:bg-white/8 transition-all';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-1.5">{hc.labelName} *</label>
          <input
            type="text"
            name="user_name"
            required
            value={form.user_name}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-1.5">{hc.labelEmail} *</label>
          <input
            type="email"
            name="user_email"
            required
            value={form.user_email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-1.5">{hc.labelPhone}</label>
          <input
            type="tel"
            name="user_phone"
            value={form.user_phone}
            onChange={handleChange}
            placeholder="+1 234 567 890"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-semibold mb-1.5">{hc.labelCategory} *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass}
          >
            {hc.categories.map((label, i) => (
              <option key={i} value={CATEGORY_VALUES[i]} className="bg-[#1B223D]">
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-gray-400 text-xs font-semibold mb-1.5">{hc.labelSubject} *</label>
        <input
          type="text"
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          placeholder="Brief description of your issue"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-gray-400 text-xs font-semibold mb-1.5">{hc.labelMessage} *</label>
        <textarea
          name="description"
          required
          value={form.description}
          onChange={handleChange}
          rows={5}
          placeholder="Please describe your issue in detail..."
          className={inputClass}
        />
      </div>

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#8949f2] hover:bg-[#6737b6] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all active:scale-95"
      >
        <Send size={16} />
        {submitting ? hc.submitting : hc.submitBtn}
      </button>
    </form>
  );
}

export default function HelpCenterClient() {
  const { t } = useLanguage();
  const hc = t.helpCenter;
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#1B223D]">
      {/* Hero */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#8949f2]/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium mb-8 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-[#c4a0f7] bg-[#8949f2]/15 border border-[#8949f2]/30 mb-6 tracking-wider uppercase"
          >
            {hc.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4"
          >
            {hc.headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            {hc.subtitle}
          </motion.p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-24 space-y-16">
        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">{hc.faqHeading}</h2>
          <FaqAccordion faqs={hc.faqs} />
        </motion.section>

        {/* Submit Ticket */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">{hc.submitHeading}</h2>
            <p className="text-gray-400 text-sm">{hc.submitSubtitle}</p>
          </div>
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-sm">
            <SubmitForm />
          </div>
          <p className="text-center mt-4 text-gray-500 text-sm">
            Already have a ticket?{' '}
            <Link href="/help-center/track" className="text-[#8949f2] hover:text-[#c4a0f7] font-semibold transition-colors">
              Track its status →
            </Link>
          </p>
        </motion.section>
      </div>
    </main>
  );
}
