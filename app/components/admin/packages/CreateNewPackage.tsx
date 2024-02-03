import React from "react";

export default function CreateNewPackage({
  editPackage,
  setEditPackage,
  handleCreate,
}: any) {
  const priceArray = [
    {
      priceOne: editPackage.priceOne,
    },
    {
      priceTwo: editPackage.priceTwo,
    },
    {
      priceThree: editPackage.priceThree,
    },
  ];

  return (
    <div
      className="flex flex-col items-center justify-center gap-4 bg-slate-600 w-full md:w-[94%] lg:w-4/5 rounded-xl py-2"
      // key={editPackage.index}
    >
      <div className=" text-center flex flex-col gap-4 lg:flex-row w-full px-8">
        <div className="lg:w-1/2  flex justify-center gap-4 w-full">
          <label className="text-2xl md:w-fit">Name: </label>
          <div className=" md:w-fit text-center">

          <input
            className="text-black px-2 rounded-full font-bold text-lg  "
            value={editPackage.name}
            onChange={(e) =>
                setEditPackage((prev: any) => {
                    return { ...prev, name: e.target.value };
                })
            }
            />
            </div>
        </div>

        <div className="lg:w-1/2  flex justify-center items-center gap-4 w-full">
          <label className="text-2xl ">Classes: </label>
          <div className=" md:w-1/4 text-center">

          <input
            type="number"
            className="text-black px-2 rounded-full font-bold text-lg w-full"
            value={editPackage.tokens}
            onChange={(e) =>
                setEditPackage((prev: any) => {
                    return { ...prev, tokens: e.target.value };
                })
            }
            />
            </div>
        </div>
      </div>
      {/* <div>
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
      </div> */}

      <div className="flex flex-col items-center lg:flex-row w-full gap-4 lg:gap-0 px-8">
        {priceArray.map((p, i) => {
          console.log(p);

          const key = Object.keys(p);

          const value = key[0];

          // const flatKey = {...key}

          // console.log(key, flatKey)

          return (
            <div
              key={`${value} + ${i}`}
              className="md:w-1/3 flex flex-col items-center"
            >
              <label>
                Price For{" "}
                <span className=" font-bold">
                  {i == 0 ? "Individual" : `Group of ${i + 1}`}
                </span>{" "}
              </label>
              <input
                type="number"
                className="text-black px-2 rounded-full"
                value={editPackage[value].price}
                onChange={(e) =>
                  setEditPackage((prev: any) => {
                    return { ...prev, [value]: { price: e.target.value } };
                  })
                }
              />
            </div>
          );
        })}
      </div>

      {/* <div className="flex gap-4">
        <label>Individual</label>
        <input
          type="checkbox"
          checked={editPackage.individual}
          value={editPackage.individual}
          onChange={() => {
            setEditPackage((prev: any) => {
              return { ...prev, individual: !prev.individual };
            });
          }}
        />
      </div> */}
      {/* <p>
        {editPackage.individual ? "Single person package" : " Group package"}
      </p> */}
      <div className="  mx-auto rounded-2xl flex flex-col md:flex-row gap-3 w-full px-8 justify-center items-center">
        <button
          type="button"
          onClick={() => {
            // setEditPackage(null);
            // handleSave(p._id)
            handleCreate();
          }}
          className="bg-blue-400 rounded-full text-black w-1/2"
        >
          Create
        </button>
        <button
          type="button"
          onClick={() => {
            setEditPackage(null);
          }}
          className="bg-gray-400 rounded-full text-black w-1/2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
