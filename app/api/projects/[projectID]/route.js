import connectMongo from "@/models/db"
import { Project } from "@/models/project"
import { NextResponse } from "next/server"

export async function DELETE(request, { params }) {
    try {
        await connectMongo()
        const result = await Project.deleteOne({ _id: params.projectID })
        if (!result) {
            return NextResponse.json({ "message": "Unable to Delete Item" }, { status: 404 })
        }
    }
    catch (e) {
        console.log("Something went wrong while deleting")
        return NextResponse.json({ "message": "Unable to Delete Item internal Error" }, { status: 404 })
    }
    return NextResponse.json({ "message": "Deleting Item" }, { status: 200 })
}