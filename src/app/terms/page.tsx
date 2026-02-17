import Link from "next/link";
import { ArrowLeft, Pause } from "lucide-react";

export default function TermsPage() {
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
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: February 2026</p>

        <h2>1. Service Description</h2>
        <p>OnHoldBot provides an AI-powered service that places calls on your behalf and waits on hold until a human agent is available.</p>

        <h2>2. Acceptable Use</h2>
        <p>You agree to use OnHoldBot only for lawful purposes. You may not use the service to harass, spam, or engage in any illegal activity.</p>

        <h2>3. Billing</h2>
        <p>Free accounts are limited to 3 calls per month. Paid plans are billed monthly. You may cancel at any time.</p>

        <h2>4. Privacy</h2>
        <p>We do not record or store the content of your calls. See our Privacy Policy for details on data handling.</p>

        <h2>5. Limitation of Liability</h2>
        <p>OnHoldBot is provided &quot;as is&quot; without warranty. We are not liable for missed calls, disconnections, or any damages arising from use of the service.</p>

        <h2>6. Changes</h2>
        <p>We may update these terms at any time. Continued use constitutes acceptance of the new terms.</p>

        <h2>Contact</h2>
        <p>Questions? Email us at support@onholdbot.com</p>
      </main>
    </div>
  );
}
