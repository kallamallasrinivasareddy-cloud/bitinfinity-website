// app/api/email/send/route.ts
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/serverHelpers";

export async function POST(req: Request) {
  const { to, subject, html } = await req.json();

  if (!to || !subject)
    return NextResponse.json(
      { ok: false, error: "Missing to/subject" },
      { status: 400 }
    );

  await sendEmail({ to, subject, html });

  return NextResponse.json({ ok: true });
}
