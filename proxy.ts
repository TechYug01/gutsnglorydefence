import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, req) => {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";
  
  const isAdminSubdomain = hostname.startsWith("admin.");
  const isBlogSubdomain = hostname.startsWith("blog.");
    // Redirect /admin path on non-admin domains to the admin subdomain
  if (!isAdminSubdomain && url.pathname.startsWith("/admin")) {
    const adminUrl = new URL(url);
    adminUrl.hostname = `admin.${hostname}`;
    adminUrl.pathname = url.pathname.replace(/^\/admin/, "") || "/";
    return NextResponse.redirect(adminUrl);
  }

  // Redirect /blogs path on non-blogs domains to the blogs subdomain
  if (!isBlogSubdomain && !isAdminSubdomain && url.pathname.startsWith("/blog")) {
    const blogsUrl = new URL(url);
    blogsUrl.hostname = `blog.${hostname}`;
    blogsUrl.pathname = url.pathname.replace(/^\/blogs/, "") || "/";
    return NextResponse.redirect(blogsUrl);
  }

  // Rewrite blogs subdomain requests to the /blogs folder
  if (isBlogSubdomain) {
    if (!url.pathname.startsWith("/api")) {
      url.pathname = `/blog${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // Rewrite admin subdomain requests to the /admin folder
  if (isAdminSubdomain) {
    // Exempt API routes
    if (!url.pathname.startsWith("/api")) {
      url.pathname = `/admin${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
