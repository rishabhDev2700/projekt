import { getSession } from "@/lib/session"
import connectMongo from "@/models/db"
import { Task } from "@/models/task"
import { NextResponse } from "next/server"

export async function PUT(req, { params }) {
    const data = await req.json()
    const user = await getSession()
    console.log("data to update:", data)
    console.log(params)
    try {
        await connectMongo()
        const result = await Task.findOneAndUpdate({ _id: params.taskID, project: params.projectID }, { ...data }, { new: true })
        console.log("result:", result)
        return NextResponse.json({ data: result })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: err })
    }
}

export async function DELETE(req, { params }) {
    console.log("Deleting:", params)
    try {
        await connectMongo()
        const result = await Task.deleteOne({ _id: params.taskID })
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