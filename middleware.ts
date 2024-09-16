import NextAuth from "next-auth";
import authConfig from "./auth-config";

const { auth } = NextAuth(authConfig);
auth((req) => {
  const isLoggedin = !!req.auth;
  console.log("Route ", req.nextUrl.pathname);
  console.log("is Logged IN", isLoggedin);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

export { auth as middleware } from "./auth";
