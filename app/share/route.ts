// app/share/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const url = form.get("url") as string;
  const text = form.get("text") as string;

  const sharedUrl = url || text;
  if (!sharedUrl) {
    return NextResponse.redirect("/");
  }

  return NextResponse.redirect(`/?url=${encodeURIComponent(sharedUrl)}`);
}
