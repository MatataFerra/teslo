import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
// import { jwt } from "../../utils";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  // const { token = "" } = req.cookies;

  const session = getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const requestedPage = req.page.name;
    console.log(`[middleware] ${requestedPage}`);

    return NextResponse.redirect(`/auth/login?p=${requestedPage}`);
  }

  return NextResponse.next();

  // try {
  //   await jwt.isValidToken(token);

  //   return NextResponse.next();
  // } catch (error) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = "/auth/login";
  //   url.search = `p=${req.page.name}`;

  //   return NextResponse.redirect(url);

  //   // return new Response("response");
  // }
}
