import CreateTeacher from '@/app/components/admin/CreateTeacher'
import Teacher from '@/models/Teacher'
import Link from 'next/link'
import React from 'react'

export default async function Page() {

  const teachers = await Teacher.find().limit(2)
  console.log(teachers)

  return (
    <div className='text-center p-4 flex flex-col  gap-4 text-white'>

        <Link href={'/dashboard/create'} className='text-xl'>Make New Teacher</Link>
        <Link href={'/dashboard/viewteachers'} className='text-xl'>View All Teacher</Link>
        <Link href={'/dashboard/viewusers'} className='text-xl'>View All User</Link>
        <Link href={'/dashboard/changeprice'} className='text-xl'>Change Pricing</Link>
        {/* <CreateTeacher /> */}
    </div>
  )
}


//dash board could an absoulte design and will have to remove the navbar 

//this is gonnna have to be connected 

//lets focus on making teachers and there days off and daily routine (:)p)