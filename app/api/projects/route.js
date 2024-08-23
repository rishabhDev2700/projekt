import { decrypt, getSession } from "@/lib/session"
import connectMongo from "@/models/db"
import { Project } from "@/models/project"
import { Task } from "@/models/task"
import { NextResponse } from "next/server"
export async function POST(req) {
    let user = await getSession()
    console.log(user)
    let data = await req.json()
    let raw_tasks = [...data.tasks]
    delete data.tasks
    data.user = user.userID
    try {
        await connectMongo()
        console.log(data)
        const insertedID = await Project.create({ ...data })
        console.log(insertedID)
        let tasks = raw_tasks.map((t) => { return { ...t, project: insertedID } })
        const result = await Task.insertMany(tasks)
        return NextResponse.json({ "project": insertedID, "tasks": result })
    }
    catch (e) {
        console.log(e)
        return NextResponse.json(e)
    }
}


export async function GET(req) {
    const data = {
        title: 'Projekt',
        description: 'Desc-1',
        startdate: '2024-08-23T21:51',
        enddate: '2024-08-21T21:51',
        team: [
            { email: 'rishabhdev@gmail.com', role: 'Developer' },
            { email: 'adivel@gmail.com', role: 'Writer' }
        ],
        tasks: [
            {
                title: 't-1',
                description: 'd-1',
                deadline: '2024-08-22T21:52',
                note: 'this is extra'
            },
            {
                title: 't-2',
                description: 'd-2',
                deadline: '2024-08-30T21:53',
                note: 'extra note'
            }
        ]
    }
    return NextResponse.json({ ...data })
    const user = await getSession()
    try {
        await connectMongo()
        const projects = await Project.find({ user: user.userID })
        return NextResponse.json({ data: projects })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: err })
    }
}