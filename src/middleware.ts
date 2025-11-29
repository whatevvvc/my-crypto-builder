import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  const path = url.pathname;

  // --- YOUR CUSTOM ROUTING LOGIC ---

  // 1. If user goes to /app (The Dashboard) -> Let them through
  if (path.startsWith("/app")) {
     return NextResponse.next();
  }

  // 2. If user goes to /home (The Landing Page) -> Let them through
  if (path === "/" || path.startsWith("/home")) {
     return NextResponse.rewrite(new URL("/home", req.url));
  }

  // 3. Everything else is a "Store" (e.g. /coolshoes)
  // We rewrite /coolshoes -> /[domain]/page.tsx with domain="coolshoes"
  const storeName = path.split("/")[1]; 
  
  // We exclude API routes and Next.js internals from being treated as stores
  if (
    storeName && 
    !storeName.startsWith("api") && 
    !storeName.startsWith("_next") && 
    !storeName.startsWith("app") && 
    !storeName.startsWith("home")
  ) {
     return NextResponse.rewrite(new URL(`/${storeName}${path.replace(`/${storeName}`, "")}`, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};