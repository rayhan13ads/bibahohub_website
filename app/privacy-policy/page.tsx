import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PrivacyTOC from './PrivacyTOC';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Bibaho Hub',
  description: 'Learn how Bibaho Hub collects, uses, and protects your personal data in the Matrimony app.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white text-[#1B223D] flex flex-col">
        {/* Breadcrumb */}
        <div className="border-b border-gray-100 bg-gray-50/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 py-3 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#8949f2] transition-colors font-medium">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-[#1B223D] font-medium">Privacy Policy</span>
          </div>
        </div>

        <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-8 py-12 w-full">
          {/* Page header */}
          <div className="mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-[#8949f2]/10 text-[#8949f2] text-xs font-semibold uppercase tracking-wider mb-4">
              Legal
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1B223D] mb-3">Privacy Policy</h1>
            <p className="text-sm text-gray-500">Last updated: August 2026 · Effective: August 2026</p>
            <p className="text-sm text-gray-500 mt-1">
              This policy applies to the Bibaho Hub website and the <strong>Matrimony</strong> mobile app
              (iOS &amp; Android, package ID: <code className="text-xs bg-gray-100 px-1 rounded">com.eratechltd.matromony</code>).
            </p>
          </div>

          {/* Layout: TOC sidebar (desktop) + mobile accordion + content */}
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <PrivacyTOC />
            <div className="flex-1 min-w-0">
              <div className="prose prose-gray max-w-none space-y-8 text-[15px] leading-relaxed text-gray-700">

                <section id="section-1">
                  <h2 className="text-lg font-bold text-[#1B223D] mb-2">1. Who We Are</h2>
                  <p>
                    Bibaho Hub ("we", "our", "us") is a trusted matrimony platform operated by <strong>Era Tech Ltd</strong>. We help South Asians worldwide find meaningful, values-driven life partnerships. We are committed to protecting your personal data in accordance with the <strong>General Data Protection Regulation (GDPR)</strong>, the UK Data Protection Act 2018, and all other applicable data protection laws.
                  </p>
                  <p className="mt-2">
                    <strong>Data Controller:</strong> Era Tech Ltd<br />
                    <strong>Privacy contact:</strong>{' '}
                    <a href="mailto:privacy@bibahoGhor.com" className="text-[#8949f2] hover:underline">privacy@bibahoGhor.com</a>
                  </p>
                </section>

                <section id="section-2">
                  <h2 className="text-lg font-bold text-[#1B223D] mb-2">2. Age Restriction — Children&apos;s Privacy</h2>
                  <p>
                    Our Service is strictly intended for users who are <strong>18 years of age or older</strong>. We do not knowingly collect personal data from anyone under 18. If you are under 18, please do not use the Matrimony app or this website.
                  </p>
                  <p className="mt-2">
                    If we become aware that we have inadvertently collected personal data from a person under 18, we will delete that account and all associated data immediately. If you believe a minor has created an account, please contact us at{' '}
                    <a href="mailto:privacy@bibahoGhor.com" className="text-[#8949f2] hover:underline">privacy@bibahoGhor.com</a>.
                  </p>
                </section>

                <section id="section-3">
                  <h2 className="text-lg font-bold text-[#1B223D] mb-2">3. Data We Collect</h2>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li><strong>Account information:</strong> Full name, date of birth, gender, email address, phone number.</li>
                    <li><strong>Profile information:</strong> Profile photos, videos, religion, education, profession, location, language preferences, and other matrimony details you choose to provide.</li>
                    <li><strong>Voice messages:</strong> Audio recordings you send to other members via in-app chat.</li>
                    <li><strong>Usage data:</strong> Screens visited, features used, search queries, match interactions, and activity logs.</li>
                    <li><strong>Payment data:</strong> Billing details processed securely through Stripe. We never store full card numbers on our servers.</li>
                    <li><strong>Device &amp; technical data:</strong> Device ID, IP address, operating system version, app version, crash reports, and push notification tokens.</li>
                    <li><strong>Authentication data:</strong> Login method (email/password, Google, Apple). If you use Sign in with Apple or Google Sign-In, we receive only the data those providers share with us (typically name and email).</li>
                    <li><strong>Communications:</strong> Messages sent between members via our platform (stored encrypted).</li>
                  </ul>
                </section>

                <section id="section-4">
                  <h2 className="text-lg font-bold text-[#1B223D] mb-2">4. Mobile App Permissions</h2>
                  <p>The Matrimony app requests the following device permissions. All permissions are optional and requested only when you first use the related feature. You can revoke them at any time in your phone&apos;s <strong>Settings</strong>.</p>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left p-2 border border-gray-200 font-semibold text-[#1B223D]">Permission</th>
                          <th className="text-left p-2 border border-gray-200 font-semibold text-[#1B223D]">Why we need it</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border border-gray-200"><strong>Camera</strong></td>
                          <td className="p-2 border border-gray-200">Taking profile photos and identity-verification photos/videos in-app.</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="p-2 border border-gray-200"><strong>Photo Library</strong></td>
                          <td className="p-2 border border-gray-200">Uploading existing photos from your device to your profile or gallery.</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-200"><strong>Microphone</strong></td>
                          <td className="p-2 border border-gray-200">Recording voice messages to send in chat conversations.</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="p-2 border border-gray-200"><strong>Notifications</strong></td>
                          <td className="p-2 border border-gray-200">Sending push notifications for new matches, messages, and system alerts.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-sm text-gray-500">
                    We do <strong>not</strong> access your contacts, location, or calendar. We do <strong>not</strong> use Apple&apos;s Advertising Identifier (IDFA) or track you across third-party apps or websites.
                  </p>
                </section>

                <section id="section-5">
                  <h2 className="text-lg font-bold text-[#1B223D] mb-2">5. Push Notifications</h2>
                  <p>
                    We use push notifications to alert you about new matches, incoming messages, and important platform updates. To receive push notifications, you must grant permission when prompted by the app (iOS) or they are enabled by default (Android, revocable in Settings).
                  </p>
                  <p className="mt-2">
                    You can disable push notifications at any time in your phone&apos;s <strong>Settings → Notifications → Matrimony</strong> without affecting your ability to use the app.
                  </p>
                </section>

                <section id="section-6">
                  <h2 className="text-lg font-bold text-[#1B223D] mb-2">6. How We Use Your Data</h2>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>To create and manage your account and profile.</li>
                    <li>To match you with compatible profiles based on your preferences and our algorithm.</li>
                    <li>To enable in-app messaging, voice messages, and other communication features.</li>
                    <li>To process subscription payments and send receipts.</li>
                    <li>To send important service notifications, security alerts, and push notifications.</li>
                    <li>To detect and prevent fraud, abuse, and spam.</li>
                    <li>To improve platform features and personalise your experience.</li>
                    <li>To diagnose technical issues and crashes via Firebase Crashlytics.</li>
                    <li>To comply with legal obligations.</li>
                  </ul>
                </section>

                <section id="section-7">
                  <h2 className="text-lg font-bold text-[#1B223D] mb-2">7. Legal Basis for Processing (GDPR)</h2>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li><strong>Contract performance</strong> — to provide our services to you.</li>
                    <li><strong>Legitimate interests</strong> — to improve the platform, prevent fraud, and ensure security.</li>
                    <li><strong>Consent</strong> — for marketing communications, optional analytics cookies, and optional permissions (camera, microphone, photos).</li>
                    <li><strong>Legal obligation</strong> — to comply with applicable laws, including financial record-keeping requirements.</li>
                  </ul>
                </section>

                <section id="section-8">
                  <h2 className="text-lg font-bold text-[#1B223D] mb-2">8. Third-Party Services &amp; SDKs</h2>
                  <p>The Matrimony app integrates the following third-party services. Each processes data under their own privacy policies and our data processing agreements with them.</p>

                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left p-2 border border-gray-200 font-semibold text-[#1B223D]">Service</th>
                          <th className="text-left p-2 border border-gray-200 font-semibold text-[#1B223D]">Provider</th>
                          <th className="text-left p-2 border border-gray-200 font-semibold text-[#1B223D]">Purpose</th>
                          <th className="text-left p-2 border border-gray-200 font-semibold text-[#1B223D]">Data sent</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border border-gray-200">Firebase Authentication</td>
                          <td className="p-2 border border-gray-200">Google LLC</td>
                          <td className="p-2 border border-gray-200">Secure account login</td>
                          <td className="p-2 border border-gray-200">Email, phone, UID</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="p-2 border border-gray-200">Firebase Cloud Messaging</td>
                          <td className="p-2 border border-gray-200">Google LLC</td>
                          <td className="p-2 border border-gray-200">Push notifications</td>
                          <td className="p-2 border border-gray-200">Device token</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-200">Firebase Crashlytics</td>
                          <td className="p-2 border border-gray-200">Google LLC</td>
                          <td className="p-2 border border-gray-200">Crash &amp; error reporting</td>
                          <td className="p-2 border border-gray-200">Device info, stack traces</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="p-2 border border-gray-200">Firebase Analytics</td>
                          <td className="p-2 border border-gray-200">Google LLC</td>
                          <td className="p-2 border border-gray-200">Usage analytics</td>
                          <td className="p-2 border border-gray-200">Anonymised events, device info</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-200">Stripe</td>
                          <td className="p-2 border border-gray-200">Stripe, Inc.</td>
                          <td className="p-2 border border-gray-200">Payment processing</td>
                          <td className="p-2 border border-gray-200">Billing details (card never stored by us)</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="p-2 border border-gray-200">Google Sign-In</td>
                          <td className="p-2 border border-gray-200">Google LLC</td>
                          <td className="p-2 border border-gray-200">Optional social login</td>
                          <td className="p-2 border border-gray-200">Google profile name &amp; email</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-200">Sign in with Apple</td>
                          <td className="p-2 border border-gray-200">Apple Inc.</td>
                          <td className="p-2 border border-gray-200">Optional social login</td>
                          <td className="p-2 border border-gray-200">Apple ID name &amp; email (Apple controls)</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="p-2 border border-gray-200">Socket.io (chat relay)</td>
                          <td className="p-2 border border-gray-200">Era Tech Ltd (self-hosted)</td>
                          <td className="p-2 border border-gray-200">Real-time messaging</td>
                          <td className="p-2 border border-gray-200">Encrypted message payloads</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-sm text-gray-500">
                    Firebase services are operated by Google LLC. Data may be processed on Google&apos;s servers in the United States and other countries. See Section 10 for how we handle international transfers.
                  </p>
                </section>

                <section id="section-9">
                  <h2 className="text-lg font-bold text-[#1B223D] mb-2">9. Data Safety Summary</h2>
                  <p className="text-sm text-gray-500 mb-3">This table mirrors the information declared in the Google Play Data Safety section and Apple App Store privacy nutrition labels.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left p-2 border border-gray-200 font-semibold text-[#1B223D]">Data Type</th>
                          <th className="text-left p-2 border border-gray-200 font-semibold text-[#1B223D]">Collected</th>
                          <th className="text-left p-2 border border-gray-200 font-semibold text-[#1B223D]">Purpose</th>
                          <th className="text-left p-2 border border-gray-200 font-semibold text-[#1B223D]">Shared with</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border border-gray-200">Name, email, phone number</td>
                          <td className="p-2 border border-gray-200">Yes</td>
                          <td className="p-2 border border-gray-200">Account creation</td>
                          <td className="p-2 border border-gray-200">Not shared</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="p-2 border border-gray-200">Profile photos &amp; videos</td>
                          <td className="p-2 border border-gray-200">Yes</td>
                          <td className="p-2 border border-gray-200">Profile display</td>
                          <td className="p-2 border border-gray-200">Visible to other members</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-200">Voice messages (audio)</td>
                          <td className="p-2 border border-gray-200">Yes</td>
                          <td className="p-2 border border-gray-200">In-app chat</td>
                          <td className="p-2 border border-gray-200">Recipient member only</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="p-2 border border-gray-200">Device ID &amp; push token</td>
                          <td className="p-2 border border-gray-200">Yes</td>
                          <td className="p-2 border border-gray-200">Push notifications, fraud prevention</td>
                          <td className="p-2 border border-gray-200">Firebase (Google LLC)</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-200">Payment information</td>
                          <td className="p-2 border border-gray-200">Yes (via Stripe)</td>
                          <td className="p-2 border border-gray-200">Subscription processing</td>
                          <td className="p-2 border border-gray-200">Stripe, Inc. only</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="p-2 border border-gray-200">Crash logs &amp; diagnostics</td>
                          <td className="p-2 border border-gray-200">Yes</td>
                          <td className="p-2 border border-gray-200">App stability</td>
                          <td className="p-2 border border-gray-200">Firebase Crashlytics (Google LLC)</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-200">Usage analytics (anonymised)</td>
                          <td className="p-2 border border-gray-200">Yes</td>
                          <td className="p-2 border border-gray-200">Product improvement</td>
                          <td className="p-2 border border-gray-200">Firebase Analytics (Google LLC)</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="p-2 border border-gray-200">Dating / matrimony preferences</td>
                          <td className="p-2 border border-gray-200">Yes</td>
                          <td className="p-2 border border-gray-200">Matchmaking algorithm</td>
                          <td className="p-2 border border-gray-200">Not shared externally</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-sm text-gray-500">
                    <strong>We do not sell personal data.</strong> We do not use data for advertising to third parties.
                  </p>
                </section>

                <section id="section-10">
                  <h2 className="text-lg font-bold text-[#1B223D] mb-2">10. International Data Transfers</h2>
                  <p>
                    We are based in the UK/EU. However, some of our third-party service providers (notably Google Firebase and Stripe) may process your data on servers located in the United States or other countries outside the European Economic Area (EEA).
                  </p>
                  <p className="mt-2">
                    Where data is transferred outside the EEA or UK, we ensure appropriate safeguards are in place, including <strong>Standard Contractual Clauses (SCCs)</strong> approved by the European Commission, or reliance on adequacy decisions where applicable.
                  </p>
                </section>

                <section id="section-11">
                  <h2 className="text-lg font-bold text-[#1B223D] mb-2">11. Data Sharing</h2>
                  <p>We do not sell your personal data. We may share data in the following circumstances:</p>
                  <ul className="list-disc pl-5 space-y-1.5 mt-2">
                    <li><strong>Other members</strong> — your profile information (photos, bio, preferences) is visible to other registered members according to your privacy settings.</li>
                    <li><strong>Service providers</strong> — Stripe, Firebase/Google, and our hosting infrastructure providers — all under strict data processing agreements (DPAs).</li>
                    <li><strong>Legal authorities</strong> — when required by law, court order, or to protect the safety of our users or the public.</li>
                    <li><strong>Business transfers</strong> — in the event of a merger, acquisition, or asset sale, your data may be transferred to the new entity, with prior notice to you.</li>
                  </ul>
                </section>

                <section id="section-12">
                  <h2 className="text-lg font-bold text-[#1B223D] mb-2">12. Data Retention &amp; Account Deletion</h2>
                  <p>
                    We retain your personal data for as long as your account is active or as needed to provide the Service. When you delete your account:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 mt-2">
                    <li>Your profile is <strong>immediately hidden</strong> from other members.</li>
                    <li>All personal data (name, photos, messages, preferences) is <strong>permanently erased within 30 days</strong>.</li>
                    <li>Transaction records may be retained for up to <strong>7 years</strong> as required by financial regulations.</li>
                    <li>Anonymised, aggregated usage statistics may be retained indefinitely.</li>
                  </ul>
                  <p className="mt-3">
                    You can request account deletion at any time directly in the app (Settings → Account → Delete Account) or by following the instructions on our{' '}
                    <Link href="/delete-account" className="text-[#8949f2] hover:underline">Delete Account page</Link>.
                  </p>
                </section>

                <section id="section-13">
                  <h2 className="text-lg font-bold text-[#1B223D] mb-2">13. Your Rights</h2>
                  <p>Under the GDPR and UK data protection law, you have the right to:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li><strong>Access</strong> a copy of your personal data.</li>
                    <li><strong>Rectify</strong> inaccurate or incomplete data.</li>
                    <li><strong>Erase</strong> your data ("right to be forgotten").</li>
                    <li><strong>Restrict</strong> or <strong>object</strong> to certain processing.</li>
                    <li><strong>Data portability</strong> — receive your data in a machine-readable format.</li>
                    <li><strong>Withdraw consent</strong> at any time (without affecting lawfulness of prior processing).</li>
                  </ul>
                  <p className="mt-2">
                    To exercise any of these rights, email{' '}
                    <a href="mailto:privacy@bibahoGhor.com" className="text-[#8949f2] hover:underline">privacy@bibahoGhor.com</a> or use the in-app Settings. We will respond within 30 days.
                  </p>
                </section>

                <section id="section-14">
                  <h2 className="text-lg font-bold text-[#1B223D] mb-2">14. California Residents (CCPA)</h2>
                  <p>
                    If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA):
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li><strong>Right to know</strong> what personal information we collect, use, and share.</li>
                    <li><strong>Right to delete</strong> your personal information.</li>
                    <li><strong>Right to opt out of sale</strong> — we do <strong>not</strong> sell personal information.</li>
                    <li><strong>Right to non-discrimination</strong> — we will not discriminate against you for exercising these rights.</li>
                  </ul>
                  <p className="mt-2">
                    To submit a CCPA request, contact us at{' '}
                    <a href="mailto:privacy@bibahoGhor.com" className="text-[#8949f2] hover:underline">privacy@bibahoGhor.com</a>.
                  </p>
                </section>

                <section id="section-15">
                  <h2 className="text-lg font-bold text-[#1B223D] mb-2">15. App Tracking Transparency (iOS)</h2>
                  <p>
                    We do <strong>not</strong> use Apple&apos;s Advertising Identifier (IDFA) and we do <strong>not</strong> track you across third-party apps or websites for advertising purposes. Therefore, the Matrimony app does not present an App Tracking Transparency (ATT) prompt.
                  </p>
                  <p className="mt-2">
                    Analytics data collected via Firebase is anonymised and used solely to improve the app experience.
                  </p>
                </section>

                <section id="section-16">
                  <h2 className="text-lg font-bold text-[#1B223D] mb-2">16. Cookies (Web)</h2>
                  <p>
                    On our website (bibahoGhor.com), we use essential cookies to keep the platform secure and functional. Optional analytics and marketing cookies require your consent, which you can manage at any time via the cookie banner or your browser settings.
                  </p>
                  <p className="mt-2">The Matrimony <strong>mobile app</strong> does not use browser cookies.</p>
                </section>

                <section id="section-17">
                  <h2 className="text-lg font-bold text-[#1B223D] mb-2">17. Security</h2>
                  <p>
                    We use industry-standard security practices to protect your data:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>TLS encryption for all data in transit.</li>
                    <li>AES-256 encryption for sensitive data at rest.</li>
                    <li>Firebase security rules for real-time data.</li>
                    <li>Regular security audits and penetration testing.</li>
                  </ul>
                  <p className="mt-2">
                    However, no system is completely infallible. We encourage you to use a strong, unique password and to report any security concerns to{' '}
                    <a href="mailto:privacy@bibahoGhor.com" className="text-[#8949f2] hover:underline">privacy@bibahoGhor.com</a>.
                  </p>
                </section>

                <section id="section-18">
                  <h2 className="text-lg font-bold text-[#1B223D] mb-2">18. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of significant changes via email or an in-app notice at least <strong>14 days</strong> before they take effect. The "Last updated" date at the top of this page will always reflect the most recent version.
                  </p>
                </section>

                <section id="section-19">
                  <h2 className="text-lg font-bold text-[#1B223D] mb-2">19. Contact &amp; Complaints</h2>
                  <p>
                    For privacy enquiries or to exercise your data rights, contact our Data Protection Officer:
                  </p>
                  <p className="mt-2">
                    <strong>Email:</strong>{' '}
                    <a href="mailto:privacy@bibahoGhor.com" className="text-[#8949f2] hover:underline">privacy@bibahoGhor.com</a><br />
                    <strong>Company:</strong> Era Tech Ltd
                  </p>
                  <p className="mt-2">
                    If you are unhappy with how we handle your data, you have the right to lodge a complaint with your national supervisory authority — for example, the <strong>ICO</strong> (ico.org.uk) in the UK, or the relevant EU data protection authority in your country of residence.
                  </p>
                </section>

              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4 text-sm">
                <Link href="/terms" className="text-[#8949f2] hover:underline font-medium">Terms &amp; Conditions →</Link>
                <Link href="/delete-account" className="text-[#8949f2] hover:underline font-medium">Delete My Account →</Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
