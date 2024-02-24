"use server";
import { sendTrialAccountEmail, sendVerificationEmail } from "@/app/lib/mail";
import { generateVericationToken } from "@/data/tokens";
import User from "@/models/User";
import bcrypt from "bcrypt";
import TrialUser from "@/models/TrialUser";

export const makeTrialUser = async (userInfo: any, dateInfo: any) => {
  console.log(userInfo, dateInfo);

  if (!userInfo.username || !userInfo.email) return;
  if (!dateInfo.weekArray || !dateInfo.info) return;

  const { username, email } = userInfo;

  const { weekArray, info } = dateInfo;

  const randomPassword = crypto.randomUUID();

  const hashedPwd = await bcrypt.hash(randomPassword, 10);

  const createdUser = await User.create({
    username,
    email,
    password: hashedPwd,
    trial: true,
  });

  if (!createdUser) return { error: "Failed to Create New User" };

  const createdTrial = await TrialUser.create({
    weekArray,
    info,
    user: createdUser._id,
  });

  if (!createdTrial) return { error: "Failed to Create Trail" };

  const verficationToken = await generateVericationToken(
    email,
    createdUser._id
  );

  if (!verficationToken) return;

  await sendTrialAccountEmail(verficationToken.email, verficationToken.token, createdUser.username, randomPassword);

  return {
    msg: "Trial User has been Created. Check your Email for password",
    url: `${process.env.HOSTNAME}/api/auth/signin`,
  };
};