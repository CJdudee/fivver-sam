import React from "react";

export default function CreateNewPackage({
  editPackage,
  setEditPackage,
  handleCreate,
  handleSave,
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

  // console.log(handleCreate)
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 pri w-full rounded-xl py-6 text-black "
      // key={editPackage.index}
    >
      <div className=" text-center flex flex-col gap-4 lg:flex-row w-full px-8 font-extrabold items-center">
        <div className=" flex flex-col md:flex-row justify-center md:gap-4 w-full md:w-1/2 ">
          <label className="text-2xl md:w-1/4">Name: </label>

          <input
            className="text-black text-center px-2 rounded-full font-bold text-lg md:w-2/4 bg-[#83838354]  "
            value={editPackage.name}
            onChange={(e) =>
              setEditPackage((prev: any) => {
                return { ...prev, name: e.target.value };
              })
            }
          />
        </div>

        <div className="md:w-1/2  flex flex-col md:flex-row justify-center items-center md:gap-4 w-full">
          <label className="text-2xl md:w-1/2 ">Classes: </label>
          
            <input
              type="number"
              className="text-black px-2 rounded-full font-bold text-lg w-full bg-[#83838354] text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={editPackage.tokens}
              onChange={(e) =>
                setEditPackage((prev: any) => {
                  return { ...prev, tokens: e.target.value };
                })
              }
            />
          
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

      <div className="flex flex-col  lg:flex-row w-full gap-4 lg:gap-0 items-center">
        {priceArray.map((p, i) => {
          console.log(p);

          const key = Object.keys(p);

          const value = key[0];

          // const flatKey = {...key}

          // console.log(key, flatKey)

          return (
            <div
              key={`${value} + ${i}`}
              className=" w-full md:w-1/3 flex flex-col items-center px-8"
            >
              <label className="text-2xl text-center"> 
                Price For{" "}
                <span className=" font-bold">
                  {i == 0 ? "Individual" : `Group of ${i + 1}`}
                </span>{" "}
              </label>
              <input
                type="number"
                className="text-black px-2 rounded-full text-xl w-full text-center font-bold bg-[#83838354] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

      
      <div className="  mx-auto rounded-2xl flex flex-col md:flex-row gap-3 w-full px-8 justify-center items-center font-bold mt-2">
        <button
          type="button"
          onClick={async () => {
            // setEditPackage(null);
            // handleSave(p._id)
            if (handleCreate) {
              handleCreate();
            } else {
              handleSave();
            }
            if (handleSave) {
            }
          }}
          className="outline outline-1 hover:outline-4 active:outline-4 transition-all duration-150 rounded-full text-black w-1/2"
        >
          {handleCreate && !handleSave ? "Create" : "Save"}
        </button>
        <button
          type="button"
          onClick={() => {
            setEditPackage(null);
          }}
          className="outline outline-1 hover:outline-4 active:outline-4 hover:outline-red-400 transition-all duration-150 rounded-full text-black w-1/2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
