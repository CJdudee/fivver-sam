import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import User from '@/models/User'
import { connectingMongoose } from "@/app/lib/connectMongo";



export async function POST(req: NextRequest, res: NextResponse) {

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
        return NextResponse.json("woo")
    } catch (err) {
        return NextResponse.json(err)
    }

}