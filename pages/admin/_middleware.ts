import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const session: any = getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const requestedPage = req.page.name;

    return NextResponse.redirect(`/auth/login?p=${requestedPage}`);
  }

  const validRole = ["admin", "super-user", "SEO"];

  if (!validRole.includes(session.user.role)) {
    return NextResponse.redirect("/");
  }

  return NextResponse.next();
}
