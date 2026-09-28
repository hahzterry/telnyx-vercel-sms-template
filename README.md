# Telnyx SMS on Vercel

The smallest useful Next.js app for a Telnyx phone number bought through the Vercel Marketplace: send an SMS from a form, receive inbound messages and delivery receipts on a signed webhook, and auto-reply.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fteam-telnyx%2Ftelnyx-vercel-sms-template&products=%5B%7B%22type%22%3A%22integration%22%2C%22integrationSlug%22%3A%22telnyx%22%2C%22productSlug%22%3A%22phone-number%22%2C%22protocol%22%3A%22storage%22%7D%5D)

## What you get

| Environment variable | Set by | Used for |
| --- | --- | --- |
| `TELNYX_API_KEY` | the integration | authenticating calls to `api.telnyx.com` |
| `TELNYX_PHONE_NUMBER` | the integration | the `from` number |
| `TELNYX_MESSAGING_PROFILE_ID` | the integration | routing outbound messages |
| `TELNYX_PUBLIC_KEY` | the integration | verifying inbound webhook signatures |

## Run it

1. Deploy with the button above, or add **Telnyx** to an existing project from the Marketplace.
2. On the phone number in Vercel, set the inbound webhook to `https://<your-deployment>/api/telnyx/inbound` (the integration sets this for you when the number is connected to a project).
3. Open the deployment: send a message from the form, or text **PING** to your number.
4. To reach real US handsets, open **Telnyx** from the integration page and complete the three-step messaging setup (10DLC). Until then messages only reach verified test numbers.

## The two routes

- `app/api/send/route.ts` — `POST { to, text }` sends an SMS with `POST /v2/messages`.
- `app/api/telnyx/inbound/route.ts` — receives Telnyx events. It verifies the Ed25519 signature over `${telnyx-timestamp}|${body}` and **fails closed** when the key or headers are missing, dedupes on `data.id` (retries and failover can deliver an event twice), and answers within 2 seconds. Replace the PONG example with your own handling.

Local development: `cp .env.example .env.local`, fill in the values from your Vercel project, `npm install`, `npm run dev`. Inbound webhooks need a public URL (a tunnel) to reach your laptop.
