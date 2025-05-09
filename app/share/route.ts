// File: app/share/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const url = form.get("url") as string;
  const text = form.get("text") as string;

  return NextResponse.redirect(
    `/?url=${encodeURIComponent(url || text || "")}`
  );
}
