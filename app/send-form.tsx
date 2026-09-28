"use client";
import { useState } from "react";

export function SendForm({ disabled }: { disabled: boolean }) {
  const [to, setTo] = useState("");
  const [text, setText] = useState("Hello from Vercel via Telnyx");
  const [result, setResult] = useState<string | null>(null);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setResult("sending…");
    const res = await fetch("/api/send", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ to, text }) });
    const json = await res.json();
    setResult(res.ok ? `sent, id ${json.id}` : `failed: ${json.error}`);
  }
  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 8, margin: "16px 0" }}>
      <input placeholder="+15550000000 (E.164)" value={to} onChange={(e) => setTo(e.target.value)} disabled={disabled} required />
      <input value={text} onChange={(e) => setText(e.target.value)} disabled={disabled} required />
      <button type="submit" disabled={disabled}>Send SMS</button>
      {result ? <small>{result}</small> : null}
    </form>
  );
}
