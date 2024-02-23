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
import { capitalize } from "@/utils/helpers";

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
      <div className="flex justify-end w-full mr-7">
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
          className="inline-flex items-center px-4 py-2 text-lg font-semibold text-white hover:text-black rounded-full hover:bg-gray-200 transition-all duration-150"
        >
          <span>+</span>
          <span className="ml-2">Add Package</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 px-4 mt-2 w-full">
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
              className="flex flex-col items-center rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 p-6 text-gray-800 shadow-md my-auto"
            >
              <div className="flex justify-between items-center text-xl font-bold mb-4 w-full">
                <h2 className="text-orange-600">{capitalize(p.name)}</h2>
                <p className="text-right">{p.tokens} Classes Gain</p>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-4 text-base font-semibold mb-2 w-full items-center">
                <div>
                  <span className="text-gray-700">Price One:</span>
                  <span className="font-bold text-blue-500">
                    € {p.priceOne.price}
                  </span>
                </div>
                <div>
                  <span className="text-gray-700">Price Two:</span>
                  <span className="font-bold text-blue-500">
                    € {p.priceTwo.price}
                  </span>
                </div>
                <div>
                  <span className="text-gray-700">Price Three:</span>
                  <span className="font-bold text-blue-500">
                    € {p.priceThree.price}
                  </span>
                </div>
              </div>
              <div className="flex justify-between w-1/2 gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setEditPackage({ ...p, index: i });
                  }}
                  className="inline-flex items-center px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none shadow-md font-medium transition"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDelete(p._id);
                  }}
                  className="inline-flex items-center px-4 py-2 text-white bg-red-600 rounded-full hover:bg-red-700 focus:ring-4 focus:ring-red-500 focus:outline-none shadow-md font-medium transition"
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

{
  /* <p>{p.individual ? "Single person package" : " Group package"}</p> */
}
// setEditPackage({ ...p, index: i });
