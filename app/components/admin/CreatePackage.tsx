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
        <div className='justify-end flex relative w-1/2'>
            <button onClick={() => setEditPackage({individual: false, name: '', price: 0, priceOne: {price: ''}, priceTwo: {price: ''}, priceThree: {price: ''},  tokens: '', new: true})} className=' absolute right-0 text-2xl'>+</button>
        </div>
      
      {editPackage?.new == true && (
        <CreateNewPackage editPackage={editPackage} setEditPackage={setEditPackage} handleCreate={handleCreate} />
        )} 

      {packagesJson.map((p: any, i: number) => {
        if (editPackage?.index == i)
          return (
            <div
              className="flex flex-col items-center justify-center gap-4 bg-slate-400 w-1/2 rounded-xl py-2"
              key={editPackage.index}
            >
              <div>
                <label>Name: </label>
                <input
                  className="text-black px-2"
                  value={editPackage.name}
                  onChange={(e) =>
                    setEditPackage((prev: any) => {
                      return { ...prev, name: e.target.value };
                    })
                  }
                />
              </div>
              <div>
                <label>Price: </label>
                <input
                type="number"
                  className="text-black px-2"
                  value={editPackage.price}
                  onChange={(e) =>
                    setEditPackage((prev: any) => {
                      return { ...prev, price: e.target.value };
                    })
                  }
                />
              </div>
              
              <div>
                <label>Classes Gain: </label>
                <input
                    type="number"
                  className="text-black px-2"
                  value={editPackage.tokens}
                  onChange={(e) =>
                    setEditPackage((prev: any) => {
                      return { ...prev, tokens: e.target.value };
                    })
                  }
                />
              </div>
              <div className="flex gap-4">
                <label>Individual</label>
                <input type="checkbox" checked={editPackage.individual} value={editPackage.individual} onChange={() => {
                    setEditPackage((prev: any) => {
                        return {...prev, individual: !prev.individual}
                    })
                }} />
              </div>
              <p>{p.individual ? "Single person package" : " Group package"}</p>
              <div className="bg-purple-400 w-1/2 mx-auto rounded-2xl flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditPackage(null);
                  }}
                  className="w-full text-black"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // setEditPackage(null);
                    handleSave(p._id)
                  }}
                  className="w-full text-black"
                >
                  Save
                </button>
              </div>
            </div>
          );

        return (
          <div
            key={i}
            className="text-center bg-slate-400 w-1/2 rounded-xl py-2"
          >
            <p>Name: {p.name}</p>
            <p>Price: ${p.price}</p>
            <p>Classes gain: {p.tokens}</p>
            <p>{p.individual ? "Single person package" : " Group package"}</p>
            <div className="bg-purple-400 w-1/2 mx-auto rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  setEditPackage({ ...p, index: i });
                }}
                className="w-full text-black"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  // setEditPackage({ ...p, index: i });
                  handleDelete(p._id)
                }}
                className="w-full text-black"
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
