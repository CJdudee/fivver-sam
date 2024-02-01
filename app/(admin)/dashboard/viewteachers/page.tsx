import Teacher from '@/models/Teacher'
import { simpleJson } from '@/utils/helpers'
import React from 'react'

export default async function Page() {

    const teachers = await Teacher.find().populate('user')
    console.log(teachers)

    const teacherJson = simpleJson(teachers)
  return (
    <div className={`text-center text-white h-screen`}>
        <p className={`text-2xl `}>All Teachers:</p>
        {teacherJson.map((t: any, i: number) => {
            return (
                <div key={t._id}>
                    <p>{t.user.username}</p>
                </div>
            )
        })}
    </div>
  )
}
