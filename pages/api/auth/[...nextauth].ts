import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { dbUsers } from "../../../database";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
    Credentials({
      name: "Custom Login",
      credentials: {
        email: { label: "Correo", type: "email", placeholder: "correo@mail.com" },
        password: { label: "Contraseña", type: "password", placeholder: "Contraseña" },
      },
      async authorize(credentials: any) {
        return await dbUsers.checkUserEmailPassword(credentials.email, credentials.password);
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },

  session: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    strategy: "jwt",
    updateAge: 86400, // 1 day
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;

        if (account.type === "credentials") {
          token.user = user;
        }

        if (account.type === "oauth") {
          // TODO: Crear usuario o verificar si existe en mi DB

          token.user = await dbUsers.oAuthToDbUser(user?.name ?? "", user?.email ?? "");
        }
      }
      return token;
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    },
  },
});
