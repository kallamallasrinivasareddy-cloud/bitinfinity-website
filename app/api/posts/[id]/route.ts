// app/api/posts/[id]/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

export async function PUT(
  req: Request,
  ctx: { params: { id: string } }
) {
  const { id } = ctx.params;
  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("posts")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ ok: false, error: error.message });

  return NextResponse.json({ ok: true, post: data });
}

export async function DELETE(
  req: Request,
  ctx: { params: { id: string } }
) {
  const { id } = ctx.params;

  const { error } = await supabaseAdmin.from("posts").delete().eq("id", id);

  if (error) return NextResponse.json({ ok: false, error: error.message });

  return NextResponse.json({ ok: true });
}
