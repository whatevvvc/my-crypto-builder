import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;

  // FREE TIER LOGIC:
  // Instead of checking "app.domain.com", we check if the path starts with "/app"
  
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
  // We remove the leading slash to get just the name
  const storeName = path.split("/")[1]; 
  
  if (storeName && !storeName.startsWith("app") && !storeName.startsWith("home")) {
     return NextResponse.rewrite(new URL(`/${storeName}${path.replace(`/${storeName}`, "")}`, req.url));
  }

  return NextResponse.next();
}