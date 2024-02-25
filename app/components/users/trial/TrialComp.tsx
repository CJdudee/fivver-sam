"use client";

import { makeTrialUser } from "@/actions/createTrialUser";
import { errorToast, susToast } from "@/app/lib/react-toast";
import { capitalize } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const initWeekDay = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};

const weekDayArray = [
  { name: "monday" },
  { name: "tuesday" },
  { name: "wednesday" },
  { name: "thursday" },
  { name: "friday" },
  { name: "saturday" },
  { name: "sunday" },
];

export default function TrialComp() {
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [weekDayState, setWeekDayState] = useState<any>(initWeekDay);

  const [descDay, setDescDay] = useState("");

  const [error, setError] = useState<null | string>();

  const [success, setSuccess] = useState<null | string>(null);

  const router = useRouter();

  const makeTrialAccount = async () => {
    if (!email || !username) return setError("Please fill all fields");

    if (success) return;

    const userData = {
      username,
      email,
    };

    const dateInfo = {
      weekArray: weekDayState,
      info: descDay,
    };

    const madeUser = await makeTrialUser(userData, dateInfo);

    if (!madeUser) return errorToast();

    if (madeUser.error) return errorToast(madeUser.error);

    susToast(madeUser.msg as string);
    setSuccess("Please Check your Email for your password");
    setError(null);
  };

  return (
    <div className="container mx-auto px-8 py-4">
      <h2 className="text-4xl font-bold text-center mb-8 text-orange-500">
        Sign Up for Your Trial
      </h2>
      {success && <p className="text-green-500 text-2xl mb-2">{success}</p>}
      <div className="bg-white rounded-lg shadow-md p-8 text-center relative ring-orange-500 ring-4 ring-offset-4 ring-offset-slate-200">
        <p className="text-lg font-bold mb-6 text-center md:w-1/2 mx-auto">
          Please provide the following information to start your trial. We'll
          use your email to contact you if needed.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-lg font-medium mb-2"
            >
              First Name
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="firstName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-orange-500  focus:ring-1"
            />
          </div>

          {/* Other input fields ... */}

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-orange-500  focus:ring-1"
            />
          </div>
        </div>

        <p className="font-semibold text-2xl mb-4">
          Please Choose days that fit your schedule
        </p>
        <ul className="grid grid-cols-2 gap-4">
          {weekDayArray.map((w) => (
            <li key={w.name} className="flex flex-col border-b-black border-b md:border-b-0 w-full pb-2 md:flex-row mx-auto gap-4 items-center justify-center">
              <p className="text-xl font-bold">{capitalize(w.name)}</p>
              <input
                type="checkbox"
                name={w.name}
                checked={weekDayState[w.name]}
                onChange={() => {
                  const result = !weekDayState[w.name];

                  console.log(result);

                  setWeekDayState((prev: any) => {
                    console.log(prev);
                    return { ...prev, [w.name]: result };
                  });
                }}
                className="md:ml-4 mt-1 accent-orange-300 " // Adjust margin and alignment
              />
            </li>
          ))}
        </ul>

        <div className="mt-4 mx-auto w-full md:w-2/3 py-4 rounded-xl">
          <p className="text-2xl font-semibold text-center mb-4">
            Please explain further, Times that you are available
          </p>

          <div className="flex flex-col md:flex-row gap-2 items-center justify-center mt-1 mx-auto mb-4 w-full">
            <p className="text-sm font-semibold">For example:</p>
            <q className="text-sm font-semibold">
              I am free in the morning and Wednesdays evenings
            </q>
          </div>

          <p className="text-sm font-semibold mb-2">
            This will help us book you classes
          </p>
          <textarea
            value={descDay}
            onChange={(e) => setDescDay(e.target.value)}
            className="w-full rounded-lg px-2 py-2 h-[200px] resize-none outline outline-1 focus:outline-orange-500  "
          />
        </div>
        <button
          className="w-1/2 bg-gradient-to-r from-[#D9643A] to-[#E35D5B] text-white hover:text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-500"
          onClick={() => makeTrialAccount()}
        >
          Save
        </button>
      </div>
    </div>
  );
}
