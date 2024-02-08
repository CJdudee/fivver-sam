'use server'

import User from "@/models/User"
import bcrypt from 'bcrypt'
import Teacher from '@/models/Teacher'
import TeacherWeek from '@/models/TeacherWeek'

export const newTeacher = async(userData: any) => {

    console.log(userData)
    let {username, password, email, roles } = userData

    if(!username || !password) return {error: 'Username and password are required'}

    if(roles.length == 0) roles = undefined

    const hashedPwd = await bcrypt.hash(password, 10)

    // const userInfo = {
        
    // }

    const createdUser = await User.create({
        username,
        password: hashedPwd,
        email,
        roles
    })

    console.log(createdUser)

    const createdTeacher = await Teacher.create({
        user: createdUser._id
    })

    const createdWeekDays = await TeacherWeek.create({
        teacher: createdTeacher._id
    }) 

    console.log(createdTeacher)

    return `Teacher ${createdUser.username} has been made`
}