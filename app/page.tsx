import ScrollProgressBar from '@/components/ScrollProgressBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import HowItWorks from '@/components/HowItWorks';
import FeaturesSection from '@/components/FeaturesSection';
import StoriesSocialSection from '@/components/StoriesSocialSection';
import FloatingManifesto from '@/components/FloatingManifesto';
import SafetySection from '@/components/SafetySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PricingSection from '@/components/PricingSection';
import AppDownloadSection from '@/components/AppDownloadSection';
import Footer from '@/components/Footer';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import { fetchTestimonials } from '@/lib/api';

export default async function Home() {
  const testimonials = await fetchTestimonials();

  return (
    <main className="min-h-screen bg-white text-[#1B223D] flex flex-col selection:bg-[#8949f2]/30 selection:text-white">
      <ScrollProgressBar />
      <Navbar />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <FeaturesSection />
      <StoriesSocialSection />
      <FloatingManifesto />
      <SafetySection />
      <TestimonialsSection testimonials={testimonials} />
      <PricingSection />
      <AppDownloadSection />
      <Footer />
      <CookieConsentBanner />
    </main>
  );
}
