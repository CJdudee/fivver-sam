import {v4 as uuid} from 'uuid'
import { getVerificationTokenByEmail } from './verificationToken'
import VerificationToken from '@/models/VerificationToken'

export const generateVericationToken = async( email: string, userId: string) => {


    const token = uuid()

    const expires = new Date(new Date().getTime() + 15 * 60 * 1000)


    const existingToken = await  getVerificationTokenByEmail(email)


    if(existingToken) {
        await VerificationToken.findByIdAndDelete(existingToken._id)
    }

    const verficationToken = await VerificationToken.create({
        token,
        expires,
        email,
        user: userId
    })


    return verficationToken
}