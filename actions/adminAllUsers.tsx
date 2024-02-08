'use server'
import DisableUser from '@/models/DisableUser'
import { simpleJson } from '@/utils/helpers'
import AssignTeacher from '@/models/AssignTeacher'

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

    const alreadyAssigned = await AssignTeacher.findOne({user: userId})

    if(alreadyAssigned) {
        await AssignTeacher.deleteOne({user: userId})
    }

    const assigned = await AssignTeacher.create({user: userId, teacher: teacherId})

    if(!assigned) return null

    const foundAssigned = await AssignTeacher.find().populate({path: 'teacher', populate: {
        path: 'user'
      }}).exec()

    console.log(assigned)

    return {msg: `User has been assigned Teacher`, data: simpleJson(foundAssigned)}


    console.log(userId, teacherId)
}

export const removeTeacherFromUser = async(userId: string) => {

    const foundAssigned = await AssignTeacher.findOne({user: userId}).exec()

    if(!foundAssigned) return null

    const deletedAssigned = await AssignTeacher.deleteOne({ user: userId}).exec()

    if(!deletedAssigned) return null 

    console.log(deletedAssigned)

    return {msg: 'Teacher has been unassigned', data: userId}

}