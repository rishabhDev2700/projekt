import { getSession } from "@/lib/session"
import connectMongo from "@/models/db"
import { Project } from "@/models/project"
import { NextResponse } from "next/server"
import { Team } from "@/models/project"
export async function POST(req) {
    let user = await getSession()
    let data = await req.json()
    data.user = user.userID
    try {
        await connectMongo()
        const team = await Team.create({ members: [{ user: data.user, role: 0 }] })
        const insertedID = await Project.create({ ...data, team: team })
        return NextResponse.json({ "project": insertedID })
    }
    catch (e) {
        console.log(e)
        return NextResponse.json(e)
    }
}


export async function PUT(req) {
    const data = await req.json()
    const user = await getSession()
    try {
        await connectMongo()
        const result = await Project.findOneAndUpdate({ _id: data._id, user: user.userID }, { ...data }, { new: true })
        return NextResponse.json({ data: result })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: err })
    }
}