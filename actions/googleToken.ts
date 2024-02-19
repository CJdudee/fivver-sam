"use server";

import Teacher from "@/models/Teacher";
import { google } from "googleapis";
import { oauth2 } from "googleapis/build/src/apis/oauth2";

const oauth2Client = new google.auth.OAuth2(
  process.env.AUTH_GOOGLE_ID,
  process.env.AUTH_GOOGLE_SECRET,
  "http://localhost:3000/teachers/dashboard"
);

const scopes = ["https://www.googleapis.com/auth/calendar"];

export const googleRefreshToken = async (teacherCode: string) => {

    const teacher = await Teacher.findOne({googleCode: teacherCode})

  let { tokens } = await oauth2Client.getToken(teacherCode);

  oauth2Client.setCredentials(tokens)

  teacher.googleToken = tokens
  await teacher.save()

  console.log(tokens);

  return tokens;
};

export const checkTokens = async (teacherId: string) => {

    const foundTeacher = await Teacher.findOne({user: teacherId})

    // let tokens = foundTeacher.googleToken

  const something = oauth2Client.on("tokens", (tokens) => {
    if (tokens.refresh_token) {
      // store the refresh_token in your secure persistent database
      console.log(tokens.refresh_token);
    }
    console.log(tokens.access_token);
  });

//   something()
};
