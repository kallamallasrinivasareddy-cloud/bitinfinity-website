// app/api/admin/check/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ ok: false }, { status: 401 });
  const user = await supabaseAdmin.auth.getUser(token);
  if (!user || !user.data.user) return NextResponse.json({ ok: false }, { status: 401 });
  const { data: admin } = await supabaseAdmin.from("admins").select("*").eq("id", user.data.user.id).single();
  if (!admin) return NextResponse.json({ ok: false }, { status: 403 });
  return NextResponse.json({ ok: true, user: user.data.user });
}
