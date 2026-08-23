import type { Metadata } from 'next';
import HelpCenterClient from './HelpCenterClient';

export const metadata: Metadata = {
  title: 'Help Center | Bibaho Hub',
  description: 'Get help with your Bibaho Hub account. Browse FAQs or submit a support ticket and track its status.',
};

export default function HelpCenterPage() {
  return <HelpCenterClient />;
}
