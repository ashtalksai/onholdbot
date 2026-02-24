"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Phone,
  Clock,
  CheckCircle,
  ArrowRight,
  MicOff,
  Bot,
  Bell,
  Save,
  BarChart3,
  Link2,
  FileText,
  Users,
  Menu,
  X,
  Star,
  Zap,
  Shield,
  Building2,
} from "lucide-react";

// Animated Timer Component
function AnimatedTimer() {
  const [seconds, setSeconds] = useState(0);
  const [showSaved, setShowSaved] = useState(false);
  const maxSeconds = 47 * 60; // 47 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev >= maxSeconds) {
          setShowSaved(true);
          setTimeout(() => {
            setShowSaved(false);
            setSeconds(0);
          }, 4000);
          return prev;
        }
        return prev + 7; // Speed up for demo
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="font-mono text-6xl md:text-8xl lg:text-9xl font-bold timer-glow text-[var(--accent)]">
      <AnimatePresence mode="wait">
        {showSaved ? (
          <motion.div
            key="saved"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-3xl md:text-5xl text-[var(--success)]"
          >
            4.2M minutes saved
          </motion.div>
        ) : (
          <motion.span
            key="timer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {formatTime(seconds)}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// Testimonial data
const testimonials = [
  { text: "Saved me 3 hours last week alone!", author: "Sarah M.", rating: 5 },
  { text: "Finally, someone solved hold time.", author: "James K.", rating: 5 },
  { text: "Worth every penny. Life-changing.", author: "Emily R.", rating: 5 },
  { text: "I got my lunch breaks back!", author: "Michael T.", rating: 5 },
  { text: "Best productivity tool of 2024.", author: "Lisa P.", rating: 5 },
];

// Feature data
const features = [
  { icon: Bot, title: "AI Menu Navigation", description: "Smart bot navigates phone trees automatically" },
  { icon: MicOff, title: "Smart Mute/Unmute", description: "You're muted until a human picks up" },
  { icon: Bell, title: "Multi-Channel Alerts", description: "Push, SMS, email — however you want it" },
  { icon: Save, title: "Save Call Paths", description: "Remember successful paths for next time" },
  { icon: BarChart3, title: "Wait Time Analytics", description: "Track time saved and call history" },
  { icon: Link2, title: "Slack/Discord Webhooks", description: "Get alerts in your workspace", pro: true },
  { icon: FileText, title: "Call Transcripts", description: "Full transcripts of every call", pro: true },
  { icon: Users, title: "Community Paths", description: "Shared paths from other users", pro: true },
];

// FAQ data
const faqs = [
  {
    question: "How does the 3-way call work?",
    answer: "We initiate a 3-way call where you, our AI bot, and the company are all connected. You're instantly muted while our bot handles the phone menu and wait time. The moment a human agent picks up, you're unmuted and can talk directly — no transfer, no redialing."
  },
  {
    question: "Can I use this with any company?",
    answer: "Yes! OnHoldBot works with any phone number. Our AI is trained to navigate a wide variety of phone menus and can adapt to new systems on the fly."
  },
  {
    question: "What if the bot can't navigate the menu?",
    answer: "If our bot encounters a menu it can't navigate, it will alert you immediately so you can take over. This rarely happens, but we've got you covered."
  },
  {
    question: "Is my call data private and secure?",
    answer: "Absolutely. We use end-to-end encryption and don't store call audio. Your privacy is our top priority, and we're fully GDPR and CCPA compliant."
  },
  {
    question: "Do I need to install an app?",
    answer: "Nope! OnHoldBot works right from your browser. We also have mobile apps for iOS and Android if you prefer, but they're optional."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, cancel anytime with no fees. We believe in earning your business every month."
  },
  {
    question: "What's the average time saved per call?",
    answer: "Our users save an average of 23 minutes per call. That's almost 4 hours saved per month for the average user."
  },
  {
    question: "Do you support international numbers?",
    answer: "Currently we support US, Canada, and UK phone numbers. We're expanding to more countries soon!"
  },
];

// Mobile nav component
function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[var(--surface)] border-b border-[var(--border)] p-4"
          >
            <nav className="flex flex-col gap-4">
              <Link href="#how-it-works" onClick={() => setIsOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">How it Works</Link>
              <Link href="#features" onClick={() => setIsOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Features</Link>
              <Link href="#pricing" onClick={() => setIsOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Pricing</Link>
              <Link href="#faq" onClick={() => setIsOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">FAQ</Link>
              <Link href="/login" onClick={() => setIsOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Login</Link>
              <Link href="/signup">
                <Button className="w-full btn-primary">Start Free</Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Section wrapper with scroll animation
function AnimatedSection({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] relative overflow-hidden">
      {/* Background pattern */}
      <div className="fixed inset-0 bg-pattern pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[var(--accent)] rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-[var(--accent-foreground)]" />
            </div>
            <span className="font-bold text-xl font-[family-name:var(--font-space-grotesk)]">OnHoldBot</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
              How it Works
            </Link>
            <Link href="#features" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
              Pricing
            </Link>
            <Link href="#faq" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
              FAQ
            </Link>
            <Link href="/login" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
              Login
            </Link>
          </nav>
          <div className="hidden md:block">
            <Link href="/signup">
              <Button className="btn-primary px-6">Start Free Trial</Button>
            </Link>
          </div>
          <MobileNav />
        </div>
      </header>

      {/* 1. Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Badge variant="outline" className="mb-6 px-4 py-2 text-[var(--accent)] border-[var(--accent)]/30 bg-[var(--accent)]/10">
                🎯 No more hold music
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <AnimatedTimer />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-[var(--text-secondary)] mb-4"
            >
              That&apos;s how long Comcast kept us waiting yesterday.
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]"
            >
              We Take the Hold.{" "}
              <span className="gradient-text">You Take the Call.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto"
            >
              AI navigates phone menus while you stay muted. Get unmuted instantly when a human picks up.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
            >
              <Link href="/signup">
                <Button size="lg" className="btn-primary text-lg px-8 py-6 w-full sm:w-auto">
                  Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]">
                  See How It Works
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-sm text-[var(--text-muted)]"
            >
              No credit card required • 3 free calls/month
            </motion.p>
          </div>

          {/* Hero Visual - 3-way diagram */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <Card className="p-8 bg-[var(--surface)] border-[var(--border)]">
              <div className="flex items-center justify-between gap-4">
                {/* YOU */}
                <div className="text-center flex-1">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--surface-hover)] flex items-center justify-center mx-auto mb-3 border-2 border-[var(--border)]">
                    <MicOff className="w-8 h-8 text-[var(--text-muted)]" />
                  </div>
                  <p className="font-semibold text-sm md:text-base">YOU</p>
                  <Badge variant="secondary" className="text-xs bg-[var(--surface-hover)] text-[var(--text-muted)]">
                    muted
                  </Badge>
                </div>

                {/* Connection line 1 */}
                <div className="flex-1 h-1 bg-[var(--border)] rounded relative overflow-hidden hidden sm:block">
                  <div className="absolute inset-0 connection-flow opacity-50" />
                </div>

                {/* BOT */}
                <div className="text-center flex-1">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--accent)] flex items-center justify-center mx-auto mb-3 relative">
                    <Bot className="w-8 h-8 text-[var(--accent-foreground)]" />
                    <div className="absolute inset-0 rounded-full bg-[var(--accent)] pulse-ring" />
                  </div>
                  <p className="font-semibold text-sm md:text-base">BOT</p>
                  <Badge className="text-xs bg-[var(--accent)] text-[var(--accent-foreground)]">
                    active
                  </Badge>
                </div>

                {/* Connection line 2 */}
                <div className="flex-1 h-1 bg-[var(--border)] rounded relative overflow-hidden hidden sm:block">
                  <div className="absolute inset-0 connection-flow opacity-50" />
                </div>

                {/* COMPANY */}
                <div className="text-center flex-1">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--surface-hover)] flex items-center justify-center mx-auto mb-3 border-2 border-amber-500/30">
                    <Clock className="w-8 h-8 text-amber-500" />
                  </div>
                  <p className="font-semibold text-sm md:text-base">COMPANY</p>
                  <Badge variant="outline" className="text-xs border-amber-500/50 text-amber-500">
                    on hold
                  </Badge>
                </div>
              </div>
              <p className="text-center text-sm text-[var(--text-muted)] mt-6">
                You&apos;re already on the call — just muted. We unmute you the moment a human picks up.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* 2. Social Proof Strip */}
      <section className="py-8 border-y border-[var(--border)] bg-[var(--surface)]/50 overflow-hidden">
        <div className="flex animate-marquee">
          {[...testimonials, ...testimonials].map((testimonial, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-8 whitespace-nowrap"
            >
              <div className="flex">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />
                ))}
              </div>
              <span className="text-[var(--text-primary)]">&quot;{testimonial.text}&quot;</span>
              <span className="text-[var(--text-muted)]">— {testimonial.author}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Problem Statement */}
      <AnimatedSection className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <Card className="p-8 bg-[var(--surface)] border-[var(--border)] text-center">
              <p className="text-6xl md:text-7xl font-bold font-mono text-[var(--accent)] mb-4">47</p>
              <p className="text-2xl font-semibold mb-2">Minutes Average Hold Time</p>
              <p className="text-[var(--text-secondary)]">
                That&apos;s the average time Americans spend on hold per call. Time you&apos;ll never get back.
              </p>
            </Card>
            <Card className="p-8 bg-[var(--surface)] border-[var(--border)] text-center">
              <p className="text-6xl md:text-7xl font-bold font-mono text-[var(--accent)] mb-4">$900M</p>
              <p className="text-2xl font-semibold mb-2">Lost Productivity</p>
              <p className="text-[var(--text-secondary)]">
                Americans waste 900 million hours on hold every year. That&apos;s real money.
              </p>
            </Card>
          </div>
          <div className="text-center mt-12">
            <p className="text-xl text-[var(--text-secondary)]">
              You have better things to do than listen to hold music.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* 4. Solution Visual */}
      <AnimatedSection className="py-16 md:py-24 bg-[var(--surface)]/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
              The Smart Way to Handle Hold Time
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              You&apos;re connected but muted. Our AI handles the wait. The moment a human picks up — you&apos;re live.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Image
              src="/solution-flow.png"
              alt="OnHoldBot Solution Flow"
              width={1200}
              height={600}
              className="rounded-2xl border border-[var(--border)]"
            />
            {/* Overlay animation indicator */}
            <motion.div
              className="absolute bottom-4 right-4 bg-[var(--success)] text-white px-4 py-2 rounded-full flex items-center gap-2"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">HUMAN DETECTED → YOU UNMUTED</span>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* 5. How It Works */}
      <AnimatedSection id="how-it-works" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
              How It Works
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Three simple steps to reclaim your time
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 relative"
          >
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />

            {[
              {
                step: "①",
                title: "Enter the Number",
                description: "We dial a 3-way call — you, our bot, and the company. You're connected but muted from the start."
              },
              {
                step: "②",
                title: "We Wait, You Don't",
                description: "AI navigates the phone menu and waits on hold. Go about your day — work, eat, whatever."
              },
              {
                step: "③",
                title: "Instant Unmute",
                description: "Human picks up? You're unmuted instantly and live with the agent. No redialing, no re-explaining."
              }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center relative z-10">
                <div className="w-20 h-20 rounded-full bg-[var(--surface)] border-2 border-[var(--accent)] flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-[var(--accent)] font-[family-name:var(--font-space-grotesk)]">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-[var(--text-secondary)]">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* 6. Features Grid */}
      <AnimatedSection id="features" className="py-16 md:py-24 bg-[var(--surface)]/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
              Everything You Need
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Powerful features to save you time and frustration
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="p-6 h-full bg-[var(--surface)] border-[var(--border)] feature-card cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-[var(--accent)]" />
                  </div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    {feature.title}
                    {feature.pro && (
                      <Badge variant="outline" className="text-xs border-[var(--accent)]/50 text-[var(--accent)]">
                        Pro
                      </Badge>
                    )}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* 7. Pricing */}
      <AnimatedSection id="pricing" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Start free. Upgrade when you need more.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {/* Free */}
            <motion.div variants={fadeInUp}>
              <Card className="p-8 h-full bg-[var(--surface)] border-[var(--border)] flex flex-col">
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-[var(--text-muted)]">/forever</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {["3 calls per month", "Push + SMS alerts", "Save 5 paths", "Basic support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[var(--success)] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button variant="outline" className="w-full border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]">
                    Get Started
                  </Button>
                </Link>
              </Card>
            </motion.div>

            {/* Basic - Most Popular */}
            <motion.div variants={fadeInUp}>
              <Card className="p-8 h-full bg-[var(--surface)] border-2 border-[var(--accent)] flex flex-col relative pricing-card-popular">
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-[var(--accent-foreground)]">
                  Most Popular
                </Badge>
                <h3 className="text-xl font-bold mb-2">Basic</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$19.99</span>
                  <span className="text-[var(--text-muted)]">/month</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {["Unlimited calls", "Push + SMS + Email alerts", "Save 50 paths", "Priority support", "Wait time analytics"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[var(--success)] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/signup?plan=basic">
                  <Button className="w-full btn-primary">
                    Start Free Trial
                  </Button>
                </Link>
              </Card>
            </motion.div>

            {/* Pro */}
            <motion.div variants={fadeInUp}>
              <Card className="p-8 h-full bg-[var(--surface)] border-[var(--border)] flex flex-col">
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$29.99</span>
                  <span className="text-[var(--text-muted)]">/month</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Everything in Basic",
                    "Call transcripts",
                    "Community paths",
                    "Slack/Discord webhooks",
                    "Unlimited saved paths",
                    "API access"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[var(--success)] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/signup?plan=pro">
                  <Button variant="outline" className="w-full border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]">
                    Start Free Trial
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </motion.div>

          <p className="text-center text-sm text-[var(--text-muted)] mt-8">
            All plans include a 7-day free trial. Cancel anytime.
          </p>
        </div>
      </AnimatedSection>

      {/* 8. FAQ */}
      <AnimatedSection id="faq" className="py-16 md:py-24 bg-[var(--surface)]/30">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Everything you need to know about OnHoldBot
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 text-[var(--text-primary)] hover:text-[var(--accent)]" data-accordion-trigger>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[var(--text-secondary)] pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </AnimatedSection>

      {/* 9. Final CTA */}
      <AnimatedSection className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="inline-flex items-center gap-2 bg-[var(--success)]/10 text-[var(--success)] px-4 py-2 rounded-full mb-8"
          >
            <Zap className="w-4 h-4" />
            <span className="font-mono font-semibold">4.2M minutes saved this month</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
            Never Wait On Hold Again.
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who&apos;ve reclaimed their time. Start your free trial today.
          </p>
          <Link href="/signup">
            <Button size="lg" className="btn-primary text-lg px-10 py-7">
              Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="text-sm text-[var(--text-muted)] mt-6">
            No credit card required • Cancel anytime
          </p>
        </div>
      </AnimatedSection>

      {/* 10. Footer */}
      <footer className="py-16 border-t border-[var(--border)] bg-[var(--surface)]/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Logo & Info */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[var(--accent-foreground)]" />
                </div>
                <span className="font-bold text-lg font-[family-name:var(--font-space-grotesk)]">OnHoldBot</span>
              </div>
              <p className="text-sm text-[var(--text-muted)]">
                AI-powered hold time elimination. Never wait on hold again.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition">Features</Link></li>
                <li><Link href="#pricing" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition">Pricing</Link></li>
                <li><Link href="#how-it-works" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition">How It Works</Link></li>
                <li><Link href="#faq" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition">FAQ</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition">About</Link></li>
                <li><Link href="/blog" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition">Blog</Link></li>
                <li><Link href="/contact" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition">Contact</Link></li>
                <li><Link href="/careers" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition">Careers</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[var(--border)] gap-4">
            <p className="text-sm text-[var(--text-muted)]">
              © {new Date().getFullYear()} OnHoldBot. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Shield className="w-4 h-4" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Building2 className="w-4 h-4" />
                <span>GDPR Ready</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
