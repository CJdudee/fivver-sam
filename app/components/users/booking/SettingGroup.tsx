import { capitalize } from '@/utils/helpers'
import React, { useState } from 'react'
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";



export default function SettingGroup({ setGroupSize, teacherName, tokenGroup } : {
    setGroupSize: React.Dispatch<React.SetStateAction<number | null>>
    teacherName: string
    tokenGroup: any
}) {
    const [size, setSize] = useState(1)

    const onGroupSizeChange = (type: string) => {

        if(type == 'add') {
            if (size == 3) return 
            if(size > 3) return setSize(3)

            return setSize(size + 1)
        }
        if(type == 'sub') {
            if (size == 1) return 
            if(size < 1) return setSize(1)

            return setSize(size - 1)
        }
    }

    const buttonDis = tokenGroup[size - 1] == 0 || tokenGroup[size - 1] == undefined

    console.log(buttonDis)

  return (
    <div className=" pri rounded-xl pt-0 flex flex-col justify-center items-center gap-8 md:w-2/3 mx-auto text-black font-extrabold min-h-[500px] h-full md:h-1/2  ">
        <div className=' w-full h-full rounded-xl  flex flex-col justify-start py-8 px-2'>
            <div className='flex justify-evenly w-full items-center'>
                <p className='w-1/2 text-center text-2xl'>You are Booking with</p>
                <p className='w-1/2 text-center text-3xl truncate underline'>{capitalize(teacherName)}</p>
            </div>

            <div className='text-center mt-4 text-3xl text-gray-800 flex justify-center gap-8'>
                <p>Set your group size</p>
                <p>{size}</p>
            </div>

            <div className=' w-full md:w-4/5 h-full bg-slate-800 mt-4 flex flex-col rounded-xl mx-auto'>
                <div className='h-4/5 w-full flex text-white'>
                        <div className='w-1/2 h-full flex items-center justify-center'>
                            <FaChalkboardTeacher className='w-1/2 h-1/2' />
                        </div>
                        <div className='w-1/2 h-full flex items-center justify-center relative overflow-hidden  '>
                            <IoPersonSharp className=' h-1/2 w-1/2    ' />
                            <IoPersonSharp className={` ${size != 1 && 'left-14 md:left-24 pt-4'}   right-0 left-0 mx-auto   transition-all duration-300 w-2/3 h-2/3  absolute`} />
                            <IoPersonSharp className={` ${size == 3 && 'right-14 md:right-24 pt-4'} top-0 bottom-0 mx-auto right-0 left-0  my-auto transition-all duration-300 w-2/3 h-2/3  absolute`} />
                        </div>

                </div>
                <div className='flex items-center w-full h-1/5 text-3xl'>
                    <button className=' bg-slate-400  rounded-tr-xl w-1/2 text-center text-white h-full flex items-center justify-center' onClick={() => {onGroupSizeChange('sub')}}>-</button>
                    <button className='bg-slate-500 rounded-tl-xl w-1/2 text-center text-white h-full flex items-center justify-center' onClick={() => {onGroupSizeChange('add')}}>+</button>
                </div>
            </div>

            <div className='text-center mt-8'>
                <button className='w-1/3 outline outline-1 hover:outline-4 transition-all duration-150  py-0.5 rounded-full text-black outline-black' disabled={buttonDis} onClick={() => 
                setGroupSize(size)}>Confirm</button>
            </div>
        </div>
    </div>
  )
}
