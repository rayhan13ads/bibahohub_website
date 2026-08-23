'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Search, CheckCircle, Clock, AlertCircle, XCircle, Send } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { trackSupportTicket, postTicketReply } from '@/lib/api';
import type { SupportTicketResponse, TicketReply } from '@/lib/api';

const STATUS_CONFIG: Record<string, { label: string; icon: React.ComponentType<{ size?: number; className?: string }>; color: string }> = {
  OPEN: { label: 'Open', icon: Clock, color: 'text-blue-400 bg-blue-500/15 border-blue-500/30' },
  IN_PROGRESS: { label: 'In Progress', icon: Clock, color: 'text-amber-400 bg-amber-500/15 border-amber-500/30' },
  RESOLVED: { label: 'Resolved', icon: CheckCircle, color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30' },
  CLOSED: { label: 'Closed', icon: XCircle, color: 'text-gray-400 bg-gray-500/15 border-gray-500/30' },
};

function ReplyBubble({ reply, hc }: { reply: TicketReply; hc: { supportLabel: string; youLabel: string } }) {
  const ts = new Date(reply.created_at).toLocaleString();
  return (
    <div className={`flex flex-col gap-1 pl-3 border-l-2 ${reply.is_admin ? 'border-[#8949f2]' : 'border-white/20'}`}>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-bold ${reply.is_admin ? 'text-[#c4a0f7]' : 'text-gray-400'}`}>
          {reply.is_admin ? hc.supportLabel : reply.author_name}
        </span>
        <span className="text-[11px] text-gray-600">{ts}</span>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{reply.body}</p>
    </div>
  );
}

export default function TrackTicketPage() {
  const { t } = useLanguage();
  const hc = t.helpCenter;
  const [tokenInput, setTokenInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ticket, setTicket] = useState<SupportTicketResponse | null>(null);

  const [replyName, setReplyName] = useState('');
  const [replyBody, setReplyBody] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [replyError, setReplyError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    setError('');
    setTicket(null);
    setLoading(true);
    try {
      const res = await trackSupportTicket(tokenInput.trim());
      setTicket(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : hc.notFoundMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket || !replyName.trim() || !replyBody.trim()) return;
    setReplyError('');
    setSendingReply(true);
    try {
      await postTicketReply(ticket.token ?? tokenInput, { author_name: replyName.trim(), body: replyBody.trim() });
      setReplyBody('');
      const refreshed = await trackSupportTicket(ticket.token ?? tokenInput);
      setTicket(refreshed);
    } catch (err) {
      setReplyError(err instanceof Error ? err.message : 'Failed to send reply');
    } finally {
      setSendingReply(false);
    }
  };

  const statusCfg = ticket ? (STATUS_CONFIG[ticket.status] ?? STATUS_CONFIG.OPEN) : null;

  return (
    <main className="min-h-screen bg-[#1B223D]">
      <section className="relative pt-24 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#8949f2]/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-white mb-3"
          >
            {hc.trackHeading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-gray-400"
          >
            {hc.trackSubtitle}
          </motion.p>
        </div>
      </section>

      <div className="max-w-xl mx-auto px-4 pb-24 space-y-8">
        {/* Search form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8"
        >
          <form onSubmit={handleTrack} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                {hc.trackLabel}
              </label>
              <input
                type="text"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
                placeholder={hc.trackPlaceholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm placeholder-gray-500 focus:outline-none focus:border-[#8949f2] transition-all tracking-widest"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm">
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !tokenInput.trim()}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#8949f2] hover:bg-[#6737b6] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all active:scale-95"
            >
              <Search size={16} />
              {loading ? hc.tracking : hc.trackBtn}
            </button>
          </form>
        </motion.div>

        {ticket && statusCfg && (
          <>
            {/* Ticket status card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 space-y-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Ticket</p>
                  <p className="font-mono text-[#c4a0f7] font-bold text-lg tracking-widest">{ticket.token ?? tokenInput}</p>
                </div>
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${statusCfg.color}`}>
                  <statusCfg.icon size={13} />
                  {statusCfg.label}
                </span>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Subject</p>
                  <p className="text-white text-sm">{ticket.subject}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Category</p>
                    <p className="text-gray-300 text-sm">{ticket.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">{hc.submittedLabel}</p>
                    <p className="text-gray-300 text-sm">{new Date(ticket.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Reply thread + user reply form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 space-y-6"
            >
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{hc.replyHeading}</p>

              {/* Replies list */}
              {ticket.replies.length === 0 ? (
                <p className="text-sm text-gray-500 italic">{hc.noReplies}</p>
              ) : (
                <div className="space-y-4">
                  {ticket.replies.map((r) => (
                    <ReplyBubble key={r.id} reply={r} hc={{ supportLabel: hc.supportLabel, youLabel: hc.youLabel }} />
                  ))}
                </div>
              )}

              {/* User reply form */}
              <form onSubmit={handleSendReply} className="space-y-3 pt-2 border-t border-white/10">
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    {hc.replyNameLabel}
                  </label>
                  <input
                    type="text"
                    value={replyName}
                    onChange={(e) => setReplyName(e.target.value)}
                    placeholder={hc.replyNamePlaceholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#8949f2] transition-all"
                  />
                </div>
                <div>
                  <textarea
                    value={replyBody}
                    onChange={(e) => setReplyBody(e.target.value)}
                    placeholder={hc.replyPlaceholder}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#8949f2] transition-all resize-none"
                  />
                </div>

                {replyError && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-2 text-red-400 text-xs">
                    <AlertCircle size={14} />
                    {replyError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sendingReply || !replyName.trim() || !replyBody.trim()}
                  className="flex items-center gap-2 px-6 py-3 bg-[#8949f2] hover:bg-[#6737b6] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all active:scale-95"
                >
                  <Send size={14} />
                  {sendingReply ? hc.sendingReply : hc.replyBtn}
                </button>
              </form>
            </motion.div>
          </>
        )}

        <p className="text-center text-gray-500 text-sm">
          <Link href="/help-center" className="text-[#8949f2] hover:text-[#c4a0f7] font-semibold transition-colors">
            ← Back to Help Center
          </Link>
        </p>
      </div>
    </main>
  );
}
