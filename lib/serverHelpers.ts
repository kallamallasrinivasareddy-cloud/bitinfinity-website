// lib/serverHelpers.ts
import Razorpay from "razorpay";
import crypto from "crypto";
import fetch from "node-fetch";
import { supabaseAdmin } from "./supabaseClient";

// Razorpay client
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Create Razorpay order
export async function createRazorpayOrder(amount: number, receipt: string) {
  return await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt,
    payment_capture: 1,
  });
}

// Verify Razorpay webhook signature
export function verifyRazorpaySignature(rawBody: string, signature: string) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
  return expected === signature;
}

// Log webhook
export async function logWebhook(source: string, body: any, headers: any) {
  await supabaseAdmin.from("webhook_logs").insert([
    {
      source,
      body,
      headers,
    },
  ]);
}

// Save student record
export async function saveStudent(data: any) {
  const { data: row, error } = await supabaseAdmin
    .from("students")
    .insert([data])
    .select()
    .single();
  if (error) throw error;
  return row;
}

// Save payment record
export async function savePayment(data: any) {
  const { data: row, error } = await supabaseAdmin
    .from("payments")
    .insert([data])
    .select()
    .single();
  if (error) throw error;
  return row;
}

// Send email via Resend
export async function sendEmail({ to, subject, html }: any) {
  const key = process.env.RESEND_API_KEY!;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "BIT INFINITY <noreply@bitinfinity.com>",
      to: [to],
      subject,
      html,
    }),
  });

  return res.ok;
}
