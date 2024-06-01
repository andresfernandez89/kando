import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect();

        const userFound = await User.findOne({
          email: credentials?.email,
        }).select("+password");
        if (!userFound) throw new Error("Invalid Credentials");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userFound.password,
        );
        if (!passwordMatch) throw new Error("Invalid Credentials");

        console.log(userFound);

        return userFound;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
