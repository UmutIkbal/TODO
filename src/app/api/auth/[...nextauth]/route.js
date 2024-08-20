import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
require('dotenv')
import User from '@models/user';
import { connectToDB } from '@utils/database';


const handler = NextAuth({
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "credentails",

            credentials: {
                username: { label: "username", type: "text" },
                email: { label: "email", type: "text" },
                password: { label: "password", type: "text" },
                image: { label: 'image', type: 'text' || 'object' }
            },
            async authorize(credentials, req) {
                await connectToDB();
                console.log("im cred:", credentials)

                if (credentials == undefined) return

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Please enter an email and password");
                }

                const user = await User.findOne({ email: credentials.email })
                if (!user) { throw new Error("No user found"); }

                const passwordMatch = await bcrypt.compare(credentials.password, user.password);
                if (!passwordMatch) { throw new Error("Incorrect password"); }

                if (user) {
                    console.log(credentials)
                    return user
                }
                return null
            }
        })
    ],
    callbacks: {
        async session({ session }) {
            // store the user id from MongoDB to session
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ account, profile, user, credentials }) {
            try {
                await connectToDB();
                const userExists = await User.findOne({ email: profile.email });

                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.toLocaleLowerCase().replaceAll(" ", ""),
                        image: profile.picture,
                    });
                }


                return true
            } catch (error) {
                console.log(`Error checking if user exists: ${profile.name.toLocaleLowerCase().replaceAll(" ", "")}`, error.message);
                return false
            }
        },
    }
})

export { handler as GET, handler as POST }