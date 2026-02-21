# OnHoldBot

AI service that sits on hold for customer service calls. Forward a number → AI navigates phone tree → notifies you when human picks up.

**Live:** https://onholdbot.ashketing.com

## Features

- **Never wait on hold again** - Our AI handles the waiting
- **Smart IVR Navigation** - AI presses buttons and says options for you
- **Human Detection** - Detects when a real person answers vs hold music/IVR
- **Instant Alerts** - Get notified via SMS when a human answers
- **You're Already Connected** - Pick up right where the bot left off

## Tech Stack

- **Frontend:** Next.js 16 + React 19 + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Telephony:** Twilio (calls, SMS, conferences)
- **AI:** OpenAI (Whisper for transcription)
- **Deployment:** Coolify (Docker)

## Quick Start

1. Clone and install dependencies:

```bash
pnpm install
```

2. Set up environment variables:

```bash
cp .env.example .env.local
# Fill in your Twilio and OpenAI credentials
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `TWILIO_ACCOUNT_SID` | Your Twilio account SID |
| `TWILIO_AUTH_TOKEN` | Your Twilio auth token |
| `TWILIO_API_KEY` | Twilio API key for Voice |
| `TWILIO_API_SECRET` | Twilio API secret |
| `TWILIO_PHONE_NUMBER` | Your Twilio phone number |
| `OPENAI_API_KEY` | OpenAI API key for Whisper |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL (for webhooks) |
| `DEMO_MODE` | Set to "true" to skip actual Twilio calls |

## Deployment to Coolify

1. **Create a new application** in Coolify dashboard
2. **Connect GitHub repo:** `https://github.com/ashtalksai/onholdbot`
3. **Build settings:**
   - Build Pack: Dockerfile
   - Dockerfile: `./Dockerfile`
4. **Domain:** `onholdbot.ashketing.com`
5. **Environment variables:** Add all from `.env.example`
6. **Deploy!**

### Required Twilio Setup

1. Get a phone number from Twilio Console
2. Enable Machine Detection on your account
3. Configure webhook URLs:
   - Voice URL: `https://onholdbot.ashketing.com/api/webhooks/twilio/voice`
   - Status Callback: `https://onholdbot.ashketing.com/api/webhooks/twilio/status`

## Architecture

### Call Flow

1. User enters target phone number
2. Bot initiates call to target with machine detection
3. Call connects to conference
4. Bot monitors for speech patterns indicating human
5. When human detected, user is notified via SMS
6. User can unmute and speak directly

### Key Components

```
src/
├── app/
│   ├── (app)/              # Authenticated app
│   │   ├── dashboard/      # Main dashboard
│   │   ├── calls/          # Call history and active calls
│   │   ├── paths/          # Saved phone tree paths
│   │   └── settings/       # User settings
│   └── api/
│       ├── calls/          # Call initiation API
│       └── webhooks/twilio/ # Twilio webhooks
├── components/
│   ├── call/               # Call UI components
│   └── ui/                 # shadcn/ui components
└── lib/
    ├── audio/              # Human detection
    ├── notifications.ts    # SMS/Push alerts
    └── twilio/             # Twilio client
```

### Human Detection

The bot uses multiple signals to detect humans:
1. **Twilio Machine Detection** - Answers instantly if human detected
2. **Speech pattern analysis** - Tracks speech events in conference
3. **Transcription analysis** - IVR phrases vs conversational speech

## Pricing (Future)

- **Free:** 3 calls/month
- **Basic $19.99/mo:** Unlimited calls
- **Pro $29.99/mo:** + Transcripts, community paths, webhooks

## License

MIT
