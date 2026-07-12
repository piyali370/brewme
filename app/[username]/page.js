import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from "next/navigation"
import connectDb from '@/db/connectDb'
import User from '@/models/User'

// const Username = async ({params }) => {

//   const checkUser = async () => {
//     await connectDb()
//     let u = await User.findOne({username:params.username })
//     if (!u) {
//       return notFound()
//     }
//   }
//   await checkUser()

//   return (
//     <>
//       <PaymentPage username={params.username} />
//     </>
//   )
// }

// export default Username
 
// export async function generateMetadata({ params }) {
//   return {
//     title: `Support ${params.username} - Get Me A Chai`,
//   }
// }


export default async function Username({ params }) {
  const { username } = await params  // ✅ await params

  await connectDb()
  let u = await User.findOne({username }).lean()
  if (!u) {
    return notFound()
  }

  return (
    <div>
      <PaymentPage username={u.username} />
    </div>
  )
}

export async function generateMetadata({ params }) {
  const { username } = await params   // ✅ await here too

  return {
    title: `Support ${username} - BrewMe`,
  }
}



// import React from "react";
// import PaymentPage from "@/components/PaymentPage";
// import { notFound } from "next/navigation";
// import connectDb from "@/db/connectDb";
// import User from "@/models/User";

// export default async function Username({ params }) {
//   await connectDb();

//   const u = await User.findOne({ username: params.username }).lean();

//   if (!u) {
//     notFound();
//   }

//   return (
//     <div>
//       <PaymentPage username={u.username} />
//     </div>
//   );
// }

// export async function generateMetadata({ params }) {
//   return {
//     title: `Support ${params.username} - BrewMe`,
//   };
// }
