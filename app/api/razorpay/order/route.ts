// app/api/razorpay/order/route.ts
import { NextResponse } from "next/server";
import { createRazorpayOrder } from "@/lib/serverHelpers";

export async function POST(req: Request) {
  const { amount } = await req.json();
  if (!amount)
    return NextResponse.json(
      { ok: false, error: "Missing amount" },
      { status: 400 }
    );

  const order = await createRazorpayOrder(amount, `manual_${Date.now()}`);

  return NextResponse.json({
    ok: true,
    order,
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  });
}
