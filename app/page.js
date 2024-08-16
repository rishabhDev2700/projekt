import { getSession } from "@/lib/session";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginForm from "@/components/custom/login-form";
import RegistrationForm from "@/components/custom/registration-form";
import bg from "@/assets/dark.svg"

export default function Home() {
  const session = getSession()
  return (
    <main className="grid lg:grid-cols-2 h-screen items-center lg:place-content-center lg:place-self-auto bg-gray-200">
      <div className="rounded-lg border m-4 px-8 pb-12 lg:m-12 bg-white shadow-lg shadow-black/20">

        <h2 className="text-center font-light pt-12 text-2xl lg:text-5xl uppercase">Master</h2>
        <Tabs defaultValue="login" className="flex flex-col ">
          <TabsList className="mx-auto bg-black mt-8">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent className="place-content-start" value="login">
            <LoginForm/>
          </TabsContent>
          <TabsContent className="place-content-start" value="register">
          <RegistrationForm />
          </TabsContent>
        </Tabs>
      </div>
      {/* //desktop */}
      <Image className="hidden lg:block w-full h-screen object-cover" src={bg} />
    </main>

  );
}
