import { getSession } from "@/lib/session"
import { Invitation } from "@/models/invitation"
import { Project, Team } from "@/models/project"
import { User } from "@/models/user"
import { NextResponse } from "next/server"

export async function PUT(request) {
    const data = await request.json()
    const user = await getSession()
    try {
        const result = await Invitation.findOneAndUpdate({ _id: data.id }, { status: true }, { new: true })
        // const result = await Invitation.findOne({ _id: data.id })
        console.log("Invitation updated:", result)
        if (!result) {
            return NextResponse.json({ error: 'Invitation not found' }, { status: 404 });
        }
        const u = await User.findOne({ _id: user.userID, email: result.email })
        if (!u) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }
        const project = await Project.findById(result.project)
        const team = await Team.findById(project.team)
        team.members.push({ user: u, role: Number(result.role) })
        await team.save()
        console.log("Project Team:", project.team)
        console.log("team:", team)
        return NextResponse.json({ message: "Working" }, { status: 200 })

    }
    catch (e) {
        console.log(e)
        return NextResponse.json({ message: "Something went wrong while accepting the invite" })
    }

}


export async function DELETE(request) {
    const data = await request.json()
    console.log(data)
    const user = await getSession()
    try {
        const result = await Invitation.delete({ _id: data.id, user: user.userID })
        console.log(result)
        return NextResponse.json({ message: "Invitation deleted" }, { status: 200 })
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({ message: "Something went wrong while deleting the invite" })
    }

}
