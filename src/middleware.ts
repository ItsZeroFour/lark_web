import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Edge middleware uses only the edge-safe config (no Prisma/bcrypt).
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  // Protect the whole admin area; the `authorized` callback whitelists /admin/login.
  matcher: ["/admin/:path*"],
};
