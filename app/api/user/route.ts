import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import User from '@/models/User'
import { connectingMongoose } from "@/app/lib/connectMongo";



export async function POST(req: NextRequest, res: NextResponse) {

    const origin = req.headers.get('origin')

    const data = await req.json()

    const {username, password, email, firstName, lastName } = data

    console.log(data)

    // if(!username || !password && !email) return NextResponse.json("Every field is required")
    if (!password || !email || !firstName || !lastName) return NextResponse.json("Every field is required")
    await connectingMongoose()

    const isTaken = await User.findOne({email}).exec()

    if(isTaken) {
        console.log('hite')
        return NextResponse.json({error: 'Email Already taken'}, {
            status: 400
        })
    }

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
            email,
        }
    } else {
        newData = {
            username, 
            email,
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