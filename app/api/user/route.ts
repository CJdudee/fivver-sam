import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { connectingMongoose } from "@/app/lib/connectMongo";
import { newUserEmail, sendVerificationEmail } from "@/app/lib/mail";
import AdminSetting from "@/models/AdminSetting";
import AssignTeacher from "@/models/AssignTeacher";
import { generateVericationToken } from "@/data/tokens";

export async function POST(req: NextRequest, res: NextResponse) {
  const origin = req.headers.get("origin");

  const data = await req.json();

  const { password, email, firstName, lastName } = data;

  console.log(data);

  // if(!username || !password && !email) return NextResponse.json("Every field is required")
  if (!password || !email || !firstName || !lastName)
    return NextResponse.json(
      { error: "Every field is required" },
      {
        status: 400,
      }
    );

  const lowerEmail: string = email.toLowerCase();

  await connectingMongoose();

  const isTaken = await User.findOne({ lowerEmail }).exec();

  if (isTaken) {
    console.log("hite");
    return NextResponse.json(
      { error: "Email Already taken" },
      {
        status: 400,
      }
    );
  }

  const newUserMailSent = await newUserEmail(firstName, lastName, email);

  let hashedPwd = null;

  if (password) {
    hashedPwd = await bcrypt.hash(password, 10);
  }

  let newData = null;

  if (hashedPwd) {
    newData = {
      // username,
      firstName,
      lastName,
      password: hashedPwd,
      email: lowerEmail,
    };
  } else {
    newData = {
      firstName,
      lastName,
      email: lowerEmail,
      // whatthefuck: 'yoooo'
    };
  }

  const adminSetting = await AdminSetting.findOne();

  // if(adminSetting.isDefault && adminSetting.teacher){
  //     // newData = {
  //     //     ...newData,

  //     // }
  // }

  try {
    const createdUser = await User.create(newData);
    console.log(createdUser);

    if (adminSetting.isDefault && adminSetting.teacher) {
      // newData = {
      //     ...newData,

      // }
      const assignTeacher = await AssignTeacher.create({
        teacher: adminSetting.teacher,
        user: createdUser._id,
      });
    }

    const vericationToken = await generateVericationToken(lowerEmail, createdUser._id);
    if (!vericationToken) return;

    // foundUser.emailVerified = null
    // foundUser.email = email

    await sendVerificationEmail(vericationToken.email, vericationToken.token);

    // return NextResponse.json("woo")

    return new NextResponse(JSON.stringify("woo"), {
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    // return NextResponse.json(err)
    return new NextResponse(JSON.stringify(err), {
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "application/json",
      },
    });
  }
}
