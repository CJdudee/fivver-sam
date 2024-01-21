import CreateTeacher from '@/app/components/admin/CreateTeacher'
import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <div>

        <Link href={'/dashboard/create'}>Make New Teacher</Link>
        {/* <CreateTeacher /> */}
    </div>
  )
}


//dash board could an absoulte design and will have to remove the navbar 

//this is gonnna have to be connected 

//lets focus on making teachers and there days off and daily routine (:)p)