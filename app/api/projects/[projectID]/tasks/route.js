import connectMongo from "@/models/db"
import { Task } from "@/models/task"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(request, { params }) {
    const data = await request.json()
    data.project = new mongoose.Types.ObjectId(params.projectID)
    data.user = data.assignedTo
    delete data.assignedTo
    try {
        await connectMongo()
        const task = await Task.create(data)
        if (!task) {
            return NextResponse.json({ "message": "Unable to Add Task" }, { status: 404 })
        }
    }
    catch (e) {
        console.error(e)
        return NextResponse.json({ "message": "Unable to Add Task" }, { status: 404 })

    }
    return NextResponse.json({ "message": "Added task successfully" })
}