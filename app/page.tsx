import { SendForm } from "./send-form";

export default function Home() {
  const number = process.env.TELNYX_PHONE_NUMBER;
  const configured = Boolean(process.env.TELNYX_API_KEY && number);
  return (
    <main>
      <h1>Telnyx SMS on Vercel</h1>
      {configured ? (
        <p>
          Your number is <code>{number}</code>. Text <b>PING</b> to it and you get <b>PONG</b> back, or
          send a message below.
        </p>
      ) : (
        <p>
          No Telnyx number yet. Add <b>Telnyx</b> from the Vercel Marketplace to this project; the
          <code> TELNYX_*</code> environment variables appear automatically, then redeploy.
        </p>
      )}
      <SendForm disabled={!configured} />
      <h2>How it works</h2>
      <ol>
        <li><code>app/api/send/route.ts</code> sends an SMS with <code>POST /v2/messages</code>.</li>
        <li><code>app/api/telnyx/inbound/route.ts</code> receives inbound messages and delivery receipts, verifies the Ed25519 signature with <code>TELNYX_PUBLIC_KEY</code>, dedupes, and answers within 2 seconds.</li>
        <li>US recipients need your 10DLC registration approved first: open <b>Telnyx</b> from the integration in Vercel and follow the three steps.</li>
      </ol>
    </main>
  );
}
