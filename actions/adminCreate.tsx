'use server'
import User from '@/models/User'
import bcrypt from 'bcrypt'

export const newUser = async(userData: any) => {

    console.log(userData)
    let {firstName, lastName, password, email, roles } = userData

    if(!firstName || !lastName || !password || !email) return {error: 'Names and password are required'}

    const lowerEmail = email.toLowerCase()


    const emailTaken = await User.findOne({email: lowerEmail})

    if(emailTaken) return {error: 'Email is already taken'}

    if(roles.length == 0) roles = undefined

    const hashedPwd = await bcrypt.hash(password, 10)

    // const userInfo = {
        
    // }

    if(email == "") {
        email = undefined
    }

    const createdUser = await User.create({
        firstName,
        lastName,
        password: hashedPwd,
        email: lowerEmail,
        roles
    })

    if(!createdUser) return null

    return `User ${createdUser.firstName} has been created`
}

export const newAdmin = async(userData: any) => {
    console.log(userData)
    let {firstName, lastName, password, email } = userData

    if(!firstName || !lastName || !password || !email) return {error: 'Username and password are required'}

    const lowerEmail = email.toLowerCase()

    const emailTaken = await User.findOne({email: lowerEmail})

    if(emailTaken) return {error: 'Email is already taken'}

    // if(roles.length == 0) roles = undefined

    const hashedPwd = await bcrypt.hash(password, 10)

    // const userInfo = {
        
    // }

    if(email == "") {
        email = undefined
    }

    const createdUser = await User.create({
        firstName,
        lastName,
        password: hashedPwd,
        email: lowerEmail,
        roles: ['admin']
    })

    if(!createdUser) return null

    return `Admin ${createdUser.firstName} has been created`
}