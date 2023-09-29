import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma), 
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "email", type:"text"},
                password: {label: "password", type:"password"}
            },
            async authorize(credentials) {

                //check if email and password are not empty
                if(!credentials?.email ||!credentials?.password) {
                    throw new Error("Invalid credentials.");
                }

                // find the the unique user using the email
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                // if the user doesn't have no hashed password or doesnt exist
                if(!user || !user?.hashedPassword) {
                    throw new Error("Invalid credentials.");
                }

                //compare the password with the hashed password
                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

                // check if the password is correct
                if(!isCorrectPassword) {
                    throw new Error("Invalid credentials.");
                }

                return user;

            }
        }),
    ],
    pages: {
        signIn: "/", //redirects to this page if erorr occurs or other scenarios
    },
    //only debugs in development mode
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};


export default NextAuth(authOptions);