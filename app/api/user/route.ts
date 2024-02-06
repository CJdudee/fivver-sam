import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import User from '@/models/User'
import { connectingMongoose } from "@/app/lib/connectMongo";



export async function POST(req: NextRequest, res: NextResponse) {

    const origin = req.headers.get('origin')

    const data = await req.json()

    const {username, password, email } = data

    if(!username || !password && !email) return NextResponse.json("Every field is required")

    let hashedPwd = null

    await connectingMongoose()

    if(password) {
        hashedPwd = await bcrypt.hash(password, 10)
    }

    let newData = null

    if(hashedPwd) {

         newData = {
            username,
            password: hashedPwd
        }
    } else {
        newData = {
            username, 
            email,
            // whatthefuck: 'yoooo'
        }
    }

    try {
        await User.create(newData)
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