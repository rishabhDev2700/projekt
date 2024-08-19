import { decrypt } from "@/lib/session"
import connectMongo from "@/models/db"
import Project from "@/models/project"
import { NextResponse } from "next/server"

export async function POST(req){
    const session = req.cookies.get('session')
    let user = await decrypt(session)
    user = JSON.parse(user)
    await connectMongo()
    const data = await req.json()
    const projects = Project.find({team:user.userID})
    return NextResponse.json({data:projects},{status:200})
    
}