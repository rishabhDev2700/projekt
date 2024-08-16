"use client"
import {useFormStatus} from "react-dom"
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
export default function Submit({text}) {
    const { pending } = useFormStatus();

  return (
    <Button className="mt-4" type="submit" disabled={pending}>{pending ? <Loader2 className="animate-spin" /> : text}</Button>

  )
}
