import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./app/context/mongodb";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import email from "next-auth/providers/email";
import User from "./models/User";
import mongoose from "mongoose";
import Credentials from "next-auth/providers/credentials";
import _stripe from 'stripe'
import { connectingMongoose } from "./app/lib/connectMongo";
import bcrypt from 'bcrypt'
import DisableUser from "./models/DisableUser";

const stripe = new _stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16'
})

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
    update,
} = NextAuth({

    pages: {
        signIn: '/api/auth/signin',
        // newUser: ''  // New users will be directed here on first sign in (leave the property out if not of interest)
    },

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
                    emailVerified: null,
                    tokens: 0,
                    customerId: null,
                }
            }
        }),
        Credentials({
            name: 'credentials',
            credentials: {
                // username: { label: "Username"},
                email: { label: "Email"},
                password: { label: 'Password', type: 'password'}
            },
            async authorize(credentials) {

                // console.log(credentials)
                // const { username, password } = credentials
                const { email, password } = credentials

                if(!email || !password) return null

                await connectingMongoose()

                const foundUser = await User.findOne({ email })

                const isDisable = await DisableUser.findOne({userId: foundUser._id})

                if(isDisable) return null
                // console.log(foundUser, 'yoyo')

                if(!foundUser) throw new Error("User was not found")

                const rightPwd = await bcrypt.compare(password as string, foundUser.password)
                
                // console.log(rightPwd, 'hit')

                if(rightPwd) {
                    const user = {
                        id: foundUser._id,
                        roles: foundUser.roles,
                        username: foundUser.username,
                        tokens: foundUser.tokens,
                        customerId: foundUser.customerId
                    }

                    return user

                    // return {
                    //     id: foundUser._id,
                    //     roles: foundUser.roles,
                    //     username: foundUser.username,
                    //     tokens: foundUser.tokens,
                    //     customerId: foundUser.customerId
                    // }
                }
                // console.log(username, password)
                return null
            }
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

            // const createdCustomer = await stripe.customers.create({

            // })

            foundUser.emailVerified = new Date()
            await foundUser.save()
            // console.log(foundUser,' this is the found user')
        },
        async signIn({user, account, profile}) {
            await connectingMongoose()

            const foundUser = await User.findOne({_id: user.id})

            if(foundUser.customerId == null) {

                const createdCustomer = await stripe.customers.create({
                    // email: 'whatthe@yahoo.com',
                    metadata: {
                        customerId: `${foundUser._id}`
                    }
                })

                // console.log(createdCustomer,' this is the customerId ')
                foundUser.customerId = `${createdCustomer.id}`

                await foundUser.save()
            }

        }
    },

    callbacks: {
        async signIn({ account, user, profile}) {

            // console.log(account)
            // console.log(profile)
            // console.log(user, 'this is the what we are looking ata')
            // console.log(account, 'this is the what we are looking ata')
            // console.log(profile, 'this is the what we are looking ata 22')

            console.log(account, 'account')
            console.log(user, 'user')
            console.log(profile, 'profile')

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

            if(account?.provider === 'credentials') {
                return true
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
    
                token.roles = user.roles
                token.id = user.id
                token.username = user.username
                token.tokens = user.tokens
                token.customerId = user.customerId

            }
            
           
            
            
            return token
        },

        async session({ session, user, token }: any) {
            //console.log(token)
            // console.log(session)
            // console.log(user)
            // console.log(token)
            if (session?.user) {
                session.user.roles = token.roles
                session.user.name = token.username as string ?? 'no name'
                session.user.id = token.id as string
                session.user.tokens = token.tokens
                session.user.customerId = token.customerId

            }
            
            
            //console.log(session)
            return session
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },

    adapter: MongoDBAdapter(clientPromise, {collections: {
       
    }}),
    session: { strategy: 'jwt'},
    secret: 'what what',

    // redirectProxyUrl: 'http://localhost:3000'
    // ...authConfig
})