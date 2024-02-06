import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import User from '@/models/User'
import { connectingMongoose } from "@/app/lib/connectMongo";
import Teacher from "@/models/Teacher";



export async function GET(req: NextRequest, res: NextResponse) {
    const origin = req.headers.get('origin')

    // return new NextResponse(JSON.stringify("hello"), {
    //     headers: {
    //         'Access-Control-Allow-Origin': origin || '*',
    //         'Content-Type': 'application/json',
    //     }
    // })

    await connectingMongoose()

    const allTeachers = await Teacher.find().populate('user').exec()


    // return NextResponse.json(allTeachers)

    return new NextResponse(JSON.stringify(allTeachers), {
        headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Content-Type': 'application/json',
        }
    })
}