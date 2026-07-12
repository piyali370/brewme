"use client"
import React, {useEffect,useState} from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchuser,fetchpayments,initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { notFound } from "next/navigation"

const PaymentPage = ({ username }) => {
    // const {data:session} = useSession()

    const [paymentform, setPaymentform] = useState({name:"",message:"",amount:""})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
      getData()
    }, [])

    //  useEffect(() => {
    //     if(searchParams.get("paymentdone") == "true"){
    //     toast('Thanks for your donation!', {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //         transition: Bounce,
    //         });
    //     }
    //     router.push(`/${username}`)
     
    // }, [])

    useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
        toast.success("Thanks for your donation!");
    }
}, [searchParams]);
    


    const handleChange = (e) =>{
        setPaymentform({...paymentform,[e.target.name]:e.target.value})
    }

    const getData = async ()=>{
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }
    const pay = async(amount) => {
        let a = await initiate(amount, username,paymentform)
        let orderId = a.id
        var options = {
            "key":currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. 
            "currency": "INR",
            "name": "BrewMe", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = new Razorpay(options);
            rzp1.open();
            
        }
        return (
            <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            {/* <ToastContainer /> */}

                <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


                <div className='cover w-full bg-red-50 relative'>
                    <img className='object-cover w-full h-48 md:h-[350]' src={currentUser.coverpic} alt="" />
                    <div className='absolute -bottom-20 right-[38%] md:right-[46%] border-amber-950 overflow-hidden border-2 rounded-full size-36'>
                        <img className='rounded-full object-cover size-36' width={130} height={130} src={currentUser.profilepic} alt="" />
                    </div>
                </div>
                <div className='info flex justify-center items-center my-24 flex-col  gap-2'>
                    <div className='font-bold text-lg'>
                        @{username}
                    </div>
                    <div className='text-amber-900'>
    Let&apos;s help {username} to brew a coffee!
</div>
                    <div className='text-amber-900'>
                        {payments.length} Payments .  ₹{payments.reduce((a,b)=>a+b.amount,0)} raised
                    </div>

                    
                    <div className="payment flex gap-3 w-[85%] mt-11 flex-col md:flex-row">
                        <div className="supporters w-full md:w-1/2 bg-pink-300 rounded-lg text-amber-950 p-10 ">
                            <h2 className='text-2xl font-bold my-5'>Top 10 Supporters</h2>
                            <ul className='mx-5'>
                                {payments.length==0 && <li>No payments yet</li>}
                                {payments.map((p,i)=>{
                                return <li key={i} className='my-4 gap-2 items-center flex'>
                                    <img width={33} src="user.gif" alt="user avatar" />
                                    <span>
                                        {p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message &quot;{p.message}&quot;
                                    </span>
                                </li>
                                })}
                            </ul>
                        </div>
                        <div className="makepayment w-full md:w-1/2 rounded-lg bg-pink-300 text-amber-950 p-10">
                            <h2 className='text-2xl font-bold my-5'>Make a payment</h2>
                            <div className='flex gap-2 flex-col'>
                                <div>
                                    <input onChange={handleChange} value={paymentform.name} name="name" type="text" className='w-full p-3 rounded-lg bg-pink-200' placeholder='Enter Name' />
                                </div>
                                <input onChange={handleChange} value={paymentform.message} name="message" type="text" className='w-full p-3 rounded-lg bg-pink-200' placeholder='Enter Message' />
                                <input onChange={handleChange} value={paymentform.amount} name="amount" type="text" className='w-full p-3 rounded-lg bg-pink-200' placeholder='Enter Amount' />

                                <button onClick={()=>pay(Number.parseInt(paymentform.amount)*100)} className='w-28 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 disabled:bg-pink-500 disabled:from-pink-100'disabled={paymentform.name?.length<3 || paymentform.message?.length<4 || paymentform.amount?.length<1}>Pay</button>
                            </div>
                            <div className='flex flex-col md:flex-row gap-2 mt-5'>
                                <button className='bg-pink-200 p-2 rounded-lg' onClick={()=>pay(1000)}>Pay ₹10</button>
                                <button className='bg-pink-200 p-2 rounded-lg' onClick={()=>pay(2000)}>Pay ₹20</button>
                                <button className='bg-pink-200 p-2 rounded-lg' onClick={()=>pay(3000)}>Pay ₹30</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    export default PaymentPage


// "use client";

// import React, { useEffect, useState } from "react";
// import Script from "next/script";
// import { fetchuser, fetchpayments, fetchPosts, initiate } from "@/actions/useractions";
// import { useSearchParams } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import PostCard from "./PostCard";

// const PaymentPage = ({ username }) => {
//   const [paymentform, setPaymentform] = useState({
//     name: "",
//     message: "",
//     amount: "",
//   });

//   const [currentUser, setcurrentUser] = useState({});
//   const [payments, setPayments] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [loadingPosts, setLoadingPosts] = useState(true);

//   const searchParams = useSearchParams();
//   const router = useRouter();

//   useEffect(() => {
//     getData();
//   }, []);

//   useEffect(() => {
//     if (searchParams.get("paymentdone") === "true") {
//       toast.success("Thanks for your donation!");
//     }
//   }, [searchParams]);

//   const handleChange = (e) => {
//     setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
//   };

//   const getData = async () => {
//     try {
//       setLoadingPosts(true);

//       const [u, dbpayments, creatorPosts] = await Promise.all([
//         fetchuser(username),
//         fetchpayments(username),
//         fetchPosts(username),
//       ]);

//       setcurrentUser(u || {});
//       setPayments(dbpayments || []);
//       setPosts(creatorPosts || []);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to load creator page");
//     } finally {
//       setLoadingPosts(false);
//     }
//   };

//   const pay = async (amount) => {
//     try {
//       const a = await initiate(amount, username, paymentform);
//       const orderId = a.id;

//       const options = {
//         key: currentUser.razorpayid,
//         amount: amount,
//         currency: "INR",
//         name: "BrewMe",
//         description: "Support Creator",
//         image: "[example.com](https://example.com/your_logo)",
//         order_id: orderId,
//         callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
//         prefill: {
//           name: paymentform.name || "Supporter",
//           email: "",
//           contact: "",
//         },
//         notes: {
//           creator: username,
//         },
//         theme: {
//           color: "#ec4899",
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (error) {
//       console.error(error);
//       toast.error("Payment initiation failed");
//     }
//   };

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={5000} />
//       <Script src="[checkout.razorpay.com](https://checkout.razorpay.com/v1/checkout.js)" />

//       <div className="cover w-full bg-red-50 relative">
//         <img
//           className="object-cover w-full h-48 md:h-[350px]"
//           src={currentUser.coverpic || "/default-cover.jpg"}
//           alt="cover"
//         />
//         <div className="absolute -bottom-20 right-[38%] md:right-[46%] border-amber-950 overflow-hidden border-2 rounded-full size-36 bg-white">
//           <img
//             className="rounded-full object-cover size-36"
//             width={130}
//             height={130}
//             src={currentUser.profilepic || "/avatar.gif"}
//             alt="profile"
//           />
//         </div>
//       </div>

//       <div className="info flex justify-center items-center my-24 flex-col gap-2">
//         <div className="font-bold text-lg">@{username}</div>
//         <div className="text-amber-900">Let's help {username} to brew a coffee!</div>
//         <div className="text-amber-900">
//           {payments.length} Payments . ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
//         </div>

//         <div className="w-[85%] mt-11">
//           <div className="bg-pink-300 text-amber-950 rounded-xl shadow-lg p-6">
//             <h2 className="text-2xl md:text-3xl font-bold mb-6">📢 Creator Posts</h2>

//             <div className="flex flex-col gap-6">
//               {loadingPosts ? (
//                 <div className="text-amber-900">Loading posts...</div>
//               ) : posts.length === 0 ? (
//                 <div className="text-amber-900">No posts published yet.</div>
//               ) : (
//                 posts.map((post) => <PostCard key={post._id} post={post} />)
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="payment flex gap-3 w-[85%] mt-11 flex-col md:flex-row">
//           <div className="supporters w-full md:w-1/2 bg-pink-300 rounded-lg text-amber-950 p-10">
//             <h2 className="text-2xl font-bold my-5">Top 10 Supporters</h2>

//             <ul className="mx-5">
//               {payments.length === 0 && <li>No payments yet</li>}

//               {payments.map((p, i) => {
//                 return (
//                   <li key={i} className="my-4 gap-2 items-center flex">
//                     <img width={33} src="/user.gif" alt="user avatar" />
//                     <span>
//                       {p.name} donated <span className="font-bold">₹{p.amount}</span> with a
//                       message "{p.message}"
//                     </span>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>

//           <div className="makepayment w-full md:w-1/2 rounded-lg bg-pink-300 text-amber-950 p-10">
//             <h2 className="text-2xl font-bold my-5">Make a payment</h2>

//             <div className="flex gap-2 flex-col">
//               <div>
//                 <input
//                   onChange={handleChange}
//                   value={paymentform.name}
//                   name="name"
//                   type="text"
//                   className="w-full p-3 rounded-lg bg-pink-200"
//                   placeholder="Enter Name"
//                 />
//               </div>

//               <input
//                 onChange={handleChange}
//                 value={paymentform.message}
//                 name="message"
//                 type="text"
//                 className="w-full p-3 rounded-lg bg-pink-200"
//                 placeholder="Enter Message"
//               />

//               <input
//                 onChange={handleChange}
//                 value={paymentform.amount}
//                 name="amount"
//                 type="text"
//                 className="w-full p-3 rounded-lg bg-pink-200"
//                 placeholder="Enter Amount"
//               />

//               <button
//                 onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
//                 className="w-28 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-bold rounded-lg text-sm px-5 py-2 text-center mb-2 disabled:opacity-50"
//                 disabled={
//                   paymentform.name?.length < 3 ||
//                   paymentform.message?.length < 4 ||
//                   paymentform.amount?.length < 1
//                 }
//               >
//                 Pay
//               </button>
//             </div>

//             <div className="flex flex-col md:flex-row gap-2 mt-5">
//               <button className="bg-pink-200 p-2 rounded-lg" onClick={() => pay(1000)}>
//                 Pay ₹10
//               </button>
//               <button className="bg-pink-200 p-2 rounded-lg" onClick={() => pay(2000)}>
//                 Pay ₹20
//               </button>
//               <button className="bg-pink-200 p-2 rounded-lg" onClick={() => pay(3000)}>
//                 Pay ₹30
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PaymentPage;

