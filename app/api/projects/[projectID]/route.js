import { getSession } from "@/lib/session"
import connectMongo from "@/models/db"
import { Project } from "@/models/project"
import { Task } from "@/models/task"
import { NextResponse } from "next/server"

export async function DELETE(request, { params }) {
    try {
        const u = await getSession()
        await connectMongo()
        let result = await Project.deleteOne({ _id: params.projectID })
        if (!result) {
            return NextResponse.json({ "message": "Unable to Delete Item" }, { status: 404 })
        }
        result = await Task.delete({ project: params.projectID, user: u.userID })
    }
    catch (e) {
        console.log("Something went wrong while deleting")
        return NextResponse.json({ "message": "Unable to Delete Item internal Error" }, { status: 404 })
    }
    return NextResponse.json({ "message": "Deleting Item" }, { status: 200 })
}