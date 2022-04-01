import NextAuth from "next-auth";
import GitHub from 'next-auth/providers/github'

import { serverEnv } from '../../../env/server'

export default (req, res) =>
    NextAuth(req, res, {
        providers: [
            GitHub({
                clientId: process.env.GITHUB_ID,
                clientSecret: process.env.GITHUB_SECRET,
            }),
        ],
        debug: process.env.NODE_ENV === "development",
        secret: serverEnv.NEXTAUTH_SECRET,
        jwt: {
            secret: process.env.JWT_SECRET,
        },
        callbacks: {
            async redirect(url, baseUrl) {
                return "/";
                // return url;
            },
        },
    });
