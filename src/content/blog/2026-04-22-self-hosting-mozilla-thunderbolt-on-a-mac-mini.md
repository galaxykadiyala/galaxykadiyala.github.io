---
title: "Self-hosting Mozilla Thunderbolt on a Mac Mini: an honest walkthrough"
description: "Mozilla shipped a self-hostable AI client. I tried to run it on my Mac Mini. Here's everything that broke, and why I still think it matters."
date: 2026-04-22T14:42:06.369Z
tags: [mozilla, thunderbolt, ai, self-hosting, mac]
draft: false
---

Mozilla's MZLA subsidiary (the team behind Thunderbird) quietly launched **Thunderbolt** this week. It's an open-source, self-hostable AI client pitched as a data-sovereign alternative to Copilot and ChatGPT Enterprise. You bring your own model provider, you own your data, you run it on your own hardware.

As a Mozilla Reps alum since 2010, I've been waiting a long time for Mozilla to ship something this aligned with the open-web values that got me into the community in the first place. So on a free evening I grabbed my Mac Mini and decided to self-host it.

What follows is an honest account of how that went. Spoiler: I didn't get it working. But I think the story is worth telling anyway, because the vision is right and the rough edges are fixable.

## What Thunderbolt is

Briefly: Thunderbolt integrates with deepset's Haystack platform for AI orchestration, supports MCP servers and Agent Client Protocol, and can be configured to run on a single machine for sensitive workloads. The pitch from MZLA CEO Ryan Sipes, "when you rely on big proprietary providers, you're just renting a critical part of your organization's operations," is exactly the framing I'd hope to hear from Mozilla.

The landing page at thunderbolt.io has one button, "Get Started", which drops you straight at the GitHub repo. No hosted option, no waitlist form, just source code. Okay then, self-host it is.

## The setup

There's no installer, no brew tap, no prebuilt binary. You build from source.

Prerequisites I ended up needing on macOS:

- Homebrew
- Bun (not in Homebrew by default, use the official installer: `curl -fsSL https://bun.sh/install | bash`)
- Rust
- Docker Desktop (which, as it turns out, you don't actually need. More on that below.)

Then the standard dance:

```bash
git clone https://github.com/thunderbird/thunderbolt.git
cd thunderbolt
make setup
cp .env.example .env
cd backend && cp .env.example .env && cd ..
```

So far so good. Then things started breaking.

## Five things that broke

### 1. Docker Postgres refused to start

First run of `make docker-up` and:

```
dependency failed to start: container powersync-service-postgres-1 is unhealthy
```

Turns out you don't actually need Docker at all for a basic local run. The backend's `.env` defaults to `DATABASE_DRIVER="pglite"`, an embedded Postgres that works without any containers. PowerSync is only for multi-device sync.

**Fix:** skip `make docker-up` entirely. Just run the backend and frontend directly with `bun dev`.

### 2. The pglite data directory doesn't exist

Ran `bun dev` in the backend. Got:

```
ENOENT: no such file or directory, mkdir '/thunderbolt/backend/.pglite/data'
```

The app expects `.pglite/data` to exist, but doesn't create it. Five-second fix:

```bash
mkdir -p backend/.pglite/data
```

A five-second fix that should've been one line in the startup code.

### 3. WAITLIST_ENABLED=false does nothing

My `.env` had `WAITLIST_ENABLED=false`. The app still forced me onto the waitlist. Every signup attempt triggered:

```
📧 Sending joined waitlist email
```

I grepped the backend source. `waitlistEnabled` is defined in the settings schema. It's read from the environment. And then it's never actually used anywhere in the sign-in logic. The flag is dead code. Setting it to false is cosmetic.

The real gate is in `backend/src/auth/auth.ts`: a new email either goes on the waitlist or gets auto-approved based on `WAITLIST_AUTO_APPROVE_DOMAINS`.

**Fix:** add your email domain to that list. In my case:

```
WAITLIST_AUTO_APPROVE_DOMAINS=mozilla.org,thunderbird.net,mozilla.ai,mozilla.com,gmail.com
```

Then delete the pglite DB to clear your pending waitlist entry and restart.

### 4. Resend sender hardcoded to an unverified domain

Even with auto-approve working, no OTP arrived. The reason lives in `backend/src/lib/resend.ts`:

```ts
export const emailFrom = 'hello@auth.thunderbolt.io'
```

Resend's free tier requires a verified sending domain, so `hello@auth.thunderbolt.io` silently fails unless you own and have verified that domain. Which, obviously, you don't.

Resend provides `onboarding@resend.dev` as a no-setup sender for testing. One-line patch:

```bash
sed -i '' "s/hello@auth.thunderbolt.io/onboarding@resend.dev/" backend/src/lib/resend.ts
```

OTP arrived. Progress.

### 5. CORS on OTP verify

Entered the OTP. Got: `Verification failed. Please try again.`

Backend logs: nothing. The request wasn't even reaching the backend. Browser console: CORS error.

My `.env` had the right origins:

```
TRUSTED_ORIGINS="http://localhost:1420"
CORS_ORIGINS=http://localhost:1420,tauri://localhost,http://tauri.localhost
```

I was accessing the app at `http://localhost:1420`. By every reasonable reading of the config, this should work. It didn't. That's where I stopped.

## Why I stopped

Five issues deep, patching the source to work around hardcoded senders, and the verify endpoint is still broken. At some point debugging stops being productive and starts being yak-shaving. That's where I was.

Thunderbolt is pre-alpha, explicitly under active security audit, and not enterprise-ready. Expecting polish at this stage isn't reasonable. I knew that going in. But I wanted to share the specific failure modes because pre-alpha or not, most of these are small fixes that would dramatically improve the self-host first-run experience.

## Why I'm still rooting for it

The vision is right. A self-hostable, open-source, enterprise-grade AI client with first-class MCP support is exactly what Mozilla should be shipping in 2026. The Thunderbird team has two decades of experience with the hardest open-source problem: building a user-friendly client that talks to messy backend protocols. That's exactly the muscle you need to build a good AI client.

The code is open. The team is small. The issues I hit are the kind that get fixed in weeks once real users start filing them.

## What I'd recommend today

If you want to try Thunderbolt: there's no hosted option yet and the self-host path isn't ready for casual use. Your best move is to star the repo and wait. MZLA is reportedly working on a hosted version, and when that opens up, it'll probably be the right entry point for most people.

If you want "own your stack" AI today: Ollama paired with Open WebUI is a ten-minute setup and gives you a similar philosophy with none of the pain.

If you're on the Thunderbolt team reading this: I'll file proper GitHub issues for each of the five problems above. The X thread is [here](https://x.com/GalaxyK/status/2046922947294814606?s=20). Thanks for building this. The world needs more of it.

Mozilla Volunteer since 2010. Still rooting for you. 🦊