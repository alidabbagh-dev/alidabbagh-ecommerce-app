import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("this is middleware")
  const isLoggedIn = req.cookies.get("auth")?.value === "true";
  if (!isLoggedIn && !req.nextUrl.pathname.startsWith("/login") && !req.nextUrl.pathname.startsWith("/register")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}


export const config = {
    matcher: [
    /*
      همه مسیرها به جز:
      - مسیرهای داخلی Next.js (_next)
      - فایل‌های عمومی مثل favicon.ico و robots.txt
    */
    "/((?!_next|favicon.ico|robots.txt).*)",
  ],
};

