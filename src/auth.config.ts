import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js config.
 *
 * Contains everything the middleware needs (route protection, token shaping)
 * but NO Node-only imports (Prisma, bcrypt). The Credentials provider lives in
 * `auth.ts`, which is only loaded in the Node runtime. This split keeps the
 * middleware bundle edge-compatible.
 */
export const authConfig = {
  trustHost: true,
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" },
  callbacks: {
    // Gatekeeper for the middleware matcher (`/admin/*`).
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith("/admin/login");

      if (isOnLogin) {
        // Already authenticated users skip the login screen.
        if (isLoggedIn) return Response.redirect(new URL("/admin", nextUrl));
        return true;
      }
      // Every other /admin route requires a session.
      return isLoggedIn;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "ADMIN" | "EDITOR";
      }
      return session;
    },
  },
  providers: [], // Real providers are attached in auth.ts (Node runtime).
} satisfies NextAuthConfig;
