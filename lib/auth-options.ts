import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import axios from "axios";
import { HttpStatusCode } from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const response = await axios({
          url: process.env.NEXT_PUBLIC_HOST + "users/login/",
          method: "POST",
          data: credentials,
          headers: { "Content-Type": "application/json" },
        });

        const user = response.data;

        if (response.status === HttpStatusCode.Ok && user) {
          return user;
        }

        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;

      return session;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
};
