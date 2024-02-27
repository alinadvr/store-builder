import { Shop } from "@/models/shopModel";
import { User } from "@/models/userModel";
import { connectDB } from "@/utils/connectDB";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
        },
      },
      async authorize(credentials, req) {
        const { email, password, loginType } = credentials as any;

        if (!email || !password)
          throw new Error(
            "Shop name, email or password missed. Please fill out the field and try again"
          );

        await connectDB();

        let account;
        if (loginType === "shop")
          account = await Shop.findOne({ email }).catch(() => undefined);
        else account = await User.findOne({ email }).catch(() => undefined);

        if (!account)
          throw new Error(
            'Account with that email does not exist. Please try to switch between the "As customer" and "As seller" tabs'
          );

        const match = await bcrypt.compare(password, account.password);

        if (!match) throw new Error("Invalid email or password");

        if (loginType === "shop")
          return {
            id: account._id,
            image: account.link,
            name: account.title,
            email: account.email,
          };

        return {
          id: account._id,
          image: account._id,
          email: account.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
