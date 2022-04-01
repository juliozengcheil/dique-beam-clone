import GitHub from "next-auth/providers/github";
import { serverEnv } from "../env/server";

export const authOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization:
        "https://github.com/login/oauth/authorize?scope=read:user+user:email+read:org",
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  secret: serverEnv.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log("redirect callback", url, baseUrl);
      // return "/";
      return url
    },
    //   async signIn({ user, account, profile }) {
    //     if (profile.notAllowed) {
    //       return false
    //     }

    //     return true
    //   },
    //   async session({ session, user }) {
    //     return {
    //       ...session,
    //       user: {
    //         ...session.user,
    //         id: user.id,
    //         role: user.role,
    //       },
    //     }
    //   },
  },
};
