import CreateTeacher from '@/app/components/admin/CreateTeacher'
import { decodeUserAndCheckAdmin } from '@/app/lib/finallyRoleCheck'
import React from 'react'

export default async function page() {

  await decodeUserAndCheckAdmin()

  return (
    <div className=' min-h-[800px]  h-[92vh]'>
        <CreateTeacher/>
    </div>
  )
}
