import VericationToken from '@/models/VerificationToken'

export const getVerificationTokenByEmail = async (email: string) => {


    const vericationToken = await VericationToken.findOne({email})

    if(!vericationToken) return null

    return vericationToken
}



export const getVerificationTokenByToken = async (token: string) => {


    const vericationToken = await VericationToken.findOne({token})

    if(!vericationToken) return null

    return vericationToken
}