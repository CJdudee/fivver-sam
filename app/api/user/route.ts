import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import User from '@/models/User'
import { connectingMongoose } from "@/app/lib/connectMongo";
import { newUserEmail } from "@/app/lib/mail";



export async function POST(req: NextRequest, res: NextResponse) {

    const origin = req.headers.get('origin')

    const data = await req.json()

    const {password, email, firstName, lastName } = data

    console.log(data)

    // if(!username || !password && !email) return NextResponse.json("Every field is required")
    if (!password || !email || !firstName || !lastName) return NextResponse.json("Every field is required")

    const lowerEmail: string = email.toLowerCase()

    await connectingMongoose()

    const isTaken = await User.findOne({lowerEmail}).exec()

    if(isTaken) {
        console.log('hite')
        return NextResponse.json({error: 'Email Already taken'}, {
            status: 400
        })
    }

    const newUserMailSent = await newUserEmail(firstName, lastName, email)
    

    let hashedPwd = null


    if(password) {
        hashedPwd = await bcrypt.hash(password, 10)
    }

    let newData = null

    if(hashedPwd) {

         newData = {
            // username,
            firstName, 
            lastName,
            password: hashedPwd,
            email: lowerEmail,
        }
    } else {
        newData = {
            firstName, 
            lastName,
            email: lowerEmail,
            // whatthefuck: 'yoooo'
        }
    }

    try {
        const createdUser = await User.create(newData)
        console.log(createdUser)
        // return NextResponse.json("woo")

        return new NextResponse(JSON.stringify("woo"), {
            headers: {
                'Access-Control-Allow-Origin': origin || '*',
                'Content-Type': 'application/json',
            }
        })
    } catch (err) {
        // return NextResponse.json(err)
        return new NextResponse(JSON.stringify(err), {
            headers: {
                'Access-Control-Allow-Origin': origin || '*',
                'Content-Type': 'application/json',
            }
        })
    }

}