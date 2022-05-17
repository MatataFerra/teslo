import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Cookie from "js-cookie";

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const session = getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const requestedPage = req.page.name;

    return NextResponse.redirect(`/auth/login?p=${requestedPage}`);
  }

  return NextResponse.next();
}
