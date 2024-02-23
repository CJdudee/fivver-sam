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
      <h2 className="text-2xl font-semibold text-center ">
        {editPackage.new ? "Create Package" : "Update Package"}
      </h2>

      <div className="flex justify-between w-full gap-4 px-8">
        <div className="flex flex-col">
          <label className="text-black font-bold mb-2">Name:</label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-sky-500 focus:ring-2"
            value={editPackage.name}
            onChange={(e) =>
              setEditPackage({ ...editPackage, name: e.target.value })
            }
            placeholder="Enter package name"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-black font-bold mb-2">Classes:</label>
          <input
            type="number"
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-sky-500 focus:ring-2"
            value={editPackage.tokens}
            onChange={(e) =>
              setEditPackage({ ...editPackage, tokens: e.target.value })
            }
            placeholder="Enter number of classes gained"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center mt-4">
        {priceArray.map((p, i) => {
          console.log(p);

          const key = Object.keys(p);

          const value = key[0];

          // const flatKey = {...key}

          // console.log(key, flatKey)

          return (
            <div
              key={`${value} + ${i}`}
              className=" flex flex-col items-center px-8 w-full md:w-1/3"
            >
              <label className="text-black font-bold mb-2">
                Price For{" "}
                <span className=" font-bold">
                  {i == 0 ? "Individual" : `Group of ${i + 1}`}
                </span>{" "}
              </label>
              <div className="flex items-center gap-2">
                <span className="text-blue-500 font-bold">€</span>
                <input
                  type="number"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-sky-500 focus:ring-2"
                  value={editPackage[value].price}
                  onChange={(e) =>
                    setEditPackage((prev: any) => {
                      return { ...prev, [value]: { price: e.target.value } };
                    })
                  }
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between w-1/2 mx-auto px-8 mt-4">
        <button
          type="button"
          onClick={() => {
            if (handleCreate) {
              handleCreate();
            } else {
              handleSave();
            }
          }}
          className="bg-blue-500 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center mr-4 disabled:opacity-50"
        >
          {handleCreate && !handleSave ? "Create" : "Save"}
        </button>

        <button
          type="button"
          onClick={() => setEditPackage(null)}
          className="bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 text-center disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

{
  /* <div>
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
      </div> */
}
