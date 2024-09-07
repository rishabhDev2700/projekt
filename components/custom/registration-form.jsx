"use client"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import Submit from "./submit-button"
import { useState } from "react"
import { register } from "@/app/actions"
export default function RegistrationForm() {
    const [pass, setPass] = useState({})
    const validateRegisterForm = () => {
      return pass.password === pass.confirm
    }
    return (
        <form className="p-2 m-4 lg:w-5/6 xl:w-2/3 mx-auto" onSubmit={validateRegisterForm} action={register}>
            <Label htmlFor="email">Email</Label>
        <Input className="dark:bg-neutral-500 dark:text-white" id="email" type="email" name="email" required />
            <Label htmlFor="name">Name</Label>
        <Input className="dark:bg-neutral-500 dark:text-white"  id="name" type="text" name="name" required />
            <Label htmlFor="confirm-password">Password</Label>
        <Input className="dark:bg-neutral-500 dark:text-white" id="password" type="password" name="password" required onChange={(e) => setPass({ ...pass, password: e.target.value })} />
            <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input className="dark:bg-neutral-500 dark:text-white" id="confirm-password" type="password" name="confirm-password" required onChange={(e) => setPass({ ...pass, confirm: e.target.value })} />
            <Submit text="Register" />
        </form>)
}
