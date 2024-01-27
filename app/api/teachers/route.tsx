import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import User from '@/models/User'
import { connectingMongoose } from "@/app/lib/connectMongo";
import Teacher from "@/models/Teacher";



export async function GET(req: NextRequest, res: NextResponse) {

    await connectingMongoose()

    const allTeachers = await Teacher.find().populate('user').exec()


    return NextResponse.json(allTeachers)
}