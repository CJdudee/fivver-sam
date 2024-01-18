// import clientPromise from "@/app/context/mongodb";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// // import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// // import { NextAuthOptions } from "next-auth";
// import GoogleProvider from '@auth/core/providers/google'
// import Auth from '@auth/core'


// export const options = {

//     // trustHost: true,
//     adapter: MongoDBAdapter(clientPromise),

//     providers: [
//         GoogleProvider({
//             clientId: process.env.AUTH_GOOGLE_ID as string,
//             clientSecret: process.env.AUTH_GOOGLE_SECRET as string
//         })
//     ],

    

//     callbacks: {
//         async signIn({ account, profile }: any) {

//             console.log(account)
//             console.log(profile)

//             if(account?.provider === 'google') {
//                 return true
//                 // if(!profile) return false 
//                 // return profile.email_verified && profile.email.endsWith("@example.com")
//             }
//         },

//         async jwt({token, user, account, profile }: any) {
//             console.log(account)
//             console.log(profile)
//             console.log(token)
//             console.log(user)
//             console.log(account)
//             console.log(profile)
//             if (user) {
    
//                 token.role = user.roles
//                 token.id = user.id
//                 token.username = user.username
//             }
            
           
            
            
//             return token
//         },

//         async session({ session, user, token }: any) {
//             //console.log(token)
//             console.log(session)
//             console.log(user)
//             console.log(token)
//             if (session?.user) {
//                 session.user.role = token.role
//                 session.user.name = token.username as string ?? 'no name'
//                 session.user.id = token.id as string

//             }
            
            
//             //console.log(session)
//             return session
//         },
//     },
    
//     session: {
//         strategy: 'jwt'
//     },

//     debug: process.env.NODE_ENV === 'development',

//     secret: "this is a sercret"
// }