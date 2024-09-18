import { decrypt, getSession } from "@/lib/session"
import connectMongo from "@/models/db"
import { Invitation } from "@/models/invitation"
import { Project } from "@/models/project"
import { Task } from "@/models/task"
import { NextResponse } from "next/server"
export async function POST(req) {
    let user = await getSession()
    let data = await req.json()
    let rawTasks = [...data.tasks]
    delete data.tasks
    let team = [...data.team]
    delete data.team
    data.user = user.userID
    console.log(team)
    try {
        await connectMongo()
        const insertedID = await Project.create({ ...data })
        console.log("Inserted ID", insertedID)
        let tasks = rawTasks.map((t) => { return { ...t, project: insertedID } })
        let taskResult = await Task.insertMany(tasks)
        team = team.map(t => { return { project: insertedID, email: t.email, role: t.role } })
        let invitationResult = Invitation.insertMany(team)
        return NextResponse.json({ "project": insertedID, "tasks": taskResult, "team": invitationResult })
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