"use client"
import React , {useState} from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setshowdropdown] = useState(false)

  return (
    <nav className='bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]  text-amber-950 flex justify-between items-center px-4 md:h-16'>
      <Link className='logo font-bold flex justify-center items-center text-2xl gap-1' href={"/"}>
        <img src="/cup.png" width={32} alt="" />
        <span className='text-xl md:text-2xl my-3 md:my-0'>BrewMe</span>
      </Link>

      
      <div className='relative flex justify-center items-center md:block gap-4'>
        {session && <>
        <button onClick={()=>{setshowdropdown(!showdropdown)}} onBlur={()=>{
          setTimeout(()=>{
            setshowdropdown(false)
          },100);
        }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white mx-4 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold rounded-lg text-sm px-5 py-2 text-center me-2 mb-2
        items-center inline-flex" type="button">Welcome  {session.user.email}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          
        </svg>
        <div className="dropdown" >
        <div id="dropdown" className={`z-10 ${showdropdown?"":"hidden"} absolute left-[135px] bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li> 
                <Link href={"/dashboard"}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard
                </Link>
              </li>
              <li>
                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
              </li>
            </ul>
          </div>
          </div>
        </button>
        
        
          {/* <div id="dropdown" className={`z-10 ${showdropdown?"":"hidden"} absolute left-[125px] bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li> 
                <Link href={"/dashboard"}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard
                </Link>
              </li>
              <li>
                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
              </li>
            </ul>
          </div> */}
          
          </>
         
        }

        {session &&
          <button className='text-white w-fit bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold rounded-lg text-sm px-5 py-2 text-center me-2 mb-2' onClick={() => { signOut() }}>Logout</button>}

        {!session &&
          <Link href={"/login"}>
            <button className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold rounded-lg text-sm px-5 py-2 text-center me-2 mb-2'>Login</button></Link>}
      </div>
    </nav>
  )
}

export default Navbar
