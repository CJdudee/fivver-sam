'use server'

import Teacher from "@/models/Teacher"
import { simpleJson } from "@/utils/helpers"

export const getAllTeacher = async () => {

    const allTeachers = await Teacher.find().populate('user').exec()

    return simpleJson(allTeachers)
}