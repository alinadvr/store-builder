import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectDB } from "@/utils/connectDB";

import { User } from "@/models/userModel";
import { ShopModel } from "@/models/shopModel";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        loginType: { label: "LoginType", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials were provided");

        const { email, password, loginType } = credentials;

        if (!email || !password)
          throw new Error(
            "Email or password missed. Please fill out the field and try again",
          );

        await connectDB();

        let account;
        if (loginType === "shop")
          account = await ShopModel.findOne({ email }).catch(() => undefined);
        else account = await User.findOne({ email }).catch(() => undefined);

        if (!account)
          throw new Error(
            'Account with that email does not exist. Please try to switch between the "As customer" and "As seller" tabs',
          );

        const match = await bcrypt.compare(password, account.password);

        if (!match) throw new Error("Invalid email or password");

        if (loginType === "shop")
          return {
            id: account._id,
            link: account.link,
            title: account.title,
            email: account.email,
          };

        return {
          id: account._id,
          email: account.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.link = user.link;
        token.title = user.title;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.link = token.link as string;
        session.user.title = token.title as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthOptions;
