import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./db";
import { getUserByEmail } from "./server-utils";

const config = {
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credential) {
        const { email, password } = credential;

        const user = await getUserByEmail(email);
        if (!user) {
          console.log("no user found!");
          return null;
        }

        const passMatch = bcrypt.compare(password, user.hashedPassword);
        if (!passMatch) {
          console.log("Invalid credentials!");
          return null;
        }

        console.log("success!");
        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = Boolean(auth?.user);
      const isAccessingApp = request.nextUrl.pathname.includes("/app");
      if (!isLoggedIn && isAccessingApp) {
        return false;
      }
      if (isLoggedIn && isAccessingApp) {
        return true;
      }

      // accessing other route
      if (isLoggedIn && !isAccessingApp) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }

      if (!isLoggedIn && !isAccessingApp) return true;

      return false;
    },
    jwt: ({ token, user }) => {
      if (user) {
        // on sign in
        token.userId = user.id;
      }

      return token;
    },
    // exposed to client
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);
