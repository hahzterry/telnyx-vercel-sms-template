import { sendSms } from "@/lib/telnyx";

/** POST { to: "+1...", text: "..." } -> sends an SMS from your Telnyx number. */
export async function POST(req: Request) {
  const { to, text } = (await req.json()) as { to?: string; text?: string };
  if (!to || !text) return Response.json({ error: "to and text are required" }, { status: 400 });
  try {
    const msg = await sendSms(to, text);
    return Response.json({ id: msg.id });
  } catch (err) {
    return Response.json({ error: err instanceof Error ? err.message : String(err) }, { status: 502 });
  }
}
