import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions = {
    providers: [
        Google({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_secret as string,
        }),
    ],
}

export default NextAuth(authOptions)