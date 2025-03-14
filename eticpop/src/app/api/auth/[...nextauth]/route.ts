import { handlers } from "@/server/auth";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async session(session, user) {
      session.user.id = user.id; // Add user ID to session
      return session;
    },
    async signIn(user, account, profile) {
      // You can add custom sign-in logic here
      return true;
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
  },
});

export const { GET, POST } = handlers;
