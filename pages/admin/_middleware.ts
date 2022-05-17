import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const requestedPage = req.page.name;
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    url.searchParams.append("p", requestedPage);

    return NextResponse.redirect(url);
  }

  const validRole = ["admin", "super-user", "SEO"];

  if (!validRole.includes(session.user?.role)) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
