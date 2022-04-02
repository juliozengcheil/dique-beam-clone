import GitHub from "next-auth/providers/github";
import { serverEnv } from "../env/server";

const authorization =
  "https://github.com/login/oauth/authorize?scope=read:user+user:email+read:org";

export const authOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization,
    }),
  ],
  // debug: process.env.NODE_ENV === "development",
  secret: serverEnv.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   console.log("redirect callback", url, baseUrl);
    //   // return "/";
    //   return url;
    // },
    async signIn({ user, account, profile }) {
      console.log('signin user', user )
      console.log('signin account', account)
      console.log('signin profile', profile)
      if (profile.notAllowed) {
        return false;
      }

      return true;
    },
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

var userinfo = {
  url: "https://api.github.com/user",
  async request({ client, tokens }) {
    // Get base profile
    console.log('getting profile')
    const profile = await client.userinfo(tokens);

    console.log('profile getted', profile)

    // If user has email hidden, get their primary email from the GitHub API
    if (!profile.email) {
      console.log('fetching email')
      const emails = await (
        await fetch("https://api.github.com/user/emails", {
          headers: {
            Authorization: `token ${tokens.access_token}`,
          },
        })
      ).json();

      if (emails?.length > 0) {
        // Get primary email
        profile.email = emails.find((email) => email.primary)?.email;
        // And if for some reason it doesn't exist, just use the first
        if (!profile.email) profile.email = emails[0].email;
      }
    }

    const userOrgs = await (
      await fetch("https://api.github.com/user/orgs", {
        headers: { Authorization: `token ${tokens.access_token}` },
      })
    ).json();

    // Set flag to deny signIn if allowed org is not found in the user organizations
    if (!userOrgs.find((org) => org.login === serverEnv.GITHUB_ALLOWED_ORG)) {
      profile.notAllowed = true;
    }

    return profile;
  },
};
