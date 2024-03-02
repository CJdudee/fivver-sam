"use server";
import { sendTrialAccountEmail, sendTrialUserDataToMain, sendVerificationEmail } from "@/app/lib/mail";
import { generateVericationToken } from "@/data/tokens";
import User from "@/models/User";
import bcrypt from "bcrypt";
import TrialUser from "@/models/TrialUser";
import { simpleJson } from "@/utils/helpers";

export const makeTrialUser = async (userInfo: any, dateInfo: any) => {
  console.log(userInfo, dateInfo);

  if (!userInfo.firstName || !userInfo.lastName || !userInfo.email) return;
  if (!dateInfo.weekArray || !dateInfo.info) return;

  const { email, firstName, lastName } = userInfo;

  const { weekArray, info } = dateInfo;

  const randomPassword = crypto.randomUUID();

  const hashedPwd = await bcrypt.hash(randomPassword, 10);

  const checkEmail = await User.findOne({email})

  if(checkEmail) return {error: 'Email is Already Taken'}

  // try {
    const createdUser = await User.create({
      // username,
      email,
      firstName,
      lastName,
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

    await sendTrialAccountEmail(
      verficationToken.email,
      verficationToken.token,
      createdUser.username,
      randomPassword
    );

    return {
      msg: "Trial User has been Created. Check your Email for password",
      url: `${process.env.HOSTNAME}/api/auth/signin`,
    };
  // } catch (error) {
  //   return { error: simpleJson(error) };
  // }
};

export const makeTrialUserEmail = async (userInfo: any, dateInfo: any) => {
  console.log(userInfo, dateInfo);

  if (!userInfo.firstName || !userInfo.lastName || !userInfo.email) return {error: 'All fields are require'};
  if (!dateInfo.weekArray || !dateInfo.info) return {error: 'All fields are require'};

  const { email, firstName, lastName } = userInfo;

  const { weekArray, info } = dateInfo;


  // const testObj = Object.entries(weekArray).map(([key, value]) => {
  //   console.log(key, value, 'shit')
  //   return `<p> ${key} </p> <input type="checkbox" checked={${value}} />`
  // })

  // console.log(testObj.map((t: any) => t))
  
  

  const checkEmail = await User.findOne({email})

  if(checkEmail) return {error: 'Email is Already Taken'}


    await sendTrialUserDataToMain({email, firstName, lastName}, {weekArray, info})

    

    return {
      msg: "Trial User has been Created. Check your Email for password",
      url: `${process.env.HOSTNAME}/api/auth/signin`,
    };
  // } catch (error) {
  //   return { error: simpleJson(error) };
  // }
};
