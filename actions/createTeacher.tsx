'use server'

import User from "@/models/User"
import bcrypt from 'bcrypt'
import Teacher from '@/models/Teacher'
import TeacherWeek from '@/models/TeacherWeek'

export const newTeacher = async(userData: any) => {

    // console.log(userData)
    let {firstName, lastName, password, email, roles } = userData

    if(!firstName || !lastName || !password || !email) return {error: 'Username and password are required'}

    const lowerEmail = email.toLowerCase()

    const emailTaken = await User.findOne({email: lowerEmail})

    if(emailTaken) return {error: 'Email is already taken'}

    if(roles.length == 0) roles = undefined

    const hashedPwd = await bcrypt.hash(password, 10)

    if(email == "") {
        email = undefined
    }

    // const userInfo = {
        
    // }

    const createdUser = await User.create({
        firstName,
        lastName,
        password: hashedPwd,
        email: lowerEmail,
        roles: ['teacher']
    })

    console.log(createdUser)

    const createdTeacher = await Teacher.create({
        user: createdUser._id
    })

    const createdWeekDays = await TeacherWeek.create({
        teacher: createdTeacher._id
    }) 

    console.log(createdTeacher)

    return `Teacher ${createdUser.firstName} has been made`
}