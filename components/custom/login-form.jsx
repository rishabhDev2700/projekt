import { Input } from "../ui/input"
import { Label } from "../ui/label"
import Submit from "./submit-button"
import { login } from "@/app/actions"
export default function LoginForm() {
  return (
    <form className="p-2 m-4 lg:w-5/6 xl:w-2/3 mx-auto bg-transparent" action={login}>
    <Label className="dark:text-white" htmlFor="email">Email</Label>
    <Input className="dark:bg-neutral-500 dark:text-white" type="email" name="email" required />
    <Label className="dark:text-white" htmlFor="password">Password</Label>
    <Input className="dark:bg-neutral-500 dark:text-white" type="password" name="password" required />
      <Submit color="blue" text="Login"/>
  </form>  )
}
