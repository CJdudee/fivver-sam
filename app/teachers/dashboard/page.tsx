import { decodeUserAndCheckTeacher } from "@/app/lib/finallyRoleCheck";
import { serverUser } from "@/app/lib/serverAuth";
import Booking from "@/models/Booking";
import MonthlyOrder from "@/models/MonthlyOrder";
import Teacher from "@/models/Teacher";
import { simpleJson } from "@/utils/helpers";
import { formatDate } from "date-fns";
import Link from "next/link";
import { redirect } from "next/navigation";

import GoogleClient from "@/app/components/teachers/google/GoogleClient";
import TimeZoneComp from "@/app/components/TimeZoneComp";
import CalendarGoogle from "@/app/components/teachers/google/CalendarGoogle";
import ClassRoomLink from "@/app/components/admin/dashboard/ClassRoomLink";

export default async function Page({ searchParams }: any) {
  console.log(typeof searchParams.code);

  const googCode = searchParams.code;

  const user = await serverUser();
  if (!user) redirect("/");

  await decodeUserAndCheckTeacher();

  const teacher = await Teacher.findOne({ user: user.id });

  if (searchParams.code) {
    teacher.googleCode = googCode;
    await teacher.save();
  }

  const format = formatDate(new Date(), "MM/yy");

  const mothnlyOrder = await MonthlyOrder.findOne({
    teacher: teacher._id,
    date: format,
  });

  const totalOrders = await Booking.find({
    teacher: teacher._id
  }).countDocuments()

  const canBooking = await Booking.find({
    teacher: teacher._id,
    status: "canceled",
  }).countDocuments();
  const currentBooking = await Booking.find({
    teacher: teacher._id,
    status: "pending",
    date: {
      $gt: new Date(),
    },
  }).countDocuments();

  const completedBooking = await Booking.find({
    teacher: teacher._id,
    status: 'pending',
    date: {
      $lt: new Date()
    }
  }).countDocuments()
  // const canBooking = await Booking.find({teacher: teacher._id, date: {
  //   $gte: new Date()
  // }}).countDocuments()

  const teacherJson = simpleJson(teacher);

  const canceledBooking = simpleJson(canBooking);
  const currentJson = simpleJson(currentBooking);

  const monthlyOrderJson = simpleJson(mothnlyOrder);

  const completedOrderJson = simpleJson(completedBooking)

  const totalOrdersJson = simpleJson(totalOrders)

  const monthlyJsx = (
    <div className="flex  items-center flex-col md:flex-row text-black gap-6 md:gap-8 py-10 px-2 md:p-10 w-full md:w-full rounded-t-xl justify-evenly h-full min-h-[80px]">
      <div className="flex flex-col justify-center items-center md:text-xl font-bold w-full md:w-1/2    h-full shadow-xl px-2 rounded-xl py-2 ">
        <p className="w-full flex justify-center items-center whitespace-nowrap ">
          This Month Orders
        </p>
        <p className="w-full flex justify-center items-center ">
          {monthlyOrderJson?.orders}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center md:text-xl font-bold w-full md:w-1/2  shadow-xl px-2 rounded-xl py-2 ">
        <p className="w-full flex justify-center ">Canceled Orders</p>
        <p className="w-full flex justify-center ">
          {monthlyOrderJson?.canceledOrders}
        </p>
        {/* <p className="w-full flex justify-center ">{teacherJson.currentOrders}</p> */}
      </div>
      {/* <div className="flex justify-center items-center md:text-2xl font-bold w-1/3">
        <p className="w-1/2 flex justify-center ">Cancel Orders</p>
        {/* <p className="w-1/2 flex justify-center ">{teacherJson.canceledOrders}</p> */}
      {/* <p className="w-1/2 flex justify-center ">
          {monthlyOrderJson?.canceledOrders}
        </p>
      </div> */}
    </div>
  );

  return (
    <div className="flex flex-col gap-8 justify-evenly w-full items-center md:py-12 pt-4  relative min-h-[800px] h-full ">
      {/* {!googCode && !teacherJson.googleCode && <GoogleClient />}
      {(googCode || teacherJson.googleCode) && (
        <div className="text-2xl text-white font-bold">
          You have connected your Google Calendar
        </div>
      )}
      <CalendarGoogle teacherCode={teacherJson.googleCode} userId={user.id} /> */}
      {/* <TimeZoneComp /> */}
      <div className="  top-8 right-2 md:right-28">
        {/* <FcSettings className="w-10 h-10 hover:rotate-90 transition-all duratino-500" /> */}
        <Link
          href={"/profile"}
          className="outline outline-white md:outline-white outline-[.5px] px-6 py-2 rounded-full text-white md:text-[#c5c5c5] hover:text-[#838383]"
        >
          Profile
        </Link>
      </div>

      <div>
        <ClassRoomLink teacherLink={teacherJson?.googleMeetLink} teacherId={teacherJson._id} />
      </div>
      
      <div className="dashboard flex flex-col items-center w-full md:w-fit rounded-xl bg-gray-100 shadow-md h-fit">
        <div className="header bg-gradient-to-r to-[#D9643A] from-[#E35D5B] py-4 rounded-t-xl text-white w-full">
          <h1 className="text-3xl font-bold text-center">Teacher Dashboard</h1>
          <p className="text-lg text-center px-2">
            See your orders and manage your schedule
          </p>
        </div>

        <div className="body w-full flex flex-col justify-between gap-4 px-4 py-8">
          <div className="orders-summary flex flex-col gap-4">
            <div className="flex items-center justify-between text-lg font-bold">
              <p>Total Orders</p>
              <span>{totalOrdersJson}</span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold">
              <p>Completed Orders</p>
              <span>{completedOrderJson}</span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold">
              <p>Current Orders</p>
              <span>{currentJson}</span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold">
              <p>Canceled Orders</p>
              <span>{canceledBooking}</span>
            </div>
          </div>

          <div className="monthly-orders flex flex-col rounded-xl bg-white shadow-lg drop-shadow-lg px-4 md:px-0">
            {monthlyOrderJson && (
              <>
                <h2 className="text-2xl font-bold text-center py-4">
                  Monthly Orders {format}
                </h2>
                {monthlyJsx}
              </>
            )}
            {!monthlyOrderJson && (
              <p className="text-center text-lg font-bold py-4">
                No Orders This Month
              </p>
            )}
          </div>

          <div className="actions flex flex-col gap-4">
            <Link
              href="/teachers/dashboard/schedule"
              className="button hover:bg-gray-200 rounded-lg py-2 px-4 text-center text-lg font-bold"
            >
              Make Schedule
            </Link>
            <Link
              href="/teachers/dashboard/booked"
              className="button hover:bg-gray-200 rounded-lg py-2 px-4 text-center text-lg font-bold"
            >
              View Booking
            </Link>
            <Link
              href="/teachers/dashboard/old"
              className="button hover:bg-gray-200 rounded-lg py-2 px-4 text-center text-lg font-bold"
            >
              View Old Classes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="flex flex-col justify-between w-full items-center  pt-4 bg-[#eec8a4] outline-2 outline outline-black mt-0 rounded-3xl min-h-full h-full ">
        <p className="text-3xl text-center text-gray-800 font-extrabold mb-6">
          {" "}
          {format} Orders
        </p>

        <div className="md:px-8 w-full">
          <div className="w-full border-b-2 border-black rounded-2xl shadow-2xl drop-shadow-2xl border-t-2">
            {monthlyOrderJson && monthlyJsx}
            {!monthlyOrderJson && (
              <div className="text-3xl text-center font-bold mt-2">
                <p>No Orders This Month</p>
              </div>
            )}
          </div>
        </div>

        <div className="w-full">
          <div className="flex  items-center flex-row text-black  gap-8 py-10 px-4 md:p-10 w-full md:w-full rounded-t-xl justify-evenly">
            <div className="flex flex-col  justify-center items-center text-xs md:text-3xl font-semibold w-1/3 ">
              <p className="w-full flex justify-center ">Total Orders</p>{" "}
              <p className="w-full flex justify-center ">
                {teacherJson.orders}
              </p>
            </div>
            <div className="flex  flex-col justify-center items-center text-xs md:text-3xl font-semibold w-1/3 ">
              <p className="w-full flex justify-center ">Current Orders</p>
              <p className="w-full flex justify-center ">{currentJson}</p>
              
            </div>
            <div className="flex  flex-col justify-center items-center text-xs md:text-3xl font-semibold w-1/3">
              <p className="w-full flex justify-center ">Cancel Orders</p>
              
              <p className="w-full flex justify-center ">
                {teacherJson.canceledOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-end w-full h-2/4">
          <div className="w-full flex items-center justify-center h-1/2 ">
            <Link
              className=" hover:bg-gray-200 font-semibold  p-4 h-full w-full  text-center min-h-max text-3xl border-t-2 border-r-[1px] rounded-xl border-black flex items-center justify-center"
              href={"/teachers/dashboard/schedule"}
            >
              Make Schedule
            </Link>
            <Link
              className=" hover:bg-gray-200 font-semibold rounded-b-xl  p-4 h-full w-full  text-center min-h-max text-3xl border-t-2 border-l-[1px] border-black flex items-center justify-center rounded-2xl"
              href={"/teachers/dashboard/booked"}
            >
              View booking
            </Link>
          </div>
          <div className="w-full flex items-center justify-center h-1/2 ">
            <Link
              className=" hover:bg-gray-200 font-semibold  p-4 h-full w-full  text-center min-h-max text-3xl border-t-2  border-black flex items-center justify-center rounded-2xl"
              href={"/teachers/dashboard/old"}
            >
              View Old Classes
            </Link>
          </div>
        </div>
      </div> */
}


{/* <div className="">
        <p>These Month Orders</p>
        <div>
          {monthlyOrderJson ? (
            <div></div>
          ) : (
            <div>
              <p>No orders </p>
            </div>
          )}
        </div>
      </div> */}