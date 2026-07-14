"use client"
import React, { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const { data: session } = useSession()
  const [showMenu, setShowMenu] = useState(false)
  // const [showSearch, setShowSearch] = useState(false)
  const [showdropdown, setshowdropdown] = useState(false)

  const router = useRouter();

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    router.push(`/${search.trim().toLowerCase()}`);
  };

  return (
    <>
    <nav className='bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]  text-amber-950 flex justify-between items-center px-4 h-16'>
      {/* <Link className='logo font-bold flex justify-center items-center text-2xl gap-1' href={"/"}> */}
      <Link className='flex items-center gap-1 font-bold flex-shrink-0' href={"/"}>
        <img src="/cup.png" width={32} alt="" />
        <span className='text-xl md:text-2xl my-3 md:my-0'>BrewMe</span>
      </Link>


      {/* <div className='relative flex justify-center items-center md:block gap-4 ml-auto'> */}
      {/* <div className="flex items-center gap-3 ml-auto"> */}
      <div className="hidden md:flex items-center gap-3 ml-auto">

        <form onSubmit={handleSearch} className="hidden md:flex">
        {/* <form onSubmit={handleSearch} className="flex w-full md:w-auto items-center"> */}
          <div className="flex">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search creator..."
              // className=" me-2 mb-2 px-5 py-2 text-sm text-center font-stretch-50% border border-pink-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              className="w-32 md:w-64 me-2 mb-2 px-3 py-2 text-sm border border-pink-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <button
              type="submit"
              className="me-2 mb-2 px-5 py-2 bg-gradient-to-br from-pink-500 to-orange-400 text-white rounded-r-lg"
            >
              🔍
            </button>
          </div>
        </form>


        {session && <>
        <div className="relative">
          <button onClick={() => { setshowdropdown(!showdropdown) }}
            // onBlur={()=>{
            //   setTimeout(()=>{
            //     setshowdropdown(false)
            //   },100);
            // }} 


            id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white mx-4 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold rounded-lg text-sm px-5 py-2 text-center me-2 mb-2
        items-center inline-flex" type="button">Welcome<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />

            </svg>
            {/* <div className="dropdown" >
        <div id="dropdown" className={`z-10 ${showdropdown?"":"hidden"} absolute left-[135px] bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li> 
                <Link href={"/dashboard"}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard
                </Link>
              </li>
              <li>
                <Link href={`/${session.user.name}`} 
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white">Your Page
                </Link>
              </li>
            </ul>
          </div>
          </div> */}
          </button>


          <div id="dropdown" className={`${showdropdown ? "" : "hidden"} absolute right-0 mt-2 z-50 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href={"/dashboard"}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard
                </Link>
              </li>
              {/* <li>
                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
              </li> */}
              <li>
                <button
                  onClick={() => {
                    console.log("CLICKED");
                    window.location.assign(`/${session.user.name}`);
                  }}
                  className="block w-full text-left px-4 py-2  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Your Page
                </button>
              </li>
            </ul>
          </div>
          </div>

        </>

        }


        {session &&
          <button className='text-white w-fit bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold rounded-lg text-sm px-5 py-2 text-center me-2 mb-2' onClick={() => { signOut() }}>Logout</button>}

        {!session &&
          <Link href={"/login"}>
            <button className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold rounded-lg text-sm px-5 py-2 text-center me-2 mb-2'>Login</button></Link>}
      </div>


      {/* Mobile Hamburger */}
{/* <div className="md:hidden ml-auto"> */}
<div className="md:hidden flex items-center">
    <button onClick={() => setShowMenu(!showMenu)}>
        {showMenu ? (
            <XMarkIcon className="w-7 h-7" />
        ) : (
            <Bars3Icon className="w-7 h-7" />
        )}
    </button>
</div>


    </nav>


    {showMenu && (
  <div className="md:hidden bg-white shadow-lg border-t p-4 space-y-4">

    <form onSubmit={handleSearch} className="flex">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search creator..."
        className="flex-1 border rounded-l-lg px-3 py-2"
      />

      <button
        type="submit"
        className="px-4 bg-gradient-to-br from-pink-500 to-orange-400 text-white rounded-r-lg"
      >
        🔍
      </button>
    </form>

    {session ? (
      <>
        <Link
          href="/dashboard"
          className="block py-2"
          onClick={() => setShowMenu(false)}
        >
          📊 Dashboard
        </Link>

        <Link
          href={`/${session.user.name}`}
          className="block py-2"
          onClick={() => setShowMenu(false)}
        >
          👤 Your Page
        </Link>

        <button
          onClick={() => {
            setShowMenu(false);
            signOut();
          }}
          className="block py-2 w-full text-left"
        >
          🚪 Logout
        </button>
      </>
    ) : (
      <button
        onClick={() => signIn("google")}
        className="w-full rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 py-2 text-white"
      >
        Login with Google
      </button>
    )}

  </div>
)}
    </>


  )
}

export default Navbar
