import { fetchMyEvents } from "@/lib/getData";
import { getSession } from "@/lib/session";
import connectMongo from "@/models/db";
import { Event } from "@/models/event";
import { NextResponse } from "next/server";

export async function GET() {
    console.log("Getting user for fetching events")
    const user = await getSession()
    const events = await fetchMyEvents(user.userID)
    console.log("Returning response")
    return NextResponse.json({ "events": events })
}

export async function POST(request) {
    const body = await request.json()
    const date = new Date(body.date)
    const start = new Date(date.setUTCHours(0, 0, 0, 0))
    const end = new Date(date.setUTCHours(23, 59, 59, 999))
    console.log(start.toDateString())
    console.log(end.toDateString())
    await connectMongo()
    const events = await Event.find({
        datetime: {
            $gte: start,
            $lte: end
        }
    })
    return NextResponse.json({ events: events })

}