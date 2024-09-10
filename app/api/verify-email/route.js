import { verifyEmail } from "@/lib/email"
import { NextResponse } from "next/server"

export async function POST(req) {
    const body = await req.json()
    const result = await verifyEmail(body.id, body.token)
    if (result)
        return NextResponse.json({ "status": 200 })
    return NextResponse.json({ "status": 404 })

}