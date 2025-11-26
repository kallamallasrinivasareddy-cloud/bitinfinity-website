// app/api/razorpay/webhook/route.ts
import { NextResponse } from "next/server";
import {
  verifyRazorpaySignature,
  savePayment,
  logWebhook,
  sendEmail,
} from "@/lib/serverHelpers";
import { supabaseAdmin } from "@/lib/supabaseClient";

export const runtime = "nodejs";       // Required
export const preferredRegion = "bom1"; // Faster for Razorpay India

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";

  await logWebhook("razorpay", rawBody, Object.fromEntries(req.headers));

  if (!verifyRazorpaySignature(rawBody, signature)) {
    return NextResponse.json({ ok: false, error: "Bad signature" }, { status: 400 });
  }

  const payload = JSON.parse(rawBody);
  const event = payload.event;

  if (event === "payment.captured") {
    const payment = payload.payload.payment.entity;

    const { data: student } = await supabaseAdmin
      .from("students")
      .select("*")
      .eq("razorpay_order_id", payment.order_id)
      .single();

    if (!student) return NextResponse.json({ ok: true });

    // Save payment
    await savePayment({
      student_id: student.id,
      razorpay_payment_id: payment.id,
      razorpay_order_id: payment.order_id,
      amount: payment.amount,
      status: payment.status,
      payload,
    });

    // Update student
    await supabaseAdmin
      .from("students")
      .update({ status: "paid" })
      .eq("id", student.id);

    // Send confirmation email
    await sendEmail({
      to: student.email,
      subject: "Payment Successful",
      html: `<p>Your payment (${payment.id}) was successful.</p>`,
    });
  }

  return NextResponse.json({ ok: true });
}
