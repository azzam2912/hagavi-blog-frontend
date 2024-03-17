import { prisma } from '../lib/prisma';
import { session } from '../lib/session';
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!
const SECRET = process.env.NEXTAUTH_SECRET!

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: SECRET,
    callbacks: {
        async signIn({ account, profile }) {
            if(!profile?.email) {
                throw new Error('No Profile')
            }

            await prisma.user.upsert({
                where: {
                    email: profile.email
                },
                create: {
                    email: profile.email,
                    name: profile.name,
                },
                update: {
                    name: profile.name,
                },
            })
            return true
        },
        session,
        async jwt({ token, user, account, profile }) {
            if (profile) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: profile.email,
                    },
                })
                if (!user) {
                    throw new Error("User doesn't exist")
                }
                token = user
            }
            return token
        }
    }
}