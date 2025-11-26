// app/api/enroll/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";
import {
  createRazorpayOrder,
  saveStudent,
  sendEmail,
} from "@/lib/serverHelpers";

export async function POST(req: Request) {
  try {
    const { name, email, phone, courseId } = await req.json();

    if (!name || !email || !courseId) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fetch course
    const { data: course } = await supabaseAdmin
      .from("courses")
      .select("*")
      .eq("id", courseId)
      .single();

    if (!course)
      return NextResponse.json({ ok: false, error: "Course not found" });

    const amountPaise = course.price * 100;

    // Create student (pending)
    const student = await saveStudent({
      name,
      email,
      phone,
      course_id: courseId,
      status: "pending",
    });

    // Create Razorpay Order
    const order = await createRazorpayOrder(
      amountPaise,
      `student_${student.id}_${Date.now()}`
    );

    // Update student with Razorpay order
    await supabaseAdmin
      .from("students")
      .update({ razorpay_order_id: order.id })
      .eq("id", student.id);

    // Optional: send enrollment email
    await sendEmail({
      to: email,
      subject: "Enrollment Started",
      html: `<p>Dear ${name},<br>Your enrollment for ${course.title} has started.</p>`,
    });

    return NextResponse.json({
      ok: true,
      order,
      student_id: student.id,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
