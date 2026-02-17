import Link from "next/link";
import { ArrowLeft, Pause } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-violet-600 rounded flex items-center justify-center">
              <Pause className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold">OnHoldBot</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl prose">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: February 2026</p>

        <h2>Information We Collect</h2>
        <p>We collect your email address, phone number (for SMS alerts), and call metadata (company name, duration, IVR path taken).</p>

        <h2>Call Recording</h2>
        <p><strong>We do not record or store the audio content of your calls.</strong> Only metadata about the call is retained.</p>

        <h2>How We Use Your Data</h2>
        <ul>
          <li>To provide the OnHoldBot service</li>
          <li>To send you alerts when a human picks up</li>
          <li>To improve phone tree navigation accuracy</li>
          <li>To process payments</li>
        </ul>

        <h2>Data Sharing</h2>
        <p>We do not sell your personal data. We share data only with service providers necessary to operate OnHoldBot (Twilio for calls, Stripe for payments).</p>

        <h2>Data Retention</h2>
        <p>Call history is retained for 90 days. You may request deletion of your account and data at any time.</p>

        <h2>Security</h2>
        <p>We use industry-standard encryption to protect your data in transit and at rest.</p>

        <h2>Contact</h2>
        <p>Privacy questions? Email privacy@onholdbot.com</p>
      </main>
    </div>
  );
}
