import { capitalize } from '@/utils/helpers'
import React, { useState } from 'react'
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";



export default function SettingGroup({ setGroupSize, teacherName } : {
    setGroupSize: React.Dispatch<React.SetStateAction<number | null>>
    teacherName: string
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

  return (
    <div className=" md:px-40 pt-0 flex flex-col justify-center items-center md:my-40 gap-8 md:w-2/3 mx-auto text-black font-extrabold h-full md:h-1/2  ">
        <div className='bg-slate-100 w-full h-full rounded-xl drop-shadow-2xl shadow-2xl flex flex-col justify-start py-8 px-2'>
            <div className='flex justify-evenly w-full items-center'>
                <p className='w-1/2 text-center text-2xl'>You are Booking with</p>
                <p className='w-1/2 text-center text-3xl truncate underline'>{capitalize(teacherName)}</p>
            </div>

            <div className='text-center mt-4 text-3xl text-gray-800 flex justify-center gap-8'>
                <p>Set your group size</p>
                <p>{size}</p>
            </div>

            <div className='w-4/5 h-full bg-slate-800 mt-4 flex flex-col rounded-xl mx-auto'>
                <div className='h-4/5 w-full flex text-white'>
                        <div className='w-1/2 h-full flex items-center justify-center'>
                            <FaChalkboardTeacher className='w-1/2 h-1/2' />
                        </div>
                        <div className='w-1/2 h-full flex items-center justify-center relative'>
                            <IoPersonSharp className=' w-1/2 h-1/2 absolute' />
                            <IoPersonSharp className={` ${size != 1 && 'right-16 pt-4'} top-0 bottom-0 mx-auto right-0 left-0  my-auto transition-all duration-300 w-1/2 h-1/2  absolute`} />
                            <IoPersonSharp className={` ${size == 3 && 'left-16 pt-4'} top-0 bottom-0 mx-auto right-0 left-0  my-auto transition-all duration-300 w-1/2 h-1/2  absolute`} />
                        </div>

                </div>
                <div className='flex items-center w-full h-1/5 text-3xl'>
                    <button className='w-1/2 text-center text-white h-full flex items-center justify-center' onClick={() => {onGroupSizeChange('sub')}}>-</button>
                    <button className='w-1/2 text-center text-white h-full flex items-center justify-center' onClick={() => {onGroupSizeChange('add')}}>+</button>
                </div>
            </div>

            <div className='text-center mt-2'>
                <button className='w-1/3 bg-gray-800 text-white py-0.5 rounded-full' onClick={() => 
                setGroupSize(size)}>Confirm</button>
            </div>
        </div>
    </div>
  )
}
