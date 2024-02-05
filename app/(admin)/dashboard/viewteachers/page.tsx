import Teacher from '@/models/Teacher'
import { simpleJson } from '@/utils/helpers'
import React from 'react'

export default async function Page() {

    const teachers = await Teacher.find().populate('user')
    console.log(teachers)

    const teacherJson = simpleJson(teachers)
  return (
    <div className={`text-center text-white h-screen px-4`}>
        <p className={`text-2xl `}>All Teachers:</p>
        {teacherJson.map((t: any, i: number) => {
            return (
                <div key={t._id} className='w-full text-xl mt-4 outline outline-1 outline-black py-2 rounded-xl'>
                    <div className='flex mb-2'>

                    <p className='w-1/2'>Name:</p>
                    <p className='w-1/2'>{t.user.username}</p>
                        </div>
                    <div className='md:flex'>
                    <p>Total orders {t.orders}</p>
                    <p>Current orders {t.currentOrders}</p>
                    <p>CanceledOrders {t.canceledOrders}</p>
                    </div>
                </div>
            )
        })}
    </div>
  )
}
