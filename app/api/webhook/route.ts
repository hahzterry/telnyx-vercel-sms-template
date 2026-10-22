import { sendSms, verifyTelnyxSignature } from "@/lib/telnyx";

const seen = new Map<string, number>();
const OPT_OUT_KEY = "telnyx:optout:";

function alreadySeen(id: string): boolean {
  const now = Date.now();

  for (const [key, timestamp] of seen) {
    if (now - timestamp > 10 * 60_000) seen.delete(key);
  }

  if (seen.has(id)) return true;

  seen.set(id, now);
  return false;
}

type TelnyxEvent = {
  data?: {
    id?: string;
    event_type?: string;
    payload?: {
      from?: { phone_number?: string };
      to?: Array<{ phone_number?: string }>;
      text?: string;
      direction?: string;
    };
  };
};

async function reply(to: string, message: string) {
  try {
    await sendSms(to, message);
  } catch (error) {
    console.error("Telnyx auto-reply failed", error);
  }
}

export async function POST(req: Request) {
  const raw = await req.text();

  const valid = verifyTelnyxSignature(
    raw,
    req.headers.get("telnyx-signature-ed25519"),
    req.headers.get("telnyx-timestamp"),
  );

  if (!valid) {
    return new Response("Invalid signature", { status: 401 });
  }

  let event: TelnyxEvent;

  try {
    event = JSON.parse(raw) as TelnyxEvent;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const data = event.data;
  const id = data?.id;
  const eventType = data?.event_type;
  const payload = data?.payload;

  if (!id || !eventType || !payload) {
    return new Response("Invalid event", { status: 400 });
  }

  if (alreadySeen(id)) {
    return Response.json({ ok: true, duplicate: true });
  }

  const from = payload.from?.phone_number;
  const text = payload.text?.trim();
  const normalized = text?.toUpperCase();

  // Process inbound messages only.
  if (eventType !== "message.received" || !from || !text) {
    return Response.json({ ok: true });
  }

  // Do not respond to messages sent by your own system.
  if (payload.direction === "outbound") {
    return Response.json({ ok: true });
  }

  console.log("Inbound Telnyx SMS", {
    eventType,
    from,
    messageLength: text.length,
  });

  // STOP: persist this opt-out in a database before production use.
  if (["STOP", "STOPALL", "UNSUBSCRIBE", "CANCEL", "END", "QUIT"].includes(normalized ?? "")) {
    console.log("SMS opt-out received", { from, key: OPT_OUT_KEY + from });

    await reply(
      from,
      "You have been opted out of messages from this number. No further messages will be sent unless you opt back in.",
    );

    return Response.json({ ok: true, action: "opt_out" });
  }

  if (["START", "UNSTOP"].includes(normalized ?? "")) {
    await reply(
      from,
      "Welcome back! You may receive messages from this business again. Reply STOP to opt out.",
    );

    return Response.json({ ok: true, action: "opt_in_keyword" });
  }

  if (normalized === "HELP") {
    await reply(
      from,
      "Thanks for contacting us. Reply to this message for assistance, or contact the business directly. Reply STOP to opt out.",
    );

    return Response.json({ ok: true, action: "help" });
  }

  // Simple Atlanta business acknowledgment.
  await reply(
    from,
    "Thanks for reaching out! We've received your message. An Atlanta business team member will follow up as soon as possible. Reply STOP to opt out.",
  );

  return Response.json({ ok: true, action: "acknowledged" });
}
