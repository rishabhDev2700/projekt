import { verifyEmail } from "@/lib/email"
import { NextResponse } from "next/server"

export async function POST(req) {
    const body = await req.json()
    console.log(body)
    await verifyEmail(body.id, body.token)

    return NextResponse.json({ "status": 200 })
}