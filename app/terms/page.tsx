import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Bibaho Hub',
  description: 'Terms and Conditions governing your use of the Bibaho Hub matrimony platform and Matrimony mobile app.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-[#1B223D] flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-8 py-20">
        <div className="mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[#8949f2]/10 text-[#8949f2] text-xs font-semibold uppercase tracking-wider mb-4">
            Legal
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1B223D] mb-3">Terms &amp; Conditions</h1>
          <p className="text-sm text-gray-500">Last updated: August 2026 · Effective: August 2026</p>
          <p className="text-sm text-gray-500 mt-1">
            These Terms apply to the Bibaho Hub website and the <strong>Matrimony</strong> mobile app
            (iOS &amp; Android, package ID: <code className="text-xs bg-gray-100 px-1 rounded">com.eratechltd.matromony</code>).
          </p>
        </div>

        {/* Apple / Google acknowledgement banner */}
        <div className="mb-8 p-4 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600">
          <strong>Note for App Store users:</strong> Apple Inc. and Google LLC are not a party to this Agreement and bear no responsibility for the Matrimony app or its content. Apple is a third-party beneficiary of these Terms with respect to iOS users and may enforce them against you. In the event of any conflict between these Terms and the Apple App Store Terms of Service or Google Play Terms of Service, the applicable store terms shall prevail.
        </div>

        <div className="prose prose-gray max-w-none space-y-8 text-[15px] leading-relaxed text-gray-700">

          {/* 1 */}
          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-2">1. Acceptance of Terms</h2>
            <p>
              By creating an account or using Bibaho Hub ("the Service" or "the App"), you agree to be bound by these Terms &amp; Conditions and our <Link href="/privacy-policy" className="text-[#8949f2] hover:underline">Privacy Policy</Link>. If you do not agree, please do not use the Service. These terms apply to all visitors, registered members, and subscribers.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-2">2. Eligibility &amp; Age Requirement</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>You must be at least <strong>18 years old</strong> to register or use Bibaho Hub.</li>
              <li>You must be legally eligible to enter into a binding agreement in your country of residence.</li>
              <li>You must not have been previously banned from the platform.</li>
              <li>By registering, you confirm that you meet these requirements.</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-2">3. Account Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>You must provide accurate, honest, and up-to-date information when creating your profile.</li>
              <li>You are responsible for maintaining the confidentiality of your password and account credentials.</li>
              <li>You must not create multiple accounts or share your account with others.</li>
              <li>You must not impersonate any other person or misrepresent your identity.</li>
              <li>You are solely responsible for all activity that occurs under your account.</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-2">4. Matrimony Platform Disclaimer</h2>
            <p>
              Bibaho Hub is a <strong>platform for introductions only</strong>. We facilitate connections between consenting adults seeking matrimony. We do not:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Guarantee any marriage or relationship outcome.</li>
              <li>Verify every detail of every member profile (though we do require identity verification).</li>
              <li>Take responsibility for the conduct of members outside the platform.</li>
            </ul>
            <p className="mt-2">
              <strong>Personal safety:</strong> Always exercise personal caution when meeting someone for the first time. Meet in a public place, inform a trusted friend or family member, and trust your instincts. Report any concerns to us immediately.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-2">5. Acceptable Use</h2>
            <p>When using Bibaho Hub, you agree <strong>not</strong> to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Harass, abuse, threaten, stalk, or harm other members.</li>
              <li>Post false, misleading, or defamatory content.</li>
              <li>Use a fake name, photo, or pretend to be someone you are not.</li>
              <li>Solicit money, gifts, or financial information from other members.</li>
              <li>Share another member&apos;s personal information (photos, messages, contact details) outside the app without their explicit consent.</li>
              <li>Send unsolicited commercial messages (spam).</li>
              <li>Use the platform for commercial solicitation, escort services, or any illegal activity without prior written consent from Era Tech Ltd.</li>
              <li>Attempt to access accounts or data of other users without authorisation.</li>
              <li>Scrape, copy, reverse-engineer, or circumvent any part of the platform.</li>
              <li>Upload content that is sexually explicit, violent, hateful, or discriminatory.</li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-2">6. Subscriptions &amp; Payments</h2>
            <p>Certain features of Bibaho Hub require a paid subscription.</p>

            <h3 className="text-base font-semibold text-[#1B223D] mt-4 mb-2">General</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Subscriptions automatically renew unless cancelled before the renewal date.</li>
              <li>We will notify you of any price changes at least <strong>30 days</strong> in advance.</li>
              <li>We offer a <strong>7-day refund</strong> on first-time purchases if you have not used any premium features. Email <a href="mailto:support@bibahoGhor.com" className="text-[#8949f2] hover:underline">support@bibahoGhor.com</a> to request a refund.</li>
              <li>If a free trial is offered, it will automatically convert to a paid subscription at the end of the trial period unless cancelled.</li>
            </ul>

            <h3 className="text-base font-semibold text-[#1B223D] mt-4 mb-2">iOS (Apple App Store)</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Payment will be charged to your <strong>Apple ID account</strong> at confirmation of purchase.</li>
              <li>Subscriptions automatically renew unless cancelled at least <strong>24 hours</strong> before the end of the current period.</li>
              <li>Your account will be charged for renewal within 24 hours prior to the end of the current period at the rate of the selected plan.</li>
              <li>To manage or cancel your subscription: open <strong>iPhone Settings → [Your Name] → Subscriptions → Matrimony</strong>.</li>
            </ul>

            <h3 className="text-base font-semibold text-[#1B223D] mt-4 mb-2">Android (Google Play)</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Payment will be charged to your <strong>Google Play account</strong> at confirmation of purchase.</li>
              <li>Subscriptions automatically renew unless cancelled before the renewal date.</li>
              <li>To manage or cancel your subscription: open <strong>Google Play → Menu → Subscriptions → Matrimony</strong>.</li>
            </ul>

            <h3 className="text-base font-semibold text-[#1B223D] mt-4 mb-2">Web</h3>
            <p>Web subscriptions are processed securely by Stripe. By subscribing via the web, you also agree to <a href="https://stripe.com/legal/end-users" target="_blank" rel="noopener noreferrer" className="text-[#8949f2] hover:underline">Stripe&apos;s terms</a>.</p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-2">7. Content Moderation</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>We reserve the right to review, edit, or remove any content that violates these Terms or our Community Guidelines, without prior notice.</li>
              <li>Users can report inappropriate profiles or messages via the in-app <strong>Report</strong> button on any profile or message thread.</li>
              <li>We aim to review all reports within <strong>48 hours</strong>.</li>
              <li>Repeated violations or severe single violations (e.g., explicit content, fraud, threats) will result in immediate account suspension or permanent ban.</li>
              <li>Banned users may appeal to <a href="mailto:support@bibahoGhor.com" className="text-[#8949f2] hover:underline">support@bibahoGhor.com</a>. We will respond within 14 days.</li>
            </ul>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-2">8. Content &amp; Intellectual Property</h2>
            <p>
              You retain ownership of the content you post (photos, messages, profile text). By uploading content, you grant Era Tech Ltd a non-exclusive, royalty-free, worldwide licence to store, display, and distribute that content within the platform solely for the purpose of providing the Service.
            </p>
            <p className="mt-2">
              All platform code, design, branding, logos, and features are the intellectual property of <strong>Era Tech Ltd</strong> and may not be reproduced, distributed, or used without prior written permission.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-2">9. Safety &amp; Verification</h2>
            <p>
              We verify identity documents to reduce fraud and improve the safety of our community. However, we cannot guarantee the identity, intentions, or background of every member. You are responsible for exercising your own judgement when interacting with other users, especially when planning to meet in person.
            </p>
            <p className="mt-2">
              Report suspicious behaviour to <a href="mailto:safety@bibahoGhor.com" className="text-[#8949f2] hover:underline">safety@bibahoGhor.com</a> or via the in-app Report feature.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-2">10. Termination</h2>
            <p>
              We reserve the right to suspend or permanently ban any account that violates these Terms, without prior notice, at our sole discretion. You may also terminate your account at any time via the app&apos;s Settings or by following the steps on our{' '}
              <Link href="/delete-account" className="text-[#8949f2] hover:underline">Delete Account page</Link>.
            </p>
            <p className="mt-2">
              Upon termination, your right to use the Service ends immediately. Sections 8 (Intellectual Property), 11 (Limitation of Liability), and 12 (Governing Law) survive termination.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-2">11. Limitation of Liability</h2>
            <p>
              Bibaho Hub is provided "as is" and "as available." We make no guarantees that the Service will be uninterrupted, error-free, or that it will result in a successful match or marriage.
            </p>
            <p className="mt-2">
              To the fullest extent permitted by applicable law, Era Tech Ltd, its directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of data, loss of profits, personal injury, or property damage — arising from your use of, or inability to use, the platform.
            </p>
            <p className="mt-2">
              Our total liability to you for any claim arising from the use of the Service shall not exceed the amount you paid to us in the <strong>12 months</strong> preceding the claim.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-2">12. Governing Law &amp; Dispute Resolution</h2>
            <p>
              These Terms are governed by the laws of <strong>England and Wales</strong>, without regard to conflict of law principles.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li><strong>UK / Non-EU users:</strong> Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</li>
              <li><strong>EU users:</strong> Nothing in these Terms limits your rights under applicable EU consumer protection laws. EU consumers may also make use of the EU Online Dispute Resolution platform.</li>
              <li><strong>All users:</strong> Before initiating any formal proceedings, we ask that you contact us at <a href="mailto:legal@bibahoGhor.com" className="text-[#8949f2] hover:underline">legal@bibahoGhor.com</a> so we can try to resolve the dispute informally.</li>
            </ul>
          </section>

          {/* 13 */}
          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-2">13. Apple App Store &amp; Google Play — Additional Terms</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Apple Inc.</strong> and <strong>Google LLC</strong> are not parties to this Agreement and have no obligation to provide any maintenance or support for the App.</li>
              <li>Apple and Google are not responsible for addressing any claims you or any third party may have relating to the App (including product liability claims, consumer protection claims, or intellectual property infringement claims).</li>
              <li><strong>iOS users:</strong> Apple is a third-party beneficiary of these Terms and, upon your acceptance, Apple will have the right (and will be deemed to have accepted the right) to enforce these Terms against you.</li>
              <li>Your use of the App must also comply with the <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer" className="text-[#8949f2] hover:underline">Apple App Store Terms of Service</a> and the <a href="https://play.google.com/about/play-terms/" target="_blank" rel="noopener noreferrer" className="text-[#8949f2] hover:underline">Google Play Terms of Service</a>.</li>
            </ul>
          </section>

          {/* 14 */}
          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-2">14. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. We will provide at least <strong>14 days&apos; notice</strong> of material changes via email or in-app notification. Continued use of the Service after changes take effect constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* 15 */}
          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-2">15. Contact Us</h2>
            <p>For questions about these Terms:</p>
            <p className="mt-2">
              <strong>Email:</strong>{' '}
              <a href="mailto:legal@bibahoGhor.com" className="text-[#8949f2] hover:underline">legal@bibahoGhor.com</a><br />
              <strong>Company:</strong> Era Tech Ltd<br />
              <strong>Support:</strong>{' '}
              <a href="mailto:support@bibahoGhor.com" className="text-[#8949f2] hover:underline">support@bibahoGhor.com</a>
            </p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4 text-sm">
          <Link href="/privacy-policy" className="text-[#8949f2] hover:underline font-medium">Privacy Policy →</Link>
          <Link href="/delete-account" className="text-[#8949f2] hover:underline font-medium">Delete My Account →</Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
