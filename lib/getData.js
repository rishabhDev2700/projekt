import connectMongo from "@/models/db";
import { Project } from "@/models/project";
import { Event } from "@/models/event";
import { Task } from "@/models/task";

export async function fetchAllProjects(userID) {
    try {
        await connectMongo()
        const projects = await Project.find({ team: userID })
        return projects
    }
    catch (err) {
        console.log(err)
    }
}

export async function fetchMyProjects(userID) {
    try {
        await connectMongo()
        const projects = await Project.find({ user: userID })
        return projects
    }
    catch (err) {
        console.log(err)
    }

}

export async function fetchMyEvents(userID, projectID) {
    try {
        await connectMongo()
        const events = await Event.find({
            project: projectID,   // Match the project ID
            invitees: userID      // Match if userID is present in the invitees array
        })
        return events
    }
    catch (err) {
        console.log(err)
    }
}

export async function fetchMyTasks(userID) {
    try {
        await connectMongo()
        const tasks = await Task.find({ user: userID }).sort({ deadline: 1 })
        return tasks
    }
    catch (err) {
        console.log(err)
    }
}


export async function fetchSingleProject(userID, projectID) {
    try {
        await connectMongo()
        const project = await Project.find({ _id: projectID, $or: [{ user: userID }, { team: userID }] })
        return project
    }
    catch (err) {
        console.log(err)
    }

}

export async function fetchSingleTask(userID, taskID) {
    try {
        await connectMongo()
        const task = await Task.find({ _id: taskID, user: userID })
        return task
    }
    catch (err) {
        console.log(err)
    }

}


export async function fetchSingleEvent(userID, eventID) {
    try {
        await connectMongo()
        const event = await Event.find({ _id: eventID, user: userID })
        return event
    }
    catch (err) {
        console.log(err)
    }

}