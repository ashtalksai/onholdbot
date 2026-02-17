"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Clock,
  CheckCircle,
  Play,
  Pause,
  ArrowRight,
  Mic,
  MicOff,
} from "lucide-react";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <Pause className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl">OnHoldBot</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">
              How it Works
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition">
              Pricing
            </Link>
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition">
              Login
            </Link>
          </nav>
          <Link href="/signup">
            <Button>Start Free</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-6xl md:text-8xl font-bold text-violet-600 mb-4">
            47 minutes.
          </p>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2">
            That&apos;s how long Comcast kept us waiting yesterday.
          </p>
          <p className="text-xl md:text-2xl font-medium mb-8">
            We took the call. You didn&apos;t have to.
          </p>

          {/* Email signup */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Link href={`/signup?email=${encodeURIComponent(email)}`}>
              <Button className="w-full sm:w-auto gap-2">
                Start Free — 3 calls <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Value props */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              AI navigates the menu
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              You stay on the line (muted)
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Unmuted when human picks up
            </span>
          </div>
        </div>

        {/* Call bridge visualization */}
        <div className="mt-16 max-w-lg mx-auto">
          <Card className="p-6 bg-slate-50 border-2">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center mx-auto mb-2">
                  <MicOff className="w-6 h-6 text-slate-600" />
                </div>
                <p className="text-sm font-medium">YOU</p>
                <Badge variant="secondary" className="text-xs">muted</Badge>
              </div>
              
              <div className="flex-1 mx-4 h-1 bg-violet-200 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-violet-600 connection-active opacity-50" />
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center mx-auto mb-2 relative">
                  <Phone className="w-6 h-6 text-white" />
                  <div className="absolute inset-0 rounded-full bg-violet-600 pulse-ring" />
                </div>
                <p className="text-sm font-medium">BOT</p>
                <Badge className="bg-violet-600 text-xs">active</Badge>
              </div>

              <div className="flex-1 mx-4 h-1 bg-amber-200 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 connection-active opacity-50" />
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium">COMPANY</p>
                <Badge variant="outline" className="text-xs border-amber-500 text-amber-600">on hold</Badge>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              You&apos;re already on the call — just muted. We unmute you the moment a human picks up.
            </p>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-violet-600">①</span>
              </div>
              <h3 className="font-semibold mb-2">Enter company number</h3>
              <p className="text-sm text-muted-foreground">
                We dial a 3-way call — you, our bot, and the company. You&apos;re connected but muted.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-violet-600">②</span>
              </div>
              <h3 className="font-semibold mb-2">Put your phone down</h3>
              <p className="text-sm text-muted-foreground">
                AI navigates the phone menu and waits on hold. You get a notification the moment a human picks up.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-violet-600">③</span>
              </div>
              <h3 className="font-semibold mb-2">Human picks up?</h3>
              <p className="text-sm text-muted-foreground">
                You&apos;re instantly unmuted and live with the agent — no redialing, no re-explaining.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="gap-2">
              <Play className="w-4 h-4" />
              Watch demo (60s)
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Simple pricing</h2>
          <p className="text-center text-muted-foreground mb-12">
            Start free. Upgrade when you need more.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6">
              <h3 className="font-bold text-lg">Free</h3>
              <p className="text-3xl font-bold mt-2">$0</p>
              <p className="text-sm text-muted-foreground mb-4">forever</p>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  3 calls per month
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Push + SMS alerts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Save 5 paths
                </li>
              </ul>
              <Link href="/signup">
                <Button variant="outline" className="w-full">Get Started</Button>
              </Link>
            </Card>

            <Card className="p-6 border-violet-600 border-2 relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600">
                Most Popular
              </Badge>
              <h3 className="font-bold text-lg">Basic</h3>
              <p className="text-3xl font-bold mt-2">$19.99</p>
              <p className="text-sm text-muted-foreground mb-4">per month</p>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Unlimited calls
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Push + SMS + Email
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Save 50 paths
                </li>
              </ul>
              <Link href="/signup?plan=basic">
                <Button className="w-full">Start Free Trial</Button>
              </Link>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg">Pro</h3>
              <p className="text-3xl font-bold mt-2">$29.99</p>
              <p className="text-sm text-muted-foreground mb-4">per month</p>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Everything in Basic
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Transcripts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Community paths
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Slack/Discord webhooks
                </li>
              </ul>
              <Link href="/signup?plan=pro">
                <Button variant="outline" className="w-full">Start Free Trial</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-violet-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Never wait on hold again.
          </h2>
          <p className="text-violet-100 mb-8 max-w-lg mx-auto">
            Join thousands of professionals who&apos;ve reclaimed their time.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="gap-2">
              Start Free — 3 calls <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-violet-600 rounded flex items-center justify-center">
              <Pause className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold">OnHoldBot</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition">Terms</Link>
            <Link href="/contact" className="hover:text-foreground transition">Contact</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} OnHoldBot
          </p>
        </div>
      </footer>
    </div>
  );
}
