import { NextResponse } from "next/server";
import { getSession } from "@/src/bff/auth";

export async function GET() {
  const user = await getSession();

  return NextResponse.json({
    authenticated: !!user,
    user: user ?? null,
  });
}
