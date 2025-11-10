import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./server-utils";
import { authSchema } from "./types";

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
      async authorize(credentials) {
        // validation
        const validatedCredentialObject = authSchema.safeParse(credentials);

        if (!validatedCredentialObject.success) {
          return null;
        }

        // runs on login
        const { email, password } = validatedCredentialObject.data;

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
        if (
          request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")
        ) {
          return Response.redirect(new URL("/payment", request.nextUrl));
        }
        return true;
      }

      if (!isLoggedIn && !isAccessingApp) return true;

      return false;
    },
    jwt: ({ token, user }) => {
      if (user) {
        // on sign in
        token.userId = user.id as string;
      }

      return token;
    },
    // exposed to client
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);
