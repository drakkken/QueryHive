import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/question/:id",
  "/tags/:id",
  "/profile/:id",
  "/community",
  "/jobs",
  "/api/webhook",
  "/sign-in(.*)", // Allow all sign-in routes
  "/sign-up(.*)", // Allow all sign-up routes
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect all routes except public ones
  console.log("➡️ Middleware hit for:", req.nextUrl.pathname);
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
