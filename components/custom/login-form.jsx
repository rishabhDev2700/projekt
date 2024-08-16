import { Input } from "../ui/input"
import { Label } from "../ui/label"
import Submit from "./submit-button"
import { login } from "@/app/actions"
export default function LoginForm() {
  return (
    <form className="p-2 m-4 lg:w-1/2 mx-auto" action={login}>
    <Label htmlFor="email">Email</Label>
    <Input type="email" name="email" required />
    <Label htmlFor="password">Password</Label>
    <Input type="password" name="password" required />
    <Submit text="Login"/>
  </form>  )
}
