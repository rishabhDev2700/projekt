"use client"

import { Loader } from "lucide-react";
import Link from "next/link";
// import { verifyEmail } from "@/lib/email";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function Page({ params }) {
    const [verified, setverified] = useState(false)
    const [loading, setLoading] = useState(true)
    const id = params.id
    const search = useSearchParams()
    const token = search.get('token');
    const confirmVerification = async () => {
        const response = await fetch(`http://192.168.1.8:3000/api/verify-email`, {
            method: 'POST',
            body: JSON.stringify({
                id,
                token
            })
        })
        let data = await response.json()
        if (data.status === 200) {
            setverified(true)
        }
        setLoading(false)

    }
    useEffect(() => {
        confirmVerification()
    }, [])
    console.log(`Verified? ${verified}`)
    return (
        <div className="w-full h-screen grid items-center justify-center">
            <div className="text-4xl">
                {verified ? "Verified!" : "Not verified"}
                {loading??<Loader className="animate-spin"/>}
            </div>
                <Link className="text-xl" href="/dashboard/">Go to <span className="underline animate-pulse text-purple-500">Dashboard</span></Link>
            
        </div>
    )
}
