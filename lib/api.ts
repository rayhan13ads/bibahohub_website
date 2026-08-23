const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export interface PlanPricing {
  id: number;
  plan_id: number;
  duration_months: number;
  price: string;
  discount_percent: number | null;
  is_featured: boolean;
}

export interface Plan {
  id: number;
  name: string;
  display_name: string;
  storage_limit_bytes: number;
  connection_requests_per_month: number | null;
  chat_enabled: boolean;
  boost_enabled: boolean;
  can_view_photos: boolean;
  can_see_visitors: boolean;
  can_use_voice_video: boolean;
  advanced_filters_enabled: boolean;
  verified_badge_included: boolean;
  price_monthly: string | null;
  is_active: boolean;
  pricings: PlanPricing[];
}

export interface PublicStats {
  total_users: number;
  total_matches: number;
  countries_count: number;
  app_rating?: number;
  review_count?: number;
  active_users?: number;
}

export interface Testimonial {
  id: number;
  quote: string;
  bride_name: string;
  groom_name: string;
  bride_img_url?: string | null;
  groom_img_url?: string | null;
  location: string;
  married_date: string;
  rating: number;
}

export async function fetchPlans(): Promise<Plan[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/plans`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export interface SupportTicketPayload {
  user_name: string;
  user_email: string;
  user_phone?: string;
  subject: string;
  description: string;
  category?: string;
}

export interface TicketReply {
  id: number;
  author_name: string;
  is_admin: boolean;
  body: string;
  created_at: string;
}

export interface SupportTicketResponse {
  token: string;
  subject: string;
  status: string;
  category: string;
  created_at: string;
  replies: TicketReply[];
}

export async function submitSupportTicket(data: SupportTicketPayload): Promise<SupportTicketResponse> {
  const res = await fetch(`${API_BASE}/api/v1/support/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    let message = 'Failed to submit ticket';
    try {
      const j = JSON.parse(text);
      if (j.detail) message = Array.isArray(j.detail) ? j.detail.map((d: { msg?: string }) => d.msg || '').join(', ') : String(j.detail);
    } catch { /* ignore */ }
    throw new Error(message);
  }
  return res.json();
}

export async function trackSupportTicket(token: string): Promise<SupportTicketResponse> {
  const res = await fetch(`${API_BASE}/api/v1/support/tickets/track/${encodeURIComponent(token.toUpperCase())}`);
  if (!res.ok) {
    throw new Error(res.status === 404 ? 'Ticket not found. Please check your token.' : 'Failed to fetch ticket');
  }
  return res.json();
}

export async function postTicketReply(
  token: string,
  data: { author_name: string; body: string }
): Promise<TicketReply> {
  const res = await fetch(`${API_BASE}/api/v1/support/tickets/${encodeURIComponent(token.toUpperCase())}/replies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    let message = 'Failed to send reply';
    try {
      const j = JSON.parse(text);
      if (j.detail) message = Array.isArray(j.detail) ? j.detail.map((d: { msg?: string }) => d.msg || '').join(', ') : String(j.detail);
    } catch { /* ignore */ }
    throw new Error(message);
  }
  return res.json();
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/testimonials`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchPublicStats(): Promise<PublicStats | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/stats/public`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
