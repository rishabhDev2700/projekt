import React from 'react'
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '../ui/sheet'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { Button } from '../ui/button'
import { ModeToggle } from '../theme-toggler'
import { Separator } from '../ui/separator'
export default function NavBar() {
  return (
    <div className='flex items-center justify-between px-8 py-4 border-b border-black/5 xl:w-1/2 lg:mx-auto'>
      <header className='text-3xl uppercase font-thin'><Link href="/dashboard">Master</Link></header>
      <Sheet>
        <SheetTrigger asChild><HamburgerMenuIcon size={64} /></SheetTrigger>
        <SheetContent side="right">
          <nav className='flex flex-col p-4 text-center text-neutral-500 dark:text-white text-xl'>
            <ModeToggle />
            <Separator/>
            <Link className='px-4 py-2 my-2 border-b-2 border-transparent hover:border-black/50 duration-200' href="/dashboard">Dashboard</Link>
            <Link className='px-4 py-2 my-2 border-b-2 border-transparent hover:border-black/50 duration-200' href="/dashboard/projects">Projects</Link>
            <Link className='px-4 py-2 my-2 border-b-2 border-transparent hover:border-black/50 duration-200' href="/dashboard/myprojects">My Projects</Link>
            <Link className='px-4 py-2 my-2 border-b-2 border-transparent hover:border-black/50 duration-200' href="/dashboard/chat">Chat</Link>
            <Separator/>
            <Link className='px-4 py-2 my-2 border-b-2 border-transparent bg-red-400 text-white rounded-md hover:border-black/50 duration-200' href="/dashboard/logout">Logout</Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
