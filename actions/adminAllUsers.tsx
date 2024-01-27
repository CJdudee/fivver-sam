'use server'
import DisableUser from '@/models/DisableUser'
import { simpleJson } from '@/utils/helpers'

export const disableUser = async (userId: string) => {

    const foundDisableUser = await DisableUser.findOneAndDelete({userId})
    
    if(!foundDisableUser) {

        const disabledUser = await DisableUser.create({userId})
        return simpleJson(disabledUser)
    }

    // const deletedUser = await foundDisableUser

    return {data: simpleJson(foundDisableUser), msg: 'User is no longer disable'}
}

export const assignTeacherToUser = async (userId: string, teacherId: string) => {

    console.log(userId, teacherId)
}