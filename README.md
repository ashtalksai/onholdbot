# OnHoldBot

AI that waits on hold so you don't have to. 3-way bridge architecture — you're already on the call, just muted.

## Features

- **3-Way Call Bridge** — You stay connected (muted) throughout. Unmuted the moment a human picks up.
- **AI IVR Navigation** — OpenAI Realtime Voice navigates phone menus automatically.
- **Hold Detection** — Audio analysis detects when hold music ends and human voice begins.
- **Instant Alerts** — Push, SMS, and email notifications the moment a human answers.
- **Phone Tree Memory** — Save successful paths for instant replay on future calls.
- **PWA** — Works from home screen, receives alerts even when backgrounded.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Telephony:** Twilio Voice (3-way calling, TwiML)
- **AI:** OpenAI Realtime Voice API (GPT-4o)
- **Notifications:** Twilio SMS + Web Push + Resend Email
- **Database:** PostgreSQL
- **Auth:** NextAuth.js (magic links)
- **Payments:** Stripe

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  User Dashboard (Next.js PWA)                       │
│  /dashboard  /calls  /paths  /settings              │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│  Call Orchestrator (Next.js API + Twilio)           │
│  1. User provides target number                     │
│  2. Twilio opens 3-way: User ←→ HoldBot ←→ Company │
│  3. HoldBot handles until human connects            │
│  4. Unmute user — seamless handoff                  │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│  HoldBot Voice Brain (OpenAI Realtime Voice)        │
│  - Listens to IVR prompts                           │
│  - Responds via TTS                                 │
│  - Adapts to unexpected menus (LLM reasoning)       │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│  Hold Detector (Audio Analysis)                     │
│  - FFT analysis: detects hold music patterns        │
│  - Human voice onset → triggers alert immediately   │
└─────────────────────────────────────────────────────┘
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── (app)/          # Authenticated app
│   │   ├── dashboard/
│   │   ├── calls/
│   │   ├── paths/
│   │   └── settings/
│   ├── (auth)/         # Auth pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── onboarding/
│   └── api/            # API routes
├── components/
│   ├── call/           # Call-related components
│   ├── shared/         # Shared components
│   └── ui/             # shadcn/ui components
├── lib/
│   └── twilio/         # Twilio integration
└── types/
```

## Pricing

- **Free:** 3 calls/month
- **Basic $19.99/mo:** Unlimited calls
- **Pro $29.99/mo:** + Transcripts, community paths, webhooks
- **Enterprise $5K/yr:** API access, team seats

## License

MIT
