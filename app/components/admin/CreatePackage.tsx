"use client";

import { createPackage, deletePackage, savePackage } from "@/actions/getPackages";
import React, { useEffect, useState } from "react";
import CreateNewPackage from "./packages/CreateNewPackage";

export default function CreatePackage({ packages }: any) {
  const [packagesJson, setPackagesJson ] = useState(packages)
  const [editPackage, setEditPackage] = useState<any>(null);

  const handleSave = async(packageId: string) => {
    const saved = await savePackage(editPackage)

    if(!saved) return null

    const copy = [...packagesJson]


    copy[saved.index] = saved
    // const found = copy.find((c) => {
    //   return c._id == saved._id
    // })

    // found = saved
    setEditPackage(null)
    setPackagesJson(copy)
    // packagesJson = null

    console.log(saved)
  }

  const  handleCreate = async() => {
    const created = await createPackage(editPackage)
    console.log(created)

    setPackagesJson((prev: any) => {
      return [...prev, created]
    })
    setEditPackage(null)
  }

  const handleDelete = async(id: string) => {
    const deleted = await deletePackage(id)

    console.log(deleted)

    let copy = [...packagesJson]

    copy = copy.filter((e) => e._id != deleted._id)

    console.log(copy)

    setPackagesJson(copy)
    setEditPackage(null)
  }

  useEffect(() => {
    console.log(editPackage);
  }, [editPackage]);

  return (
    <>
        <div className='justify-end flex relative w-full md:w-1/2'>
            <button onClick={() => setEditPackage({individual: false, name: '', price: 0, priceOne: {price: ''}, priceTwo: {price: ''}, priceThree: {price: ''},  tokens: '', new: true})} className=' absolute right-0 text-2xl'>+</button>
        </div>
      
      {editPackage?.new == true && (
        <CreateNewPackage editPackage={editPackage} setEditPackage={setEditPackage} handleCreate={handleCreate} />
        )} 

      {packagesJson.map((p: any, i: number) => {
        if (editPackage?.index == i)
          return (
            <CreateNewPackage editPackage={editPackage} setEditPackage={setEditPackage} handleSave={handleSave} />
          );

        return (
          <div
            key={i}
            className="text-center bg-slate-400 w-full md:w-1/2 rounded-xl py-2"
          >
            <div className="md:flex justify-evenly text-3xl">

            <p>Name: {p.name}</p>
            <p>Classes gain: {p.tokens}</p>
            </div>
            <div className="md:flex text-xl justify-evenly ">

            <p>Price one: ${p.priceOne.price}</p>
            <p>Price two: ${p.priceTwo.price}</p>
            <p>Price three: ${p.priceThree.price}</p>
            </div>
            {/* <p>{p.individual ? "Single person package" : " Group package"}</p> */}
            <div className=" w-1/2 mx-auto rounded-2xl flex flex-col gap-1">
              <button
                type="button"
                onClick={() => {
                  setEditPackage({ ...p, index: i });
                }}
                className="w-full text-black bg-purple-400 rounded-full"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  // setEditPackage({ ...p, index: i });
                  handleDelete(p._id)
                }}
                className="w-full text-black bg-purple-400 rounded-full"
              >
                delete
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
