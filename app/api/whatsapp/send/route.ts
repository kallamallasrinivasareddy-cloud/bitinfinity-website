// app/api/whatsapp/send/route.ts
import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(req: Request) {
  const { to, message } = await req.json();

  // *** Replace with your WhatsApp provider ***
  // Example placeholder:
  //
  // await fetch(process.env.WHATSAPP_GATEWAY_URL!, {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ to, message }),
  // });

  return NextResponse.json({ ok: true });
}
