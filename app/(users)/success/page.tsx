

import { getPack } from '@/actions/successPack'
import SuccessClient from '@/app/components/success/SuccessClient'
import Packages from '@/models/Packages'
import { simpleJson } from '@/utils/helpers'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {CgSpinner} from 'react-icons/cg'

export default function Page() {
    

    


    return (
        <main className='h-full min-h-[92vh]'>
            <SuccessClient />
        </main>
    )
}