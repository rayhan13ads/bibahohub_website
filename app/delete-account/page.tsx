import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete My Account — Bibaho Hub',
  description: 'Learn how to permanently delete your Bibaho Hub account and all associated data.',
};

export default function DeleteAccountPage() {
  return (
    <main className="min-h-screen bg-white text-[#1B223D] flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-8 py-20">
        <div className="mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold uppercase tracking-wider mb-4">
            Account
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1B223D] mb-3">How to Delete Your Account</h1>
          <p className="text-sm text-gray-500">This action is permanent and cannot be undone.</p>
        </div>

        {/* Warning card */}
        <div className="mb-10 p-5 rounded-2xl bg-red-50 border border-red-100">
          <h2 className="text-base font-bold text-red-700 mb-2">⚠️ Before you delete your account</h2>
          <ul className="text-sm text-red-600 space-y-1 list-disc pl-4">
            <li>Your profile, photos, and match history will be permanently removed.</li>
            <li>Any active subscription will not be automatically refunded.</li>
            <li>You will lose access to all messages and connections.</li>
            <li>This action cannot be reversed.</li>
          </ul>
        </div>

        <div className="space-y-10 text-[15px] leading-relaxed text-gray-700">

          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-4">Option 1 — Delete via the App (Recommended)</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Open the <strong>Bibaho Hub</strong> app on your phone.</li>
              <li>Tap your <strong>profile photo</strong> in the top-right corner to go to your profile.</li>
              <li>Tap <strong>Settings</strong> (gear icon).</li>
              <li>Scroll down and tap <strong>Account</strong>.</li>
              <li>Tap <strong>Delete Account</strong>.</li>
              <li>Read the confirmation message, then tap <strong>Delete Permanently</strong>.</li>
              <li>Enter your password to confirm, then tap <strong>Confirm Delete</strong>.</li>
            </ol>
            <p className="mt-4 text-sm text-gray-500">
              Your account and all associated data will be deleted within <strong>30 days</strong>. During this period your profile will be hidden from other members.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-4">Option 2 — Request Deletion by Email</h2>
            <p>If you cannot access the app, you can request account deletion by emailing us:</p>
            <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-200 text-sm space-y-1">
              <p><strong>To:</strong> <a href="mailto:support@bibahoGhor.com" className="text-[#8949f2] hover:underline">support@bibahoGhor.com</a></p>
              <p><strong>Subject:</strong> Account Deletion Request</p>
              <p><strong>Include:</strong></p>
              <ul className="list-disc pl-4 mt-1 space-y-1 text-gray-600">
                <li>Your full name</li>
                <li>The email address linked to your account</li>
                <li>Your registered phone number (if available)</li>
                <li>A brief note confirming you want permanent deletion</li>
              </ul>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              We will process your request within <strong>14 business days</strong> and send a confirmation email once your account has been deleted.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-2">What Happens After Deletion</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Your profile is immediately hidden from other members.</li>
              <li>All personal data (name, photos, messages, preferences) is permanently erased within 30 days.</li>
              <li>Transaction records may be retained for up to 7 years as required by financial regulations.</li>
              <li>Aggregated, anonymised usage statistics may be retained indefinitely.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-2">Changed Your Mind?</h2>
            <p>
              If you submitted a deletion request and change your mind, you have a <strong>7-day grace period</strong> to cancel it. Contact us at <a href="mailto:support@bibahoGhor.com" className="text-[#8949f2] hover:underline">support@bibahoGhor.com</a> as soon as possible to cancel the deletion before it is processed.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1B223D] mb-2">Need Help?</h2>
            <p>
              If you have any questions or run into any issues, our support team is here to help. Email <a href="mailto:support@bibahoGhor.com" className="text-[#8949f2] hover:underline">support@bibahoGhor.com</a> and we'll get back to you within 24 hours.
            </p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4 text-sm">
          <Link href="/privacy-policy" className="text-[#8949f2] hover:underline font-medium">Privacy Policy →</Link>
          <Link href="/terms" className="text-[#8949f2] hover:underline font-medium">Terms &amp; Conditions →</Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
