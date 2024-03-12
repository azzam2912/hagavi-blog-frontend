import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
  }
});

// const prisma = new PrismaClient()

// export default NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//       clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
//     }),
//   ],
// })

// export const options = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "email:",
//           type: "text",
//         },
//         password: {
//           label: "password:",
//           type: "password",
//         },
//       },
//       async authorize(credentials) {
//         try {
//           const user = await prisma.user.findUnique({
//             where: {
//               email: credentials.email,
//             },
//           });

//           if (!user || !user?.hashedPassword) {
//             throw new Error("Invalid credentials");
//           }

//           const isCorrectPassword = await bcrypt.compare(
//             credentials.password,
//             user.hashedPassword
//           );

//           if (!isCorrectPassword) {
//             throw new Error("Invalid credentials");
//           }
//           return { ...user, password: null, role: user.role };
//         } catch (error) {
//           console.log(error);
//         }
//         return null;
//       },
//     }),
//   ],
//   secret: process.env.SECRET,
//   debug: process.env.NODE_ENV === "development",
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.role = user.role;
//       return token;
//     },
//     async session({ session, token }) {
//       if (session?.user) session.user.role = token.role;
//       return session;
//     },
//   },
// };