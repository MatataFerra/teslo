import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    return new Response("Unauthorized", { status: 401, headers: { "Content-Type": "application/json" } });
  }

  const validRole = ["admin", "super-user", "SEO"];

  if (!validRole.includes(session.user?.role)) {
    return new Response("Unauthorized", { status: 401, headers: { "Content-Type": "application/json" } });
  }

  return NextResponse.next();
}
