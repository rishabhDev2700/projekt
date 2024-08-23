import { Sheet, SheetTrigger, SheetContent } from '../ui/sheet'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { ModeToggle } from '../theme-toggler'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { getSession } from '@/lib/session'
import { logout } from '@/app/actions'
export default async function NavBar() {
  const user = await getSession()
  return (
    <div className='sticky top-0 flex items-center justify-between px-8 py-4 border-b border-black/15 xl:w-1/2 lg:mx-auto bg-white dark:bg-neutral-900 dark:rounded-b-lg'>
      <header className='text-3xl uppercase font-thin'><Link href="/dashboard">Projekt</Link></header>
      <div className='font-light hidden md:inline-block'>welcome <span className='underline'>{user.email}</span></div>
      <Sheet>
        <SheetTrigger asChild><HamburgerMenuIcon size={64} /></SheetTrigger>
        <SheetContent side="right">
          <nav className='flex flex-col p-4 text-center text-neutral-500 dark:text-white text-xl'>
            <ModeToggle />
            <Separator />
            <Link className='px-4 py-2 my-2 border-b-2 border-transparent hover:border-black/50 dark:hover:border-white/50 duration-200' href="/dashboard">Dashboard</Link>
            <Link className='px-4 py-2 my-2 border-b-2 border-transparent hover:border-black/50 dark:hover:border-white/50 duration-200' href="/dashboard/projects">Projects</Link>
            <Link className='px-4 py-2 my-2 border-b-2 border-transparent hover:border-black/50 dark:hover:border-white/50 duration-200' href="/dashboard/myprojects">My Projects</Link>
            <Link className='px-4 py-2 my-2 border-b-2 border-transparent hover:border-black/50 dark:hover:border-white/50 duration-200' href="/dashboard/chat">Chat</Link>
            <Separator />
            <form action={logout}>
              <Button type="submit" className='px-4 py-2 my-2 border-b-2 border-transparent bg-red-400 text-white rounded-md hover:border-black/50 duration-200' href="/dashboard/logout">Logout</Button>
            </form>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
