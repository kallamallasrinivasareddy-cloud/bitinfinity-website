// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, posts: data });
}

export async function POST(req: Request) {
  const { title, slug, content, author, published } = await req.json();

  const { data, error } = await supabaseAdmin
    .from("posts")
    .insert([{ title, slug, content, author, published }])
    .select()
    .single();

  if (error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, post: data });
}
