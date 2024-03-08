"use server";

import AdminSetting from "@/models/AdminSetting";
import Teacher from "@/models/Teacher";
import { simpleJson } from "@/utils/helpers";
import { Admin } from "mongodb";

export const applyNewTeacherSetting = async (
//   settingInfo: any,
  teacherInfo: any
) => {

    if(!teacherInfo._id) return 

    const foundTeacher = await Teacher.findById(teacherInfo._id).populate('user')

    if(!foundTeacher) return {error: 'Teacher was not found'}

    let foundSetting = await AdminSetting.findOne().populate({
        path: "teacher",
        populate: { path: "user" },
      })

      console.log(foundSetting)

    if(!foundSetting) {
        foundSetting = await AdminSetting.create({isDefault: true, teacher: foundTeacher._id})

        
    } else {
        foundSetting.teacher = foundTeacher._id
        if(!foundSetting) return 
        await foundSetting.save()
    }

    if(!foundSetting) return 

    foundSetting = await AdminSetting.findOne().populate({
        path: "teacher",
        populate: { path: "user" },
      })

    return {data: simpleJson(foundSetting), msg: `Default teacher ${foundTeacher.user.firstName} has been set`}


};

export const removeDefaultTeacher = async() => {

    const foundSetting = await AdminSetting.findOne()

    if(!foundSetting) return 

    if(!foundSetting.teacher) return { error: 'No teacher is assigned to removed' }

    foundSetting.teacher = null
    foundSetting.isDefault = false
    const saved = await foundSetting.save()

    return {data: simpleJson(saved), msg: 'Default Teacher has been removed'}
}

export const changeDefault = async() => {

    const foundSetting = await AdminSetting.findOne().populate({
        path: "teacher",
        populate: { path: "user" },
      })

    if(!foundSetting) return 

    if(!foundSetting.teacher) return {error: 'You have to assign a teacher first to turn on Default Teacher'}

    foundSetting.isDefault = !foundSetting.isDefault

    const saved = await foundSetting.save()

    return {data: simpleJson(saved), msg: `Default teachers has been ${saved.isDefault ? 'On' : 'Off'}`}
}
