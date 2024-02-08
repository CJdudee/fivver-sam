"use client";

import {
  createPackage,
  deletePackage,
  savePackage,
} from "@/actions/getPackages";
import React, { useEffect, useState } from "react";
import CreateNewPackage from "./packages/CreateNewPackage";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { errorToast, susToast } from "@/app/lib/react-toast";

export default function CreatePackage({ packages }: any) {
  const [packagesJson, setPackagesJson] = useState(packages);
  const [editPackage, setEditPackage] = useState<any>(null);

  const handleSave = async (packageId: string) => {
    const saved = await savePackage(editPackage);

    if (!saved) return errorToast();

    const copy = [...packagesJson];

    copy[saved.data.index] = saved.data;
    // const found = copy.find((c) => {
    //   return c._id == saved._id
    // })

    // found = saved
    setEditPackage(null);
    setPackagesJson(copy);
    // packagesJson = null

    susToast(saved.msg);

    console.log(saved);
  };

  const handleCreate = async () => {
    const created = await createPackage(editPackage);
    console.log(created);

    if (!created) return errorToast();

    setPackagesJson((prev: any) => {
      return [...prev, created.data];
    });
    setEditPackage(null);

    susToast(created.msg);
  };

  const handleDelete = async (id: string) => {
    const deleted = await deletePackage(id);

    if (!deleted) return errorToast();

    console.log(deleted);

    let copy = [...packagesJson];

    copy = copy.filter((e) => e._id != deleted.data._id);

    console.log(copy);

    setPackagesJson(copy);
    setEditPackage(null);

    susToast(deleted.msg);
  };

  useEffect(() => {
    console.log(editPackage);
  }, [editPackage]);

  return (
    <>
      <div className="justify-end flex relative w-full mr-7 ">
        <button
          onClick={() =>
            setEditPackage({
              individual: false,
              name: "",
              price: 0,
              priceOne: { price: "" },
              priceTwo: { price: "" },
              priceThree: { price: "" },
              tokens: "",
              new: true,
            })
          }
          className=" absolute right-0 text-2xl"
        >
          +
        </button>
      </div>

      <div className="flex flex-col xl:grid grid-cols-2 w-full gap-8 px-4">
        {editPackage?.new == true && (
          <CreateNewPackage
            editPackage={editPackage}
            setEditPackage={setEditPackage}
            handleCreate={handleCreate}
          />
        )}

        {packagesJson.map((p: any, i: number) => {
          if (editPackage?.index == i)
            return (
              <CreateNewPackage
                editPackage={editPackage}
                setEditPackage={setEditPackage}
                handleSave={handleSave}
              />
            );

          return (
            <div
              key={i}
              className="text-center pri w-full rounded-xl py-2 text-black my-auto"
            >
              <div className=" md:flex justify-evenly text-3xl font-extrabold mb-6">
                <p className="md:w-1/2">Name: {p.name}</p>
                <p className="md:w-1/2">Classes gain: {p.tokens}</p>
              </div>
              <div className="text-center md:flex text-xl justify-evenly mb-6 font-semibold ">
                <p className="md:w-1/3">
                  Price one:{" "}
                  <span className="font-extrabold">${p.priceOne.price}</span>
                </p>
                <p className="md:w-1/3">
                  Price two:{" "}
                  <span className="font-extrabold">${p.priceTwo.price}</span>
                </p>
                <p className="md:w-1/3">
                  Price three:{" "}
                  <span className="font-extrabold">${p.priceThree.price}</span>
                </p>
              </div>
              {/* <p>{p.individual ? "Single person package" : " Group package"}</p> */}
              <div className=" w-1/2 mx-auto rounded-2xl flex flex-row gap-2 md:gap-8">
                <button
                  type="button"
                  onClick={() => {
                    setEditPackage({ ...p, index: i });
                  }}
                  className="w-full text-black outline outline-1 rounded-full py-0.5 font-bold transition-all hover:outline-4 duration-150 active:outline-4 hover:shadow-md"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // setEditPackage({ ...p, index: i });
                    handleDelete(p._id);
                  }}
                  className="w-full text-black outline outline-1 rounded-full py-0.5 font-bold transition-all hover:outline-4 duration-150 active:outline-4 hover:shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
