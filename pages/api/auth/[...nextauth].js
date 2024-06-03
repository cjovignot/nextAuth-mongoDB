import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDatabase from "../../../lib/connectDatabase";
import User from "../../../model/User";
import argon from "argon2";

export default NextAuth({
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,

      async profile(profile) {
        await connectDatabase();

        const email = profile.email;
        const name = profile.name || profile.given_name; // Ensure name is provided
        const image = profile.picture;

        const exist_user = await User.findOne({ email });
        if (!exist_user) {
          await User.create({ email, name, balance: 0, image });
        }

        return {
          id: profile.sub,
          name,
          email,
          image,
        };
      },
    }),

    // GitHub Provider
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,

      async profile(profile) {
        await connectDatabase();

        const email = profile.email;
        const name = profile.name || profile.login; // Ensure name is provided
        const image = profile.avatar_url;

        const exist_user = await User.findOne({ email });
        if (!exist_user) {
          await User.create({ email, name, balance: 0, image });
        }

        return {
          id: profile.id,
          name,
          email,
          image,
        };
      },
    }),

    // With Custom Credentials
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        await connectDatabase();

        // check user existence
        const user = await User.findOne({ email: credentials?.email });
        if (!user) throw Error("Email or Password doesn't match!");

        // check password
        const matchedPassword = await argon.verify(
          user?.password,
          credentials?.password
        );

        if (!matchedPassword || user.email !== credentials.email)
          throw Error("Email or Password doesn't match!");

        return user;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, token }) {
      // Add custom properties to session object
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});
