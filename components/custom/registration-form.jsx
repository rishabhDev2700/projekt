"use client";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Submit from "./submit-button";
import { useState } from "react";
import { register } from "@/app/actions";
import { useToast } from "../ui/use-toast";
export default function RegistrationForm() {
  const [pass, setPass] = useState({});
  const [errors,setErrors] = useState({})
  const validateRegisterForm = () => {
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)){
       setErrors({ ...errors,email:"Invalid email"})
     }
     if(pass.password.length<8){
       setErrors({...errors,password:"Password cannot be less than 8 character long"})       
     }
    if (pass.password !== pass.confirm) {
      setErrors({...errors,confirmPassword:"Passwords didn't match"})
    }
    if(errors){
      return false
    }
    toast({ title: "Verification Email sent" });
    return true;
  };
  const { toast } = useToast();
  return (
    <form
      className="p-2 m-4 lg:w-5/6 xl:w-2/3 mx-auto"
      onSubmit={validateRegisterForm}
      action={register}
    >
      <Label htmlFor="email">Email</Label>
      <Input
        className="dark:bg-neutral-500 dark:text-white"
        id="email"
        type="email"
        name="email"
        required
      />
      <div className="text-red-500">{errors.email}</div>
      <Label htmlFor="name">Name</Label>
      <Input
        className="dark:bg-neutral-500 dark:text-white"
        id="name"
        type="text"
        name="name"
        required
      />
      <div className="text-red-500">{errors.name}</div>
      <Label htmlFor="confirm-password">Password</Label>
      <Input
        className="dark:bg-neutral-500 dark:text-white"
        id="password"
        type="password"
        name="password"
        required
        onChange={(e) => setPass({ ...pass, password: e.target.value })}
      />
      <div className="text-red-500">{errors.password}</div>
      <Label htmlFor="confirm-password">Confirm Password</Label>
      <Input
        className="dark:bg-neutral-500 dark:text-white"
        id="confirm-password"
        type="password"
        name="confirm-password"
        required
        onChange={(e) => setPass({ ...pass, confirm: e.target.value })}
      />
      <div className="text-red-500">{ errors.confirmPassword}</div>
      <Submit color="green" text="Register" />
    </form>
  );
}
