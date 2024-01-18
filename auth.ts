import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./app/context/mongodb";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import email from "next-auth/providers/email";
import User from "./models/User";
import mongoose from "mongoose";
import Credentials from "next-auth/providers/credentials";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
    update,
} = NextAuth({

    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            // profile(profile) {
            //     console.log(profile)
            //     // return {  ...profile}
            //     return profile
            // }
            profile(profile: GoogleProfile) {
                // console.log(profile)
                return {
                    id: profile.sub,
                    username: profile.name,
                    email: profile.email,
                    roles: ["user"],
                    emailVerified: null
                }
            }
        }),
        Credentials({

        })
    ],
    
    events: {
        async linkAccount({ user, account, profile }) {
            // console.log(user, 'let see this hoe')
            // user.emailVerified = new Date()
            // const client =  await clientPromise
            // const usersCollection = client.db().collection('users')
            // const foundUser = await usersCollection.find({_id: user.id})
            // console.log(foundUser, user,  'this is the userssssdfljks dlkf')

            // if(!user.id) return 

            // const foundUser =  await MongoDBAdapter(clientPromise).getUser(user.id)
            // foundUser.emailVerified = new Date()
            
            // console.log(foundUser, 'this should be the found user')
            // await MongoDBAdapter(clientPromise).createUser(user)
            // user.emailVerified = new Date()

            await mongoose.connect(process.env.MONGO_URI as string)

            const foundUser = await User.findOne({_id: user.id})

            foundUser.emailVerified = new Date()
            await foundUser.save()
            // console.log(foundUser,' this is the found user')
        }
    },

    callbacks: {
        async signIn({ account, user, profile}) {

            // console.log(account)
            // console.log(profile)
            // console.log(user, 'this is the what we are looking ata')
            // console.log(account, 'this is the what we are looking ata')
            // console.log(profile, 'this is the what we are looking ata 22')

            if(account?.provider === 'google') {

                // const res = await fetch("http://localhost:3000/api/user", {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json"
                //     },
                //     body: JSON.stringify({
                //         username: user.name,
                //         email: user.email
                //     })
                // })

                // if(!res.ok) return false

                return true
                // if(!profile) return false 
                // return profile.email_verified && profile.email.endsWith("@example.com")
            }
            
            return false
        },

        async jwt({token, user, account, profile, session }: any) {
            // console.log(account)
            // console.log(profile)
            // console.log(token)
            // console.log(user)
            // console.log(account)
            // console.log(profile)
            if (user) {
    
                token.role = user.roles
                token.id = user.id
                token.username = user.username
            }
            
           
            
            
            return token
        },

        async session({ session, user, token }: any) {
            //console.log(token)
            // console.log(session)
            // console.log(user)
            // console.log(token)
            if (session?.user) {
                session.user.role = token.role
                session.user.name = token.username as string ?? 'no name'
                session.user.id = token.id as string

            }
            
            
            //console.log(session)
            return session
        },
    },

    adapter: MongoDBAdapter(clientPromise, {collections: {
       
    }}),
    session: { strategy: 'jwt'},
    secret: 'what what',
    // ...authConfig
})