'use server'

import ClosedDay from "@/models/ClosedDay"
import TeacherWeek from "@/models/TeacherWeek"

export const updateWorkDays = async(id: number, dayObject: any) => {

    const foundWorkDays = await TeacherWeek.findById(id)

    // console.log(dayObject)

    foundWorkDays.weekdays = dayObject

    await foundWorkDays.save()

    console.log(foundWorkDays)
}


export const closeTheDay = async(date: Date, teacherId: string)  => {

    if(!date) throw new Error('No Id')

    const createdDate = await ClosedDay.create({date, teacher: teacherId})
    console.log(createdDate)
    // return createdDate
    return JSON.parse(JSON.stringify(createdDate))

}
export const openTheDay = async(date: Date, teacherId: string)  => {

    if(!date) throw new Error('No Id')

    const deletedDate = await ClosedDay.findOneAndDelete({date, teacher: teacherId})
    console.log(deletedDate)
    return JSON.parse(JSON.stringify(deletedDate))
    

    

}