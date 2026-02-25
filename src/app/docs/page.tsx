'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const sections = [
  { id: 'research', label: 'Research', icon: '📊' },
  { id: 'gtm', label: 'GTM Plan', icon: '🎯' },
  { id: 'marketing', label: 'Marketing', icon: '📣' },
  { id: 'brand', label: 'Brand Spec', icon: '🎨' },
  { id: 'assets', label: 'Assets', icon: '📦' },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('research');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPos = window.scrollY + 150;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#1e293b] text-white z-50 px-4 py-3 flex justify-between items-center border-b border-[#334155]">
        <span className="font-display text-lg">OnHold Bot Docs</span>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#0f172a]/95 z-40 pt-16">
          <nav className="p-4 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                  activeSection === section.id
                    ? 'bg-amber-500 text-slate-900'
                    : 'text-slate-300 hover:bg-[#334155]'
                }`}
              >
                <span>{section.icon}</span>
                <span className="font-medium">{section.label}</span>
              </button>
            ))}
            <div className="border-t border-[#334155] pt-4 mt-4">
              <Link href="/" className="block px-4 py-3 text-amber-500 hover:text-amber-400">
                ← Back to Site
              </Link>
              <Link href="/pitch" className="block px-4 py-3 text-emerald-500 hover:text-emerald-400">
                View Pitch Deck →
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-[#1e293b] text-white border-r border-[#334155]">
        <div className="p-6 border-b border-[#334155]">
          <h1 className="font-display text-xl text-white">OnHold Bot</h1>
          <p className="text-slate-400 text-sm mt-1">Documentation</p>
        </div>
        <nav className="p-4 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                activeSection === section.id
                  ? 'bg-amber-500 text-slate-900'
                  : 'text-slate-300 hover:bg-[#334155]'
              }`}
            >
              <span>{section.icon}</span>
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#334155]">
          <Link href="/" className="block px-4 py-2 text-amber-500 hover:text-amber-400 text-sm">
            ← Back to Site
          </Link>
          <Link href="/pitch" className="block px-4 py-2 text-emerald-500 hover:text-emerald-400 text-sm">
            View Pitch Deck →
          </Link>
          <a href="https://github.com/ashtalksai/onholdbot" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-slate-400 hover:text-slate-300 text-sm">
            GitHub →
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="max-w-5xl mx-auto px-6 py-12">
          
          {/* RESEARCH SECTION */}
          <section id="research" className="mb-24 scroll-mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Card */}
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 mb-8 text-slate-900">
                <span className="text-amber-900/70 font-mono text-sm uppercase tracking-wider">Research Document</span>
                <h2 className="font-display text-4xl mt-2 mb-4">Market Validation</h2>
                <p className="text-amber-900/80 text-lg max-w-2xl">
                  AI service that sits on hold for customer service calls. Forward a number → AI navigates phone tree → notifies you when human picks up.
                </p>
              </div>

              {/* Metrics Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155]">
                  <span className="text-slate-500 font-mono text-sm">OPPORTUNITY SCORE</span>
                  <div className="text-4xl font-display font-bold text-amber-500 mt-2">9/10</div>
                  <div className="text-slate-400 text-sm mt-1">Exceptional opportunity</div>
                </div>
                <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155]">
                  <span className="text-slate-500 font-mono text-sm">PAIN SEVERITY</span>
                  <div className="text-4xl font-display font-bold text-amber-500 mt-2">9/10</div>
                  <div className="text-slate-400 text-sm mt-1">Severe user pain</div>
                </div>
                <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155]">
                  <span className="text-slate-500 font-mono text-sm">KEYWORD GROWTH</span>
                  <div className="text-4xl font-display font-bold text-amber-500 mt-2">+5,043%</div>
                  <div className="text-slate-400 text-sm mt-1">"AI call assistant" YoY</div>
                </div>
              </div>

              {/* Problem & Market */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155]">
                  <h3 className="font-display text-xl mb-4 text-white">🔥 The Pain Point</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>Average American spends <strong className="text-white">10 hours/year</strong> on hold</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>Professionals lose <strong className="text-white">billable time</strong> to support calls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>Everyone wastes <strong className="text-white">lunch breaks</strong> navigating phone trees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>No way to <strong className="text-white">multitask</strong> while on hold</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-amber-500/10 rounded-xl p-6 border border-amber-500/30">
                  <h3 className="font-display text-xl mb-4 text-white">🎯 Target Users</h3>
                  <p className="text-slate-300 mb-4">
                    Busy professionals and tech-savvy individuals who value their time:
                  </p>
                  <ul className="space-y-2 text-slate-300">
                    <li>✓ Freelancers & consultants billing by the hour</li>
                    <li>✓ Insurance brokers dealing with carriers</li>
                    <li>✓ Small business owners managing vendors</li>
                    <li>✓ Anyone who's ever lost 45 min to Comcast</li>
                  </ul>
                </div>
              </div>

              {/* Market Size */}
              <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155] mb-8">
                <h3 className="font-display text-xl mb-4 text-white">📈 Market Size</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-[#0f172a] rounded-lg">
                    <div className="text-2xl font-display font-bold text-amber-500">$3.35B</div>
                    <div className="text-slate-400 text-sm mt-1">AI Assistant Market (2025)</div>
                  </div>
                  <div className="text-center p-4 bg-[#0f172a] rounded-lg">
                    <div className="text-2xl font-display font-bold text-amber-500">$21.11B</div>
                    <div className="text-slate-400 text-sm mt-1">Projected (2030)</div>
                  </div>
                  <div className="text-center p-4 bg-[#0f172a] rounded-lg">
                    <div className="text-2xl font-display font-bold text-emerald-500">44.5%</div>
                    <div className="text-slate-400 text-sm mt-1">Annual Growth (CAGR)</div>
                  </div>
                  <div className="text-center p-4 bg-[#0f172a] rounded-lg">
                    <div className="text-2xl font-display font-bold text-emerald-500">8B</div>
                    <div className="text-slate-400 text-sm mt-1">Voice Devices by 2026</div>
                  </div>
                </div>
              </div>

              {/* Keyword Data */}
              <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155] mb-8">
                <h3 className="font-display text-xl mb-4 text-white">🔍 SEO/SEM Keywords</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#334155]">
                        <th className="text-left py-3 px-2 font-medium text-white">Keyword</th>
                        <th className="text-right py-3 px-2 font-medium text-white">Volume</th>
                        <th className="text-right py-3 px-2 font-medium text-white">Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#334155]/50">
                        <td className="py-3 px-2 text-slate-300">conversational ai assistant</td>
                        <td className="py-3 px-2 text-right font-mono text-amber-500">368,000</td>
                        <td className="py-3 px-2 text-right font-mono text-emerald-500">+1,226,567%</td>
                      </tr>
                      <tr className="border-b border-[#334155]/50">
                        <td className="py-3 px-2 text-slate-300">ai assistant for windows</td>
                        <td className="py-3 px-2 text-right font-mono text-amber-500">33,100</td>
                        <td className="py-3 px-2 text-right font-mono text-emerald-500">+165,400%</td>
                      </tr>
                      <tr className="border-b border-[#334155]/50">
                        <td className="py-3 px-2 text-slate-300">ai call assistant</td>
                        <td className="py-3 px-2 text-right font-mono text-amber-500">3,600</td>
                        <td className="py-3 px-2 text-right font-mono text-emerald-500">+5,043%</td>
                      </tr>
                      <tr className="border-b border-[#334155]/50">
                        <td className="py-3 px-2 text-slate-300">ai phone assistant</td>
                        <td className="py-3 px-2 text-right font-mono text-amber-500">1,000</td>
                        <td className="py-3 px-2 text-right font-mono text-emerald-500">+4,900%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-2 text-slate-300">google ai voice</td>
                        <td className="py-3 px-2 text-right font-mono text-amber-500">14,800</td>
                        <td className="py-3 px-2 text-right font-mono text-emerald-500">+4,525%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Key Insight */}
              <div className="bg-emerald-500/20 rounded-xl p-6 border border-emerald-500/30">
                <h3 className="font-display text-xl mb-2 text-white">💡 Key Insight</h3>
                <p className="text-slate-300">
                  Google Duplex validates the technology, but <strong className="text-white">no dominant "hold-skipper" solution exists</strong>. 
                  The moat is a database of phone tree maps across major companies — no competitor can shortcut this.
                </p>
              </div>
            </motion.div>
          </section>

          {/* GTM SECTION */}
          <section id="gtm" className="mb-24 scroll-mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Card */}
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 mb-8 text-white">
                <span className="text-emerald-100 font-mono text-sm uppercase tracking-wider">Go-to-Market Plan</span>
                <h2 className="font-display text-4xl mt-2 mb-4">Launch Strategy</h2>
                <p className="text-emerald-100 text-lg max-w-2xl">
                  2-4 week MVP → 300 user pilot → 5,000 monthly subscribers by Month 18.
                  Budget: $0-10K. Solo founder + AI tools.
                </p>
              </div>

              {/* Timeline */}
              <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155] mb-8">
                <h3 className="font-display text-xl mb-6 text-white">📅 Execution Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border-l-4 border-amber-500 pl-4">
                    <span className="font-mono text-sm text-slate-500">PHASE 1 (0-6 MO)</span>
                    <div className="font-semibold text-white mt-1">Launch & Validate</div>
                    <ul className="text-sm text-slate-400 mt-2 space-y-1">
                      <li>• Develop basic AI capabilities (2 weeks)</li>
                      <li>• Pilot test with 300 users</li>
                      <li>• Target: consultants, brokers, freelancers</li>
                      <li>• Demo videos on YouTube + LinkedIn</li>
                      <li>• 20K views/mo, 500 leads/mo target</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <span className="font-mono text-sm text-slate-500">PHASE 2 (6-18 MO)</span>
                    <div className="font-semibold text-white mt-1">Scale</div>
                    <ul className="text-sm text-slate-400 mt-2 space-y-1">
                      <li>• 5,000 monthly subscribers milestone</li>
                      <li>• 1M call minutes/month handled</li>
                      <li>• Expand NLP for complex calls</li>
                      <li>• Introduce higher tiers</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-slate-500 pl-4">
                    <span className="font-mono text-sm text-slate-500">SUCCESS METRICS</span>
                    <div className="font-semibold text-white mt-1">KPIs</div>
                    <ul className="text-sm text-slate-400 mt-2 space-y-1">
                      <li>• CAC: $20-30</li>
                      <li>• Churn: &lt;10%</li>
                      <li>• Pilot Conversion: 30%</li>
                      <li>• Demo → Signup: 15-20%</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Channel Strategy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155]">
                  <h3 className="font-display text-xl mb-4 text-white">📢 Distribution Channels</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-[#334155]">
                      <div>
                        <span className="font-medium text-white">YouTube</span>
                        <span className="text-slate-400 text-sm ml-2">Demo videos, tutorials</span>
                      </div>
                      <span className="bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full text-sm font-mono">Primary</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-[#334155]">
                      <div>
                        <span className="font-medium text-white">LinkedIn</span>
                        <span className="text-slate-400 text-sm ml-2">Thought leadership</span>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-500 px-3 py-1 rounded-full text-sm font-mono">Secondary</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-[#334155]">
                      <div>
                        <span className="font-medium text-white">Reddit</span>
                        <span className="text-slate-400 text-sm ml-2">r/Automation, r/CustomerSuccess</span>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-500 px-3 py-1 rounded-full text-sm font-mono">Secondary</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-white">Discord</span>
                        <span className="text-slate-400 text-sm ml-2">"NoHoldClub" community</span>
                      </div>
                      <span className="bg-slate-500/20 text-slate-400 px-3 py-1 rounded-full text-sm font-mono">Community</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155]">
                  <h3 className="font-display text-xl mb-4 text-white">💰 Pricing Strategy</h3>
                  <div className="space-y-4">
                    <div className="bg-[#0f172a] rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white">Lead Magnet</span>
                        <span className="text-2xl font-display font-bold text-slate-400">Free</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">AI Call Handling Demo</p>
                    </div>
                    <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-semibold text-white">Basic</span>
                          <span className="ml-2 bg-amber-500 text-slate-900 text-xs px-2 py-0.5 rounded">FRONTEND</span>
                        </div>
                        <span className="text-2xl font-display font-bold text-amber-500">$19.99/mo</span>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">Standard hold-waiting service</p>
                    </div>
                    <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-semibold text-white">Pro</span>
                          <span className="ml-2 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded">CORE</span>
                        </div>
                        <span className="text-2xl font-display font-bold text-emerald-500">$29.99/mo</span>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">Priority routing + integrations</p>
                    </div>
                    <div className="bg-[#0f172a] rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white">Enterprise</span>
                        <span className="text-2xl font-display font-bold text-slate-300">$5K/yr</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">Licensing for teams</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Channels */}
              <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155]">
                <h3 className="font-display text-xl mb-4 text-white">🌐 Community Signals (GTM Channels)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#0f172a] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">🟠</span>
                      <span className="font-semibold text-white">Reddit (8/10)</span>
                    </div>
                    <div className="text-slate-400 text-sm space-y-1">
                      <div>r/Automation — 71.1K</div>
                      <div>r/CustomerSuccess — 27.1K</div>
                      <div>r/AI_Agents — Growing</div>
                    </div>
                  </div>
                  <div className="bg-[#0f172a] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">🔵</span>
                      <span className="font-semibold text-white">Facebook (7/10)</span>
                    </div>
                    <div className="text-slate-400 text-sm">
                      150K+ members in AI automation groups. Business decision-makers + tech enthusiasts.
                    </div>
                  </div>
                  <div className="bg-[#0f172a] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">🔴</span>
                      <span className="font-semibold text-white">YouTube (7/10)</span>
                    </div>
                    <div className="text-slate-400 text-sm">
                      13 channels. Top: ElevenLabs (6.7M), Ai Convo (3.4M), Salesforce (1.8M)
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* MARKETING SECTION */}
          <section id="marketing" className="mb-24 scroll-mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Card */}
              <div className="bg-gradient-to-br from-[#334155] to-[#1e293b] rounded-2xl p-8 mb-8 text-white border border-[#475569]">
                <span className="text-slate-400 font-mono text-sm uppercase tracking-wider">Marketing Plan</span>
                <h2 className="font-display text-4xl mt-2 mb-4">Launch Channels</h2>
                <p className="text-slate-300 text-lg max-w-2xl">
                  Product Hunt Thursday launch. Reddit value-first posts. Twitter viral thread.
                  Hook: "47 minutes. That's how long the IRS kept me on hold."
                </p>
              </div>

              {/* Channel Strategy Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-amber-500 rounded-xl p-6 text-slate-900">
                  <div className="text-amber-900/70 font-mono text-sm mb-2">CHANNEL 1</div>
                  <div className="font-display text-xl mb-2">Product Hunt</div>
                  <p className="text-amber-900/80 text-sm">
                    Thursday launch (consumer/productivity peak). Maker story leads with emotional pain: "AI waited 47 min on hold for me."
                  </p>
                </div>
                <div className="bg-emerald-500 rounded-xl p-6 text-white">
                  <div className="text-emerald-100 font-mono text-sm mb-2">CHANNEL 2</div>
                  <div className="font-display text-xl mb-2">Reddit</div>
                  <p className="text-emerald-100 text-sm">
                    3 posts: r/lifehacks (human), r/Frugal (savings), r/Automation (technical). Value-first format, no self-promo.
                  </p>
                </div>
                <div className="bg-[#1e293b] rounded-xl p-6 text-white border border-[#334155]">
                  <div className="text-slate-400 font-mono text-sm mb-2">CHANNEL 3</div>
                  <div className="font-display text-xl mb-2">Twitter/X</div>
                  <p className="text-slate-300 text-sm">
                    7-tweet thread. Hook: "47 minutes. That is how long the IRS kept me on hold." Demo GIF critical for virality.
                  </p>
                </div>
              </div>

              {/* Product Hunt Copy */}
              <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155] mb-8">
                <h3 className="font-display text-xl mb-4 text-white">🏆 Product Hunt Launch Copy</h3>
                <div className="space-y-4">
                  <div className="bg-[#0f172a] rounded-lg p-4">
                    <div className="text-amber-500 font-mono text-sm mb-2">TAGLINE (under 60 chars)</div>
                    <div className="text-white text-lg">AI sits on hold for you — notified when a human picks up</div>
                  </div>
                  <div className="bg-[#0f172a] rounded-lg p-4">
                    <div className="text-amber-500 font-mono text-sm mb-2">HOOK</div>
                    <div className="text-slate-300">
                      The average American spends 10 hours per year on hold. If you bill by the hour, that's $500-2,000 handed directly to Comcast, the IRS, and airline hold queues.
                    </div>
                  </div>
                  <div className="bg-[#0f172a] rounded-lg p-4">
                    <div className="text-amber-500 font-mono text-sm mb-2">HOW IT WORKS</div>
                    <div className="text-slate-300 space-y-2">
                      <div>→ You enter a company number</div>
                      <div>→ AI calls them, navigates the phone tree</div>
                      <div>→ Sits on hold while you do literally anything else</div>
                      <div>→ Buzzes your phone the SECOND a human picks up</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Twitter Thread */}
              <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155] mb-8">
                <h3 className="font-display text-xl mb-4 text-white">🐦 Twitter Thread Structure</h3>
                <div className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-bold text-sm shrink-0">1</div>
                    <div className="bg-[#0f172a] rounded-lg p-3 flex-1 text-slate-300">
                      I waited 47 minutes on hold with the IRS last week. Not anymore. 🧵 I built something.
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white font-bold text-sm shrink-0">2</div>
                    <div className="bg-[#0f172a] rounded-lg p-3 flex-1 text-slate-300">
                      The average American spends 10 HOURS per year on hold. If you bill by the hour, that's $1,000-2,000 of your life.
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white font-bold text-sm shrink-0">3</div>
                    <div className="bg-[#0f172a] rounded-lg p-3 flex-1 text-slate-300">
                      I built OnHoldBot. You give it a number. It calls them. Navigates the phone tree. Sits on hold. The moment a human picks up — you get buzzed.
                    </div>
                  </div>
                  <div className="text-slate-500 text-sm pl-11">+ 4 more tweets with demo GIF, technical details, and launch link</div>
                </div>
              </div>

              {/* Reddit Strategy */}
              <div className="bg-emerald-500/10 rounded-xl p-6 border border-emerald-500/30">
                <h3 className="font-display text-xl mb-4 text-white">🟠 Reddit Launch Strategy</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#0f172a] rounded-lg p-4">
                    <div className="font-semibold text-white mb-2">r/lifehacks</div>
                    <div className="text-slate-400 text-sm">Human story angle. "I built a bot that sits on hold so I don't have to — notifies me the second a human picks up"</div>
                  </div>
                  <div className="bg-[#0f172a] rounded-lg p-4">
                    <div className="font-semibold text-white mb-2">r/Frugal</div>
                    <div className="text-slate-400 text-sm">Savings angle. Focus on time = money for professionals who bill hourly.</div>
                  </div>
                  <div className="bg-[#0f172a] rounded-lg p-4">
                    <div className="font-semibold text-white mb-2">r/Automation</div>
                    <div className="text-slate-400 text-sm">Technical angle. Twilio + OpenAI Realtime architecture breakdown. This audience wants the how.</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* BRAND SECTION */}
          <section id="brand" className="mb-24 scroll-mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Card */}
              <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-emerald-600 rounded-2xl p-8 mb-8 text-white">
                <span className="text-white/70 font-mono text-sm uppercase tracking-wider">Brand Design Spec</span>
                <h2 className="font-display text-4xl mt-2 mb-4">Visual Identity</h2>
                <p className="text-white/80 text-lg max-w-2xl">
                  Conversational assistant aesthetic. Light, warm, human.
                  The app's job is to make people feel comfortable — not monitor a dashboard.
                </p>
              </div>

              {/* Design Direction */}
              <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155] mb-8">
                <h3 className="font-display text-xl mb-4 text-white">🎯 Design Direction</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="text-red-400 font-medium mb-3">❌ OLD DIRECTION (Rejected)</div>
                    <ul className="space-y-2 text-slate-400 text-sm">
                      <li>• Dark navy palette, technical feel</li>
                      <li>• Bridge diagrams (YOU ●——— BOT ——— COMCAST)</li>
                      <li>• IVR breadcrumbs, FFT visualizer bars</li>
                      <li>• "HOLDING" status in bold uppercase</li>
                      <li>• Looked like a monitoring dashboard</li>
                    </ul>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                    <div className="text-emerald-400 font-medium mb-3">✅ NEW DIRECTION</div>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li>• Conversational assistant vibe</li>
                      <li>• Light, warm, human</li>
                      <li>• Focus on relief, not technical monitoring</li>
                      <li>• The actual user is a parent calling Comcast</li>
                      <li>• They want relief, not a dashboard</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Color Palette */}
              <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155] mb-8">
                <h3 className="font-display text-xl mb-6 text-white">🎨 Color Palette</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-slate-400 mb-3">Backgrounds — Deep Navy (Slate)</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-lg overflow-hidden">
                        <div className="h-16 bg-[#0f172a]"></div>
                        <div className="p-2 bg-[#0f172a] border-t border-[#334155] text-xs">
                          <div className="font-mono text-slate-300">#0f172a</div>
                          <div className="text-slate-500">Background</div>
                        </div>
                      </div>
                      <div className="rounded-lg overflow-hidden">
                        <div className="h-16 bg-[#1e293b]"></div>
                        <div className="p-2 bg-[#0f172a] border-t border-[#334155] text-xs">
                          <div className="font-mono text-slate-300">#1e293b</div>
                          <div className="text-slate-500">Surface</div>
                        </div>
                      </div>
                      <div className="rounded-lg overflow-hidden">
                        <div className="h-16 bg-[#334155]"></div>
                        <div className="p-2 bg-[#0f172a] border-t border-[#334155] text-xs">
                          <div className="font-mono text-slate-300">#334155</div>
                          <div className="text-slate-500">Border</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-400 mb-3">Accent — Amber (Unmute Moment)</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-lg overflow-hidden">
                        <div className="h-16 bg-[#fbbf24]"></div>
                        <div className="p-2 bg-[#0f172a] border-t border-[#334155] text-xs">
                          <div className="font-mono text-slate-300">#fbbf24</div>
                          <div className="text-slate-500">Amber 400</div>
                        </div>
                      </div>
                      <div className="rounded-lg overflow-hidden">
                        <div className="h-16 bg-[#f59e0b]"></div>
                        <div className="p-2 bg-[#0f172a] border-t border-[#334155] text-xs">
                          <div className="font-mono text-slate-300">#f59e0b</div>
                          <div className="text-slate-500">Amber 500</div>
                        </div>
                      </div>
                      <div className="rounded-lg overflow-hidden">
                        <div className="h-16 bg-[#d97706]"></div>
                        <div className="p-2 bg-[#0f172a] border-t border-[#334155] text-xs">
                          <div className="font-mono text-slate-300">#d97706</div>
                          <div className="text-slate-500">Amber 600</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="font-medium text-slate-400 mb-3">Status Colors</h4>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500"></div>
                      <div className="text-sm">
                        <div className="font-mono text-slate-300">#10b981</div>
                        <div className="text-slate-500">Success</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500"></div>
                      <div className="text-sm">
                        <div className="font-mono text-slate-300">#f59e0b</div>
                        <div className="text-slate-500">Warning</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-red-500"></div>
                      <div className="text-sm">
                        <div className="font-mono text-slate-300">#ef4444</div>
                        <div className="text-slate-500">Error</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155] mb-8">
                <h3 className="font-display text-xl mb-6 text-white">✍️ Typography</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#0f172a] rounded-lg p-4">
                    <div className="text-slate-500 font-mono text-xs mb-2">DISPLAY</div>
                    <div className="font-display text-3xl text-white">Space Grotesk</div>
                    <p className="text-slate-400 text-sm mt-2">Headlines, hero copy, section titles. Modern, clean, bold.</p>
                  </div>
                  <div className="bg-[#0f172a] rounded-lg p-4">
                    <div className="text-slate-500 font-mono text-xs mb-2">BODY</div>
                    <div className="text-3xl text-white">Plus Jakarta</div>
                    <p className="text-slate-400 text-sm mt-2">Body text, buttons, labels, navigation. Friendly readability.</p>
                  </div>
                  <div className="bg-[#0f172a] rounded-lg p-4">
                    <div className="text-slate-500 font-mono text-xs mb-2">MONO</div>
                    <div className="font-mono text-3xl text-white">JetBrains</div>
                    <p className="text-slate-400 text-sm mt-2">Numbers, timers, status codes. Technical precision.</p>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="bg-amber-500/10 rounded-xl p-6 border border-amber-500/30">
                <h3 className="font-display text-xl mb-4 text-white">⚙️ Tech Stack</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#0f172a] rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">📞</div>
                    <div className="font-semibold text-white">Twilio</div>
                    <div className="text-slate-500 text-sm">Call routing</div>
                  </div>
                  <div className="bg-[#0f172a] rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🤖</div>
                    <div className="font-semibold text-white">OpenAI Voice</div>
                    <div className="text-slate-500 text-sm">Menu navigation</div>
                  </div>
                  <div className="bg-[#0f172a] rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🎤</div>
                    <div className="font-semibold text-white">Speech-to-Text</div>
                    <div className="text-slate-500 text-sm">Human detection</div>
                  </div>
                  <div className="bg-[#0f172a] rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">📱</div>
                    <div className="font-semibold text-white">SMS/App</div>
                    <div className="text-slate-500 text-sm">Alerts</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* ASSETS SECTION */}
          <section id="assets" className="mb-24 scroll-mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Card */}
              <div className="bg-gradient-to-br from-[#475569] to-[#334155] rounded-2xl p-8 mb-8 text-white border border-[#475569]">
                <span className="text-slate-400 font-mono text-sm uppercase tracking-wider">Brand Assets</span>
                <h2 className="font-display text-4xl mt-2 mb-4">Generated Visuals</h2>
                <p className="text-slate-300 text-lg max-w-2xl">
                  All marketing assets for launch. Hero images, social graphics, diagrams.
                </p>
              </div>

              {/* Asset Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-[#1e293b] rounded-xl overflow-hidden border border-[#334155]">
                  <div className="h-48 bg-gradient-to-br from-amber-500/20 to-emerald-500/20 flex items-center justify-center">
                    <span className="text-6xl">🖼️</span>
                  </div>
                  <div className="p-4">
                    <div className="font-medium text-white">Hero Image</div>
                    <div className="text-sm text-slate-500 font-mono">hero.png • 1536×1024</div>
                    <p className="text-sm text-slate-400 mt-2">Product Hunt hero, main marketing visual.</p>
                  </div>
                </div>
                <div className="bg-[#1e293b] rounded-xl overflow-hidden border border-[#334155]">
                  <div className="h-48 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 flex items-center justify-center">
                    <span className="text-6xl">📊</span>
                  </div>
                  <div className="p-4">
                    <div className="font-medium text-white">Call Bridge Diagram</div>
                    <div className="text-sm text-slate-500 font-mono">call-bridge.png • 1024×1024</div>
                    <p className="text-sm text-slate-400 mt-2">YOU ← BOT → COMPANY infographic showing 3-way call.</p>
                  </div>
                </div>
                <div className="bg-[#1e293b] rounded-xl overflow-hidden border border-[#334155]">
                  <div className="h-48 bg-gradient-to-br from-amber-500/20 to-slate-500/20 flex items-center justify-center">
                    <span className="text-6xl">📱</span>
                  </div>
                  <div className="p-4">
                    <div className="font-medium text-white">Active Monitor Screenshot</div>
                    <div className="text-sm text-slate-500 font-mono">active-monitor.png • 1024×1536</div>
                    <p className="text-sm text-slate-400 mt-2">Mobile screenshot showing call in progress.</p>
                  </div>
                </div>
                <div className="bg-[#1e293b] rounded-xl overflow-hidden border border-[#334155]">
                  <div className="h-48 bg-gradient-to-br from-emerald-500/20 to-slate-500/20 flex items-center justify-center">
                    <span className="text-6xl">✅</span>
                  </div>
                  <div className="p-4">
                    <div className="font-medium text-white">Reconnect Screen</div>
                    <div className="text-sm text-slate-500 font-mono">reconnect.png • 1024×1536</div>
                    <p className="text-sm text-slate-400 mt-2">Full-screen green "Human detected!" notification.</p>
                  </div>
                </div>
              </div>

              {/* Social Assets */}
              <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155] mb-8">
                <h3 className="font-display text-xl mb-4 text-white">📱 Social Media Assets</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-[#334155]">
                    <div>
                      <div className="font-medium text-white">social-twitter.png</div>
                      <div className="text-sm text-slate-500">Twitter/X social card — 1200×628</div>
                    </div>
                    <span className="font-mono text-sm text-slate-500">🐦</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#334155]">
                    <div>
                      <div className="font-medium text-white">social-linkedin.png</div>
                      <div className="text-sm text-slate-500">LinkedIn social card — 1200×627</div>
                    </div>
                    <span className="font-mono text-sm text-slate-500">💼</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#334155]">
                    <div>
                      <div className="font-medium text-white">social-reddit.png</div>
                      <div className="text-sm text-slate-500">Reddit preview card — 1200×630</div>
                    </div>
                    <span className="font-mono text-sm text-slate-500">🟠</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <div className="font-medium text-white">product-hunt-thumbnail.png</div>
                      <div className="text-sm text-slate-500">PH gallery thumbnail — 1270×760</div>
                    </div>
                    <span className="font-mono text-sm text-slate-500">🏆</span>
                  </div>
                </div>
              </div>

              {/* File Locations */}
              <div className="bg-emerald-500/10 rounded-xl p-6 border border-emerald-500/30">
                <h3 className="font-display text-xl mb-4 text-white">📁 Asset Locations</h3>
                <div className="bg-[#0f172a] rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto">
                  <div>~/clawd/projects/onholdbot/assets/</div>
                  <div className="text-slate-500 mt-2">├── hero.png</div>
                  <div className="text-slate-500">├── call-bridge.png</div>
                  <div className="text-slate-500">├── active-monitor.png</div>
                  <div className="text-slate-500">├── reconnect.png</div>
                  <div className="text-slate-500">├── social-twitter.png</div>
                  <div className="text-slate-500">├── social-linkedin.png</div>
                  <div className="text-slate-500">└── social-reddit.png</div>
                </div>
              </div>
            </motion.div>
          </section>

        </div>
      </main>
    </div>
  );
}
