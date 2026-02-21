# OnHoldBot Implementation Plan

**Status:** ✅ Phase 1 Complete, 🚧 Phase 2 In Progress  
**Started:** 2025-02-21  
**Deployed:** https://onholdbot.ashketing.com (Coolify)

## Current State

### ✅ Complete
- Landing page with pricing tiers
- Dashboard layout and navigation
- Call initiation UI (new call form)
- Active call monitoring components
- Type definitions (Call, SavedPath, User, etc.)
- UI components (shadcn/ui)
- Twilio SDK installed

### ❌ Missing (Must Implement)
1. **API Routes**
   - `POST /api/calls` - Initiate a call
   - `GET /api/calls` - List user's calls
   - `GET /api/calls/[id]` - Get call status (SSE)
   - `POST /api/webhooks/twilio/voice` - Twilio voice webhook
   - `POST /api/webhooks/twilio/status` - Twilio status callback
   - `POST /api/token` - Generate Twilio access token for client

2. **Twilio Integration**
   - 3-way conference call setup
   - Mute/unmute participant control
   - Audio stream to AI for processing

3. **OpenAI Integration**
   - Realtime Voice API for IVR navigation
   - TTS responses to phone menus
   - Hold music vs human voice detection

4. **Database**
   - User accounts
   - Call records
   - Saved paths

5. **Auth**
   - NextAuth.js with magic links

## Phase 1: Core Call Flow (MVP)

Focus on getting a single call working end-to-end without AI.

### 1.1 Twilio Client Token
```
POST /api/token
- Generates Twilio Access Token
- Returns { token, identity }
```

### 1.2 Call Initiation
```
POST /api/calls
Body: { phoneNumber, companyName?, reason? }
- Creates Twilio conference
- Connects user (muted)
- Connects to target number
- Returns { callId, conferenceId }
```

### 1.3 Voice Webhooks
```
POST /api/webhooks/twilio/voice
- Handles initial call connection
- Returns TwiML to join conference

POST /api/webhooks/twilio/status
- Tracks call state changes
- Triggers alerts when human detected
```

### 1.4 Client-Side Connection
- Use @twilio/voice-sdk to connect
- Listen for status updates via SSE
- Handle unmute when human detected

## Phase 2: AI Integration

### 2.1 OpenAI Realtime Voice
- Stream audio from conference to OpenAI
- Detect IVR prompts
- Generate DTMF responses
- Detect human voice vs hold music

### 2.2 Hold Detection
- Audio analysis for hold music patterns
- Human voice onset detection
- Confidence scoring

## Phase 3: Polish

### 3.1 Notifications
- Push notifications (web-push)
- SMS via Twilio
- Email via Resend

### 3.2 Persistence
- SQLite with Drizzle for MVP
- Store call history, paths, users

### 3.3 PWA
- Service worker
- Offline support
- Push registration

## Environment Variables Needed

```env
# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_API_KEY=
TWILIO_API_SECRET=
TWILIO_PHONE_NUMBER=

# OpenAI
OPENAI_API_KEY=

# App
NEXT_PUBLIC_APP_URL=

# Auth (for later)
NEXTAUTH_SECRET=
```

## Deployment

Target: Vercel
- Serverless functions for API routes
- Edge functions for webhooks (low latency)
- Environment variables via Vercel dashboard

---

## Implementation Log

### Session 1 (2025-02-21)
- [x] Create Twilio token endpoint (`/api/token`)
- [x] Create call initiation endpoint (`/api/calls`)
- [x] Create call status endpoint (`/api/calls/[id]`)
- [x] Create SSE status stream (`/api/calls/[id]/stream`)
- [x] Create voice webhooks (`/api/webhooks/twilio/voice`)
- [x] Create status callbacks (`/api/webhooks/twilio/status`)
- [x] Create conference events (`/api/webhooks/twilio/conference`)
- [x] Wire up frontend to use real API calls
- [x] Create `useCallStatus` hook for real-time updates
- [x] Deploy to Vercel

### Session 2 (2025-02-24)
- [x] Human detection module (`/lib/audio/human-detector.ts`)
- [x] Notification service with SMS support (`/lib/notifications.ts`)
- [x] Enhanced conference webhook for speech detection
- [x] Machine detection integration in call initiation
- [x] Demo mode for testing without Twilio
- [x] Dockerfile for Coolify deployment
- [x] Updated next.config.ts for standalone output
- [x] Added OpenAI dependency

### Next Steps (Phase 2)
- [ ] Configure Twilio credentials in Coolify
- [ ] Create TwiML App for browser calling
- [ ] Add OpenAI Realtime Voice for IVR navigation (optional enhancement)
- [ ] Implement hold music pattern detection (optional)
- [ ] Add push notification support (optional)
