import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accountId: string | null;
    } & DefaultSession["user"];
  }
}
