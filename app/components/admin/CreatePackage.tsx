"use client";

import React, { useEffect, useState } from "react";

export default function CreatePackage({ packagesJson }: any) {
  const [editPackage, setEditPackage] = useState<any>(null);

  useEffect(() => {
    console.log(editPackage);
  }, [editPackage]);

  return (
    <>
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
                <input type="checkbox" value={p.individual} onChange={() => {
                    setEditPackage((prev: any) => {
                        return {...prev, individual: !prev.individual}
                    })
                }} />
              </div>
              <p>{p.individual ? "Single person package" : " Group package"}</p>
              <div className="bg-purple-400 w-1/2 mx-auto rounded-2xl">
                <button
                  type="button"
                  onClick={() => {
                    setEditPackage(null);
                  }}
                  className="w-full text-black"
                >
                  Cancel
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
            </div>
          </div>
        );
      })}
    </>
  );
}
