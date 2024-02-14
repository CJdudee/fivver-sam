'use server'
import User from '@/models/User'
import bcrypt from 'bcrypt'

export const newUser = async(userData: any) => {

    console.log(userData)
    let {username, password, email, roles } = userData

    if(!username || !password) return {error: 'Username and password are required'}

    if(roles.length == 0) roles = undefined

    const hashedPwd = await bcrypt.hash(password, 10)

    // const userInfo = {
        
    // }

    if(email == "") {
        email = undefined
    }

    const createdUser = await User.create({
        username,
        password: hashedPwd,
        email,
        roles
    })

    if(!createdUser) return null

    return `User ${createdUser.username} has been created`
}

export const newAdmin = async(userData: any) => {
    console.log(userData)
    let {username, password, email } = userData

    if(!username || !password) return {error: 'Username and password are required'}

    // if(roles.length == 0) roles = undefined

    const hashedPwd = await bcrypt.hash(password, 10)

    // const userInfo = {
        
    // }

    if(email == "") {
        email = undefined
    }

    const createdUser = await User.create({
        username,
        password: hashedPwd,
        email,
        roles: ['admin']
    })

    if(!createdUser) return null

    return `Admin ${createdUser.username} has been created`
}