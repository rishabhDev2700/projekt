import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginForm from "@/components/custom/login-form";
import RegistrationForm from "@/components/custom/registration-form";
import bg from "@/assets/dark.svg"
import bg2 from "@/assets/light.svg"

export default function Home() {
  return (
    <main className="grid lg:grid-cols-2 h-screen items-center lg:place-content-center lg:place-self-auto bg-neutral-200">
      <div className="rounded-lg border m-4 px-8 pb-12 lg:m-12 bg-white dark:bg-neutral-800 shadow-lg shadow-black/20">
        <h2 className="text-center font-light pt-12 text-2xl lg:text-5xl uppercase">Projekt</h2>
        <Tabs defaultValue="login" className="flex flex-col ">
          <TabsList className="mx-auto bg-neutral-700 mt-8">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent  value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent  value="register">
            <RegistrationForm />
          </TabsContent>
        </Tabs>
      </div>
      {/* //desktop */}
      <Image className="hidden lg:block dark:lg:hidden w-full h-screen object-cover" src={bg2} />
      <Image className="hidden dark:lg:block w-full h-screen object-cover" src={bg} />

    </main>

  );
}
