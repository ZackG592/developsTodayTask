import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import PUBLIC_PATHS from "./constants/public_paths";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("name");

  if (!token && !Object.values(PUBLIC_PATHS).includes(url.pathname)) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (token && Object.values(PUBLIC_PATHS).includes(url.pathname)) {
    url.pathname = "/quizzes";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
