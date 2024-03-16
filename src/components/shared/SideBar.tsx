"use client"
import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className='h-screen w-72 bg-green-300 p-5 shadow-md shadow-purple-200/50'>
        <div className='flex size-full flex-col gap-4'>
            <Link href='/' className='flex items-center gap-2 md:py-2'>
                <Image
                  src='/assets/images/logo-icon.svg'
                  alt='logo'
                  height={28}
                  width={100}
                />
            </Link>
            <nav className='h-full flex-col justify-between md:flex md:gap-4'>
              <SignedIn>
              <ul className='hidden w-full flex-col items-start gap-2 md:flex'>
                {navLinks.map((item)=>{
                  const isActive = item.route === pathname 
                  return ( <li key={item.route} className={`flex-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover  transition-all hover:bg-purple-100 hover:shadow-inner ${
                    isActive ? 'bg-purple-gradient text-black' : 'text-gray-700'
                  }`}> 
                            <Link href={item.route} className='p-16-semibold flex size-full gap-4 p-4' >
                                <Image
                                  src={item.icon}
                                  alt='logo'
                                  width={24}
                                  height={24}
                                  className={`${isActive && 'brightness-200'}`}
                                />
                                {item.label}
                            </Link>
                          </li>)
                })}
              </ul>
              <ul>
                  <li className="flex-center cursor-pointer gap-2 p-4">
                      <UserButton afterSignOutUrl='/' showName />
                  </li>   
              </ul>
              </SignedIn>
              
              <SignedOut>
                    <Link href='/sign-in'> Sign In </Link>
              </SignedOut>

            </nav>
        </div>
    </div>
  )
}

export default SideBar