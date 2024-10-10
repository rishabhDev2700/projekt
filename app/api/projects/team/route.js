import { getSession } from "@/lib/session"
import connectMongo from "@/models/db"
import { Invitation } from "@/models/invitation"
import { Project } from "@/models/project"
import { User } from "@/models/user"
import { NextResponse } from "next/server"

export async function POST(request) {
    let user = await getSession()
    await connectMongo()
    user = await User.findById(user.userID)
    if (!user) {
        return NextResponse.json({message:"Invalid session"},{status:400})
    }
    console.log("Session valid")
    const data = await request.json()
    console.log(data)
    const project = await Project.findOne({ _id: data.project, team: user._id })
    if (!project) {
        return NextResponse.json({ message: "You are not a member of the project!" },{status:400})
    }
    const invitation = await Invitation.create(data)
    return NextResponse.json({ message: "Data Recieved" }, { status: 200 })
}