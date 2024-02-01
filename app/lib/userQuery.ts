import User from "@/models/User"


export const getUserByEmail = async(email: string) => {

    const foundUser = await User.findOne({email})

    return foundUser
}

export const getUserById = async(id: string) => {

    const foundUser = await User.findById(id)

    return foundUser
}