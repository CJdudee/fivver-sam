'use client'

import { assignTeacherToUser, disableUser } from '@/actions/adminAllUsers'
import { getAllTeacher } from '@/actions/teacherQuery'
import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import 'react-select'
import AsyncSelect from 'react-select/async'

export default function ViewAllUsers({foundUserJson} : any) {
    const [msg, setMsg ] = useState('')
    const [turnDialog, setTurnDialog] = useState(false)
    const [idUser, setIdUser] = useState<any>(null)
    const [teacherId, setTeacherId] = useState<any>(null)
    const dialogRef = useRef< null | HTMLDialogElement>(null)
    const [asyncSearch, setAsyncSearch ] = useState('')

    useEffect(() => {
        if(!turnDialog) return dialogRef.current?.close() 

        dialogRef.current?.showModal();
    }, [turnDialog])

   

    const loadOptions =   async(searchValue: string, callback: any) =>  {

      // const filterTeachers = 'hey hey'

      // const allTeachers =  await getAllTeacher()
      const allTeachers =  await fetch('http://localhost:3000/api/teachers', {
        method: "GET"
      })

      const allTeachersJson = await allTeachers.json()
      console.log(allTeachersJson)

      const filterTeachers = await allTeachersJson.filter((option: any) => option.user.username.toLowerCase().includes(searchValue.toLowerCase()))

      console.log(filterTeachers)
      console.log('loaderoptions', searchValue, filterTeachers)

       callback(filterTeachers)
    }

    const handleDisable = async (userId: string) => {
        const result = await disableUser(userId)

        console.log(result)

        if(result.msg) {
            setMsg(result.msg)
        }
    }

    const handleAssignTeacher = async () => {
      // console.log(idUser, teacherId)

      if(!idUser || !teacherId || !teacherId._id) return 

      await assignTeacherToUser(idUser._id, teacherId._id)
    }

    const handleSelect = (selectedOption: any) => {
      console.log(selectedOption)
      console.log(selectedOption._id)
      setTeacherId(selectedOption)
    }

    const asssignTeacherDialog = turnDialog && (
      <dialog className=' w-2/3 h-1/2  bg-gray-700 text-white p-4 rounded-xl' ref={dialogRef}>
          <p>Asssign Teacher to {idUser?.username} </p>
          <button className=' absolute top-1 right-2 hover:text-red-400' onClick={() => {
              setTurnDialog(false)
          }}>Close</button>

          <div className=''>
              <AsyncSelect loadOptions={loadOptions as any} className='text-sm ' 
              
              // value={asyncSearch} onChange={(e) => setAsyncSearch(e.target.value)}
              // styles={{
              //   valueContainer: (styles) => ({...styles, color: '#000', backgroundColor: '#0000'}) 
              // }}
              getOptionLabel={(option) => option.user.username}
              getOptionValue={(option) => option.user.username}
              placeholder="Assign a Teacher"
              classNames={{
                clearIndicator: () => '',
                container: () => ' text-black font-bold ',
                control: () => '',
                dropdownIndicator: () => '',
                group: () => '',
                groupHeading: () => '',
                indicatorsContainer: () => '',
                indicatorSeparator: () => '',
                input: () => '',
                loadingIndicator: () => '',
                loadingMessage: () => '',
                menu: () => 'text-black  text-sm',
                menuList: () => '',
                menuPortal: () => '',
                multiValue: () => '',
                multiValueLabel: () => '',
                multiValueRemove: () => '',
                noOptionsMessage: () => ' text-sm',
                option: (styles) =>   `text-black hover:bg-amber-400  text-center py-2 `,
                placeholder: () => '',
                singleValue: () => ' text-black',
                valueContainer: () => '',
              }}
              onChange={handleSelect}
               />
          </div>
          <div className='h-1/2 flex justify-center items-end w-full  bg-slate-400'>
            {teacherId && <button className='px-2 bg-blue-400 rounded-full' onClick={handleAssignTeacher} >Assign Teacher to User</button>}
          </div>
      </dialog>
  )

  return (
    <>
        {asssignTeacherDialog}
        {foundUserJson.map((f: any, i: number) => {
        // console.log(f, "what the");
        if (!f.roles) return;
        return (
          <div key={i} className={`bg-slate-400 w-1/2 p-4 `}>
            <p className="mb-2.5">User: {f.username}</p>
            <div className="outline outline-1 w-1/2 mx-auto"  >
                <p>User Roles:</p>
              <ul className="flex justify-center gap-4">
                {f.roles.map((c: string, i: number) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
            <p>Tokens: {f.tokens}</p>
            <div className='flex gap-4 justify-center'>

            <button className='hover:text-red-300 w-1/2' onClick={() => {
                setTurnDialog(true)
                setIdUser(f)
            }}>Assign Teacher</button>
            <button className='hover:text-red-300 w-1/2' onClick={() => handleDisable(f._id)}>X</button>
            </div>
          </div>
        );
      })}
    </>
  )
}
