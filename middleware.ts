import { authMiddleware } from "@clerk/nextjs";

// ✅ Middleware جاهز بدون كسر السيرفر
export default authMiddleware({
  publicRoutes: [
    "/favicon.ico",
    "/logo.svg",
    "/logo.png",
    "/_next/static/(.*)",
    "/api/(.*)",
  ],
  ignoredRoutes: [
    "/_next/image/(.*)",
    "/_next/static/(.*)",
    "/favicon.ico",
    "/logo.svg",
    "/logo.png",
  ],
  afterAuth(auth, req) {
    // ✅ تحمي فقط الصفحات وليس API أو static
    if (!auth.userId && req.nextUrl.pathname.startsWith("/dashboard")) {
      return Response.redirect(new URL("/sign-in", req.url));
    }
  },
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.svg|logo.png|api).*)",
  ],
};
