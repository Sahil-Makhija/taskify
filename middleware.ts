import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    // console.log({req});

    if (auth.userId && auth.isPublicRoute) {
      let path = "/";
      if (auth.orgId) {
        path = `/organization/${auth.orgId}`;
      } else {
        path = "/select-org";
      }
      const redirection = new URL(path, req.url);
      return NextResponse.redirect(redirection);
    }
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
      return NextResponse.redirect(new URL("/select-org", req.url));
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
