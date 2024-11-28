import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ModeToggle } from "../theme-toggler";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { getSession } from "@/lib/session";
import { logout } from "@/app/actions";
export default async function NavBar() {
  const user = await getSession();
  return (
    <div className="sticky top-0 flex items-center justify-between px-8 py-4 border-b border-black/15 lg:w-5/6 xl:w-3/4 lg:mx-auto bg-white dark:bg-neutral-900 dark:rounded-b-lg z-50">
      <header className="text-3xl uppercase font-thin">
        <Link href="/dashboard">Projekt</Link>
      </header>
      <div className="font-light hidden md:inline-block">
        welcome <span className="underline">{user.email}</span>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <HamburgerMenuIcon className="xl:hidden" size={64} />
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="flex flex-col p-4 text-center text-neutral-500 dark:text-white text-xl xl:hidden">
            <ModeToggle />
            <Separator />
            <Link
              className="px-4 py-2 my-2 border-b-2 border-transparent hover:border-black/50 dark:hover:border-white/50 duration-200"
              href="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className="px-4 py-2 my-2 border-b-2 border-transparent hover:border-black/50 dark:hover:border-white/50 duration-200"
              href="/dashboard/myprojects"
            >
              Projects
            </Link>
            <Link
              className="px-4 py-2 my-2 border-b-2 border-transparent hover:border-black/50 dark:hover:border-white/50 duration-200"
              href="/dashboard/chat"
            >
              Chat
            </Link>
            <Link
              className="px-4 py-2 my-2 border-b-2 border-transparent hover:border-black/50 dark:hover:border-white/50 duration-200"
              href="/dashboard/invitations"
            >
              Invitations
            </Link>

            <Separator />
            <form action={logout}>
              <Button
                type="submit"
                className="px-4 py-2 my-2 border-b-2 border-transparent bg-red-400 text-white rounded-md hover:border-black/50 duration-200"
                href="/dashboard/logout"
              >
                Logout
              </Button>
            </form>
          </nav>
        </SheetContent>
      </Sheet>
      <nav className="hidden xl:w-1/3 xl:flex">
        <Link
          className="px-4 py-2 my-2 border-b-2 border-transparent hover:border-black/50 dark:hover:border-white/50 duration-200"
          href="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className="px-4 py-2 my-2 border-b-2 border-transparent hover:border-black/50 dark:hover:border-white/50 duration-200"
          href="/dashboard/myprojects"
        >
          Projects
        </Link>
        <Link
          className="px-4 py-2 my-2 border-b-2 border-transparent hover:border-black/50 dark:hover:border-white/50 duration-200"
          href="/dashboard/chat"
        >
          Chat
        </Link>
        <Link
          className="px-4 py-2 my-2 border-b-2 border-transparent hover:border-black/50 dark:hover:border-white/50 duration-200"
          href="/dashboard/invitations"
        >
          Invitations
        </Link>
        <form action={logout}>
          <Button
            type="submit"
            className="px-4 py-2 my-2 border-b-2 border-transparent bg-red-400 text-white rounded-md hover:border-black/50 duration-200"
            href="/dashboard/logout"
          >
            Logout
          </Button>
        </form>
      </nav>
    </div>
  );
}
