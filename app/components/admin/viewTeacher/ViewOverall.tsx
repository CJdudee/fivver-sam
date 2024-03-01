"use client";
import {
  addGoogleLink,
  markMonthlyOrder,
  removeGoogleLink,
} from "@/actions/monthlyOrder";
import { errorToast, susToast } from "@/app/lib/react-toast";
import { capitalize } from "@/utils/helpers";
import { addMonths, formatDate, parse, subMonths } from "date-fns";
import { cookies, headers } from "next/dist/client/components/headers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";
import { IoArrowDownSharp } from "react-icons/io5";

export default function ViewOverall({
  teacherJson,
  foundMonthJson,
  format,
}: any) {
  // const _headers = headers()
  // const _cookies = cookies()
  const [teacherArray, setTeacherArray] = useState(teacherJson);

  const [monthly, setMonthly] = useState(foundMonthJson);
  const [tab, setTab] = useState("");
  const [date, setDate] = useState(format);

  const [isAddingLink, setIsAddingLink] = useState<number | null>(null);
  const [googleLinkString, setGoogleLinkString] = useState<string | null>(null);

  const todaySplit = format.split("/");

  const router = useRouter();

  console.log(todaySplit, Number(todaySplit[0]), Number(todaySplit[1]));

  const handleDateChange = (type: string) => {
    if (type == "sub") {
      const parsed = parse(date, "MM/yy", new Date());

      const sub = subMonths(parsed, 1);

      const newFormat = formatDate(sub, "MM/yy");

      //   console.log(newFormat);
      setDate(newFormat);
    }
    if (type == "add") {
      const parsed = parse(date, "MM/yy", new Date());

      const sub = addMonths(parsed, 1);

      const newFormat = formatDate(sub, "MM/yy");

      //   console.log(newFormat);
      setDate(newFormat);
    }
    if (type == "today") {
      const newFormat = formatDate(new Date(), "MM/yy");

      //   console.log(newFormat);
      setDate(newFormat);
    }
  };

  const monthFilter = monthly.filter((f: any) => {
    if (date == f.date) return true;

    return false;
  });

  const handlePaidMonth = async (monthId: string, index: number) => {
    if (!monthId) return;

    const marked = await markMonthlyOrder(monthId);

    if (!marked) return errorToast();

    const monthCopy = [...monthly];

    const foundIndex = monthCopy.findIndex((m: any) => m._id === monthId);

    console.log(monthCopy, foundIndex);

    monthCopy[foundIndex] = marked.data;

    console.log(monthCopy, "you");

    setMonthly(monthCopy);

    susToast(marked.msg);
  };

  const handleAssignLink = async (teacherId: string) => {
    if (!teacherId || !googleLinkString) return;

    const assigningLink = await addGoogleLink(teacherId, googleLinkString);

    if (!assigningLink) return errorToast();

    setTeacherArray((prev: any) => {
      return prev.map((p: any) => {
        if (p._id == teacherId) {
          return assigningLink.data;
        } else {
          return p;
        }
      });
    });

    susToast(assigningLink.msg as string);

    setIsAddingLink(null);
    setGoogleLinkString(null);
    // window.location.reload();
  };

  const handleRemoveGoogleLink = async (teacherId: string) => {
    if (!teacherId) return;

    const removedLink = await removeGoogleLink(teacherId);

    if (!removedLink) return;

    setTeacherArray((prev: any) => {
      return prev.map((p: any) => {
        if (p._id == teacherId) {
          return removedLink.data;
        } else {
          return p;
        }
      });
    });

    susToast(removedLink.msg as string);

    // window.location.reload();
  };

  console.log(monthly);

  const allTeachersJsx = (
    <>
      <p className={`text-2xl mt-4 text-white font-extrabold mb-4`}>
        All Teachers
      </p>
      <div className=" flex flex-col gap-4 xl:grid grid-cols-2 mt-2">
        {teacherArray.map((t: any, i: number) => (
          <div
            key={t._id}
            className="rounded-md p-4  bg-gray-50 shadow-2xl drop-shadow-xl outline outline-2 outline-orange-500 text-black h-full flex flex-col items-center justify-center"
          >
            <div className=" w-full  ">
              <div className="flex flex-col justify-between items-center ">
                <div className="flex flex-col  mx-auto justify-between items-center w-full px-8 my-4">
                  <div className="flex flex-col md:flex-row w-full mx-auto justify-between items-center md:mb-4">
                    <div className="mb-2 flex gap-2">
                      <p className="text-black font-bold text-xl">
                        First Name:
                      </p>
                      <p className="text-xl font-semibold">
                        {capitalize(t.user.firstName)}
                      </p>
                    </div>
                    <div className="mb-2 flex gap-2">
                      <p className="text-black font-bold text-xl">Surname:</p>
                      <p className="text-xl font-semibold">
                        {capitalize(t.user?.lastName)}
                      </p>
                    </div>
                  </div>
                  <div className="mb-2 flex gap-2">
                    <p className="text-black font-bold text-xl">Email:</p>
                    <p className="text-xl font-semibold">
                      {t.user.email.toLowerCase()}
                    </p>
                  </div>
                </div>
                <div className="md:flex justify-evenly w-full md:ml-8 font-semibold">
                  {/* <div className="flex w-full md:w-full justify-evenly mb-2"> */}
                  <div>
                    <p>Total orders</p>
                    <p>{t.orders}</p>
                  </div>
                  <div>
                    <p>Current orders</p>
                    <p>{t.currentOrders}</p>
                  </div>
                  {/* </div> */}
                  <div>
                    <p>Canceled Orders</p>
                    <p>{t.canceledOrders}</p>
                  </div>
                </div>
              </div>

              {t.googleMeetLink && (
                <div className="flex flex-col font-bold my-8 ">
                  <p>Google Meet Link</p>
                  <p>{t?.googleMeetLink}</p>
                </div>
              )}

              {isAddingLink == i && (
                <div className="w-full sm:w-4/5 mx-auto mt-4">
                  <p className="font-bold mb-1">Add Class Link</p>
                  <input
                    value={googleLinkString ?? ""}
                    onChange={(e) => setGoogleLinkString(e.target.value)}
                    className="outline outline-1 outline-orange-800 rounded-full w-full text-lg px-2 py-0.5 text-center "
                  />
                  <button
                    onClick={() => handleAssignLink(t._id)}
                    className="mt-2 bg-blue-600 font-bold rounded-full w-full py-1 text-white hover:bg-blue-700"
                  >
                    Save Link
                  </button>
                </div>
              )}

              <div className="mt-4 flex justify-evenly items-center gap-8">
                {/* <button
                  onClick={() => router.push(`/dashboard/viewteachers/${t._id}`)}
                  className="bg-gradient-to-r from-[#D9643A] to-[#E35D5B] text-white hover:text-black px-4 py-2 rounded-full font-bold"
                >
                  View Teacher
                </button> */}
                <Link
                  href={`/dashboard/viewteachers/${t._id}`}
                  className="bg-gradient-to-r from-[#D9643A] to-[#E35D5B] text-white hover:text-black px-4 py-2 rounded-full font-bold"
                >
                  View Teacher
                </Link>

                <button
                  className={`${
                    i != isAddingLink
                      ? "bg-gradient-to-l from-[#3753f1] to-[#4abe54]"
                      : "bg-gradient-to-l from-[#da3c15] to-[#b8740f]"
                  } text-white hover:text-black px-4 py-2 rounded-full font-bold`}
                  onClick={() => {
                    if (i == isAddingLink) {
                      setGoogleLinkString(null);
                      setIsAddingLink(null);
                      return;
                    }

                    setIsAddingLink(i);
                    setGoogleLinkString(null);
                  }}
                >
                  {isAddingLink != i ? "Add Class Link" : "Cancel"}
                </button>

                {t.googleMeetLink && isAddingLink != i && (
                  <button
                    onClick={() => handleRemoveGoogleLink(t._id)}
                    className="bg-gradient-to-l from-[#d10606] to-[#701913] text-white hover:text-black px-4 py-2 rounded-full font-bold"
                  >
                    Remove Link
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const monthTeachersJsx = (
    <>
      <p className={`text-2xl mt-4 `}>Month {date}:</p>
      <div className="flex justify-evenly items-center mt-4">
        <button
          className="hover:text-gray-300 transition-all duration-500"
          onClick={() => handleDateChange("sub")}
        >
          {" "}
          <CgArrowLeft className="h-7 w-7" />
        </button>
        <button
          className="hover:text-gray-300 transition-all duration-500"
          onClick={() => handleDateChange("today")}
        >
          {" "}
          <IoArrowDownSharp className="h-7 w-7" />
        </button>
        <button
          className="hover:text-gray-300 transition-all duration-500"
          onClick={() => handleDateChange("add")}
        >
          {" "}
          <CgArrowRight className="h-7 w-7" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {teacherJson.map((t: any, i: number) => {
          const found = monthFilter.find((f: any) => f.teacher == t._id);

          const dateSplit = found?.date.split("/");

          console.log(found, dateSplit, "yoy o");

          if (!found) return;

          const isPast =
            Number(dateSplit[1]) < Number(todaySplit[1]) ||
            (Number(dateSplit[1]) < Number(todaySplit[1]) &&
              Number(dateSplit[0]) < Number(todaySplit[0]));

          console.log(isPast);

          return (
            <div
              key={t._id}
              className="bg-white text-black rounded-lg shadow-md p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-xl font-bold">
                  {capitalize(t.user.firstName)}
                </p>
                {isPast && (
                  <button
                    className="bg-gradient-to-r from-[#D9643A] to-[#E35D5B] text-white hover:text-black font-bold px-4 py-2 rounded-md focus:outline-none shadow-md"
                    onClick={() => handlePaidMonth(found._id, i)}
                  >
                    {found.paid ? "Paid" : "Not Paid"}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-bold">This Month Orders:</p>
                  <p>{found.orders}</p>
                </div>
                <div>
                  <p className="font-bold">Canceled Orders:</p>
                  <p>{found.canceledOrders}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {monthFilter.length == 0 && (
        <div className="text-center w-full h-full flex justify-center items-center py-24 text-4xl">
          <p>No Teachers Orders this Month</p>
        </div>
      )}
    </>
  );

  return (
    <>
      <div className="justify-evenly flex text-3xl pt-8 ">
        <button
          className={`${tab == "" && "underline"}`}
          onClick={() => setTab("")}
        >
          All Teachers
        </button>
        <button
          className={`${tab == "month" && "underline"}`}
          onClick={() => setTab("month")}
        >
          Monthly Orders
        </button>
      </div>
      {tab == "" && allTeachersJsx}
      {tab == "month" && monthTeachersJsx}
    </>
  );
}
