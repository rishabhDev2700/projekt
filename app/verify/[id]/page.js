"use client"

// import { verifyEmail } from "@/lib/email";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default async function Page({ params }) {
    const [verified, setverified] = useState(false)
    const [loading, setLoading] = useState(false)
    const id = params.id
    const search = useSearchParams()
    const token = search.get('token');
    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:3000/api/verify-email`, {
            method: 'POST',
            body: JSON.stringify({
                id,
                token
            })
        }).then((res) => {
            if (res.status === 200) {
                setverified(true)
            }
            setLoading(false)
        })

    }, [])
    return (
        <div>{verified ? "Verified" : loading ?? "Not verified"}</div>
    )
}
